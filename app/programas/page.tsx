"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { programasSociales } from "@/lib/api-mock-data"

export default function ProgramasPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todos")
  const [filtroEstado, setFiltroEstado] = useState<string>("Vigente")
  const [programaSeleccionado, setProgramaSeleccionado] = useState<number | null>(null)

  const categorias = ["Todos", ...new Set(programasSociales.map((p) => p.categoria_programa))]

  const programasFiltrados = useMemo(() => {
    return programasSociales.filter((p) => {
      if (filtroCategoria !== "Todos" && p.categoria_programa !== filtroCategoria) return false
      if (filtroEstado !== "Todos" && p.estado_actual_programa !== filtroEstado) return false
      return true
    })
  }, [filtroCategoria, filtroEstado])

  const programa = programaSeleccionado ? programasSociales.find((p) => p.id === programaSeleccionado) : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Programas y Servicios</h1>
        <p className="text-secondary text-lg mb-8">Conoce los apoyos disponibles en Quintana Roo</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar de filtros */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="font-semibold text-foreground mb-4">Filtros</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Categoría</label>
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Estado del programa</label>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Vigente">Vigente</option>
                    <option value="Suspendido">Suspendido</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setFiltroCategoria("Todos")
                    setFiltroEstado("Vigente")
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted/40 rounded-lg">
                <p className="text-xs text-secondary">
                  <strong>Nota:</strong> Todos los programas listados son sin costo para los ciudadanos que cumplan los
                  requisitos.
                </p>
              </div>
            </Card>
          </div>

          {/* Lista de programas */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground">Resultados ({programasFiltrados.length})</h3>
              </div>

              <div className="space-y-4">
                {programasFiltrados.map((prog) => (
                  <Card key={prog.id} className="p-4 hover:shadow-md transition border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{prog.nombre_programa}</h4>
                          {prog.estado_actual_programa === "Vigente" && (
                            <Badge variant="default" className="bg-success text-white text-xs">
                              Vigente
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-secondary mb-3">{prog.institucion_encargada}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {prog.tipo_apoyo}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {prog.categoria_programa}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {prog.zona_region_que_aplica}
                          </Badge>
                        </div>

                        <Button size="sm" variant="outline" onClick={() => setProgramaSeleccionado(prog.id)}>
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {programasFiltrados.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-secondary">No se encontraron programas con los filtros aplicados</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      {programa && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setProgramaSeleccionado(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{programa.nombre_programa}</h2>
                  <p className="text-secondary">{programa.institucion_encargada}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setProgramaSeleccionado(null)}>
                  ✕
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">{programa.tipo_apoyo}</Badge>
                <Badge variant="outline">{programa.categoria_programa}</Badge>
                <Badge variant="default" className="bg-success text-white">
                  {programa.estado_actual_programa}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Costo del servicio</h3>
                  <p className="text-foreground">{programa.costo_servicio}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Requisitos</h3>
                  <p className="text-foreground">{programa.requisitos}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pasos a seguir</h3>
                  <p className="text-foreground">{programa.pasos_a_seguir}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Zona que aplica</h3>
                  <p className="text-foreground">{programa.zona_region_que_aplica}</p>
                </div>

                <a
                  href={programa.link_externo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  Visitar sitio del programa
                </a>
                
              </div>

              <div className="mt-6 p-4 bg-muted/40 rounded-lg">
                <p className="text-sm text-secondary">
                  Para más información, contacta directamente con {programa.institucion_encargada}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}
