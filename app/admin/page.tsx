"use client"

import { useEffect, useMemo, useState } from "react"
import AdminNavbar from "@/components/admin-navbar"
import AdminSidebar from "@/components/admin-sidebar"
import Petitions from "@/components/admin/petitions"
import Metrics from "@/components/admin/metrics"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type H25ServidorPublico = {
  id_sp: number
  denuncia_id: number
  organismo_alcaldia: string
  cargo_grado_servidor: string
  tipo_de_falta: string
  unidad_investigadora: string
}

type H25Denunciante = {
  id_denunc_cal: number
  denuncia_id: number
  calidad_denunciante: string
}

type H25DenunciaBasica = {
  folio_id: number
  fecha_emision: string
  razon_justificacion: string
  estado_denuncia: string
}

type H25FaltaClasif = {
  id_falta: number
  denuncia_id: number
  tipo_falta: string
  area_proyecto_vinculado: string
}

type H25ProcesoInv = {
  id_proceso: number
  denuncia_id: number
  plazos_legales_dias: number
  medidas_cautelares: string
}

type H25Resolucion = {
  id_resolucion: number
  denuncia_id: number
  fecha_resolucion_final: string
  resultado_fallo: string
  tipo_sancion_impuesta: string
  monto_suspension: number
}

type ApiResponse = {
  h25_sp?: H25ServidorPublico[]
  h25_denunc_anon?: H25Denunciante[]
  h25_denuncias_bas?: H25DenunciaBasica[]
  h25_falta_clasif?: H25FaltaClasif[]
  h25_proc_inv?: H25ProcesoInv[]
  h25_res_sanc?: H25Resolucion[]
}

type DenunciaEnriquecida = {
  id: number
  fecha: string
  motivo: string
  estado: string
  organismo?: string
  cargoServidor?: string
  tipoFalta?: string
  areaProyecto?: string
  calidadDenunciante?: string
  medidasCautelares?: string
  resultadoFallo?: string
  tipoSancion?: string
  montoSuspension?: number
  // para cálculo de tiempos
  fechaResolucion?: string
}

async function obtenerDatosDesdeApi(): Promise<ApiResponse> {
  const res = await fetch("/api/denuncias");

  if (!res.ok) {
    const text = await res.text();
    console.error("Error al llamar /api/denuncias:", res.status, text);
    throw new Error("No se pudieron cargar los datos de la API");
  }

  // 👇 Igual que en TrackingSection: soporta API real y MOCK_DATA
  const raw: any = await res.json();

  // Si viene de la API real → los datos van en raw.datosTablas
  // Si viene del mock → vienen directo en raw
  const tablas = raw.datosTablas ?? raw;

  const h25_sp: H25ServidorPublico[] =
    tablas.h25_sp ?? tablas.h25_datos_sp ?? [];

  return {
    h25_sp,
    h25_denunc_anon: tablas.h25_denunc_anon ?? [],
    h25_denuncias_bas: tablas.h25_denuncias_bas ?? [],
    h25_falta_clasif: tablas.h25_falta_clasif ?? [],
    h25_proc_inv: tablas.h25_proc_inv ?? [],
    h25_res_sanc: tablas.h25_res_sanc ?? [],
  };
}


function getStatusBadgeClasses(status: string) {
  const normalized = status.toLowerCase()
  if (normalized.includes("curso") || normalized.includes("análisis") || normalized.includes("revision")) {
    return "bg-amber-100 text-amber-900"
  }
  if (normalized.includes("cerrada") || normalized.includes("resuelta")) {
    return "bg-green-100 text-green-900"
  }
  return "bg-blue-100 text-blue-900"
}

// diferencia en días entre dos fechas
function calcularDiasEntreFechas(inicio: string, fin: string): number | null {
  const start = new Date(inicio)
  const end = new Date(fin)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  const diffMs = end.getTime() - start.getTime()
  return diffMs / (1000 * 60 * 60 * 24)
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recentFolios, setRecentFolios] = useState<number[]>([])

  // Datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await obtenerDatosDesdeApi()
        setApiData(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("No se pudieron cargar los datos de la API. Se mostrará información limitada.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Folios guardados en localStorage (desde TrackingSection)
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("df4_recent_folios")
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setRecentFolios(parsed.filter((v) => typeof v === "number"))
      }
    } catch (err) {
      console.error("No se pudieron leer los folios guardados localmente", err)
    }
  }, [])

  // Enriquecer denuncias con info de otras tablas
  const denuncias: DenunciaEnriquecida[] = useMemo(() => {
    if (!apiData || !apiData.h25_denuncias_bas) return []

    const sp = apiData.h25_sp || []
    const calidades = apiData.h25_denunc_anon || []
    const faltas = apiData.h25_falta_clasif || []
    const procesos = apiData.h25_proc_inv || []
    const resoluciones = apiData.h25_res_sanc || []

    return apiData.h25_denuncias_bas.map((denuncia) => {
      const id = denuncia.folio_id
      const servidor = sp.find((s) => s.denuncia_id === id)
      const calidad = calidades.find((c) => c.denuncia_id === id)
      const falta = faltas.find((f) => f.denuncia_id === id)
      const proceso = procesos.find((p) => p.denuncia_id === id)
      const resolucion = resoluciones.find((r) => r.denuncia_id === id)

      return {
        id,
        fecha: denuncia.fecha_emision,
        motivo: denuncia.razon_justificacion,
        estado: denuncia.estado_denuncia,
        organismo: servidor?.organismo_alcaldia,
        cargoServidor: servidor?.cargo_grado_servidor,
        tipoFalta: falta?.tipo_falta || servidor?.tipo_de_falta,
        areaProyecto: falta?.area_proyecto_vinculado,
        calidadDenunciante: calidad?.calidad_denunciante,
        medidasCautelares: proceso?.medidas_cautelares,
        resultadoFallo: resolucion?.resultado_fallo,
        tipoSancion: resolucion?.tipo_sancion_impuesta,
        montoSuspension: resolucion?.monto_suspension,
        fechaResolucion: resolucion?.fecha_resolucion_final,
      }
    })
  }, [apiData])

  // Stats principales + tiempos
  const stats = useMemo(() => {
    const total = denuncias.length
    const enAnalisis = denuncias.filter(
      (d) => d.estado.toLowerCase().includes("curso") || d.estado.toLowerCase().includes("revision"),
    ).length
    const cerradas = denuncias.filter((d) => d.estado.toLowerCase().includes("cerrada")).length
    const conSancion = denuncias.filter(
      (d) =>
        (d.tipoSancion && d.tipoSancion.toLowerCase() !== "ninguna") ||
        (typeof d.montoSuspension === "number" && d.montoSuspension > 0),
    ).length

    const duraciones = denuncias
      .map((d) => {
        if (!d.fecha || !d.fechaResolucion) return null
        const dias = calcularDiasEntreFechas(d.fecha, d.fechaResolucion)
        return dias !== null && dias >= 0 ? dias : null
      })
      .filter((v): v is number => v !== null)

    let minimo: number | null = null
    let maximo: number | null = null
    let promedio: number | null = null

    if (duraciones.length > 0) {
      minimo = Math.min(...duraciones)
      maximo = Math.max(...duraciones)
      const suma = duraciones.reduce((acc, v) => acc + v, 0)
      promedio = suma / duraciones.length
    }

    const porcentajeResuelto = total > 0 ? (cerradas / total) * 100 : 0

    return {
      total,
      enAnalisis,
      cerradas,
      conSancion,
      porcentajeResuelto,
      tiemposResolucion: {
        minimo,
        maximo,
        promedio,
        casosConFecha: duraciones.length,
      },
    }
  }, [denuncias])

  const resumen = useMemo(
    () => [...denuncias].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 4),
    [denuncias],
  )

  // Denuncias cuyos folios se guardaron en localStorage
  const denunciasGuardadas = useMemo(() => {
    if (recentFolios.length === 0 || denuncias.length === 0) return []
    const porId = new Map(denuncias.map((d) => [d.id, d]))
    return recentFolios
      .map((id) => porId.get(id))
      .filter((d): d is DenunciaEnriquecida => Boolean(d))
  }, [denuncias, recentFolios])

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="flex-1 p-6 md:p-8 bg-light">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">Panel información general</h1>
                <p className="text-secondary text-sm md:text-base">
                  Resumen en tiempo real de las denuncias y procedimientos de datos abiertos.
                </p>
              </div>

              {loading && <p className="text-sm text-secondary">Cargando datos de la API...</p>}
              {error && !loading && <p className="text-sm text-red-600">{error}</p>}

              {!loading && (
                <>
                  {/* Tarjetas de resumen */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5 flex flex-col gap-2">
                      <span className="text-2xl">📄</span>
                      <p className="text-sm text-secondary">Total de casos</p>
                      <p className="text-2xl font-bold text-primary">{stats.total}</p>
                    </Card>
                    <Card className="p-5 flex flex-col gap-2">
                      <span className="text-2xl">⏳</span>
                      <p className="text-sm text-secondary">En análisis / revisión</p>
                      <p className="text-2xl font-bold text-primary">{stats.enAnalisis}</p>
                    </Card>
                    <Card className="p-5 flex flex-col gap-2">
                      <span className="text-2xl">✅</span>
                      <p className="text-sm text-secondary">Casos cerrados</p>
                      <p className="text-2xl font-bold text-primary">{stats.cerradas}</p>
                    </Card>
                    <Card className="p-5 flex flex-col gap-2">
                      <span className="text-2xl">➡️</span>
                      <p className="text-sm text-secondary">Con sanción o medidas</p>
                      <p className="text-2xl font-bold text-primary">{stats.conSancion}</p>
                    </Card>
                  </div>

                  {/* Estadísticas de resolución */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 flex flex-col gap-2">
                      <p className="text-sm text-secondary">% de resolución</p>
                      <p className="text-2xl font-bold text-primary">
                        {stats.total > 0 ? `${stats.porcentajeResuelto.toFixed(1)}%` : "Sin datos"}
                      </p>
                      <p className="text-xs text-secondary">
                        {stats.cerradas} de {stats.total} casos aparecen como cerrados.
                      </p>
                    </Card>

                    <Card className="p-4 flex flex-col gap-2">
                      <p className="text-sm text-secondary">Tiempo promedio de resolución</p>
                      <p className="text-2xl font-bold text-primary">
                        {stats.tiemposResolucion.promedio != null
                          ? `${stats.tiemposResolucion.promedio.toFixed(1)} días`
                          : "Sin datos"}
                      </p>
                      <p className="text-xs text-secondary">
                        Calculado solo con casos que tienen fecha de resolución registrada (
                        {stats.tiemposResolucion.casosConFecha} casos).
                      </p>
                    </Card>

                    <Card className="p-4 flex flex-col gap-2">
                      <p className="text-sm text-secondary">Rango mínimo y máximo</p>
                      <p className="text-sm font-semibold text-primary">
                        {stats.tiemposResolucion.minimo != null && stats.tiemposResolucion.maximo != null
                          ? `Mín: ${stats.tiemposResolucion.minimo.toFixed(
                              1,
                            )} días · Máx: ${stats.tiemposResolucion.maximo.toFixed(1)} días`
                          : "Sin datos suficientes"}
                      </p>
                      <p className="text-xs text-secondary">
                        Te ayuda a detectar casos muy rápidos o muy lentos dentro del sistema.
                      </p>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Resumen de casos */}
                    <div className="lg:col-span-2">
                      <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-foreground">Resumen</h2>
                        {denuncias.length === 0 && (
                          <p className="text-sm text-secondary">
                            No se encontraron denuncias en los datos de la API.
                          </p>
                        )}

                        <div className="space-y-3">
                          {resumen.map((d) => (
                            <div
                              key={d.id}
                              className="border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                            >
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  FOL-{d.id.toString().padStart(5, "0")}
                                </p>
                                <p className="text-xs text-secondary mb-1">
                                  {d.tipoFalta || "Tipo de falta no especificado"} ·{" "}
                                  {d.organismo || "Organismo no especificado"}
                                </p>
                                <p className="text-xs text-secondary line-clamp-2">{d.motivo}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                                    d.estado,
                                  )}`}
                                >
                                  {d.estado}
                                </span>
                                {d.resultadoFallo && (
                                  <span className="text-[11px] text-secondary">
                                    Resolución: {d.resultadoFallo}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* Acciones rápidas + últimos folios */}
                    <div>
                      <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-foreground">Acciones Rápidas</h2>
                        <div className="space-y-3">
                          <Button className="w-full">📊 Generar reporte</Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            📤 Exportar datos
                          </Button>
                        </div>

                        <div className="pt-4 border-t border-border mt-4 space-y-3">
                          <div>
                            <p className="text-xs text-secondary mb-1">
                              Los datos mostrados se obtienen directamente de la API oficial.
                            </p>
                            <p className="text-xs text-secondary">
                              Este panel es un resumen visual; el detalle completo puede verse en otros módulos.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xs font-semibold text-foreground mb-1">
                              Últimos folios consultados en este navegador
                            </h3>
                            {denunciasGuardadas.length === 0 && (
                              <p className="text-xs text-secondary">
                                Aún no has guardado folios desde la sección “Rastrea tu denuncia”.
                              </p>
                            )}
                            {denunciasGuardadas.length > 0 && (
                              <ul className="space-y-1 text-xs text-secondary">
                                {denunciasGuardadas.map((d) => (
                                  <li
                                    key={d.id}
                                    className="flex items-center justify-between rounded-md bg-light px-2 py-1"
                                  >
                                    <span className="font-medium">
                                      FOL-{d.id.toString().padStart(5, "0")}
                                    </span>
                                    <span className="truncate ml-2">{d.estado}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeSection === "petitions" && <Petitions />}
          {activeSection === "metrics" && <Metrics />}
        </main>
      </div>
    </div>
  )
}
