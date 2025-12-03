'use client';

import { useState } from 'react';
import PetitionResult from './petition-result';

type ApiDenunciaBasica = {
  folio_id: number;
  fecha_emision: string;
  razon_justificacion: string;
  estado_denuncia: string;
};

type ApiServidorPublico = {
  id_sp: number;
  denuncia_id: number;
  organismo_alcaldia: string;
  cargo_grado_servidor: string;
  tipo_de_falta: string;
  unidad_investigadora: string;
};

type ApiDenunciante = {
  id_denunc_cal: number;
  denuncia_id: number;
  calidad_denunciante: string;
};

type ApiFaltaClasif = {
  id_falta: number;
  denuncia_id: number;
  tipo_falta: string;
  area_proyecto_vinculado: string;
};

type ApiProcInv = {
  id_proceso: number;
  denuncia_id: number;
  plazos_legales_dias?: number;
  medidas_cautelares?: string;
};

type ApiResolucion = {
  id_resolucion: number;
  denuncia_id: number;
  fecha_resolucion_final?: string;
  resultado_fallo?: string;
  tipo_sancion_impuesta?: string;
  monto_suspension?: number;
};

type ApiResponse = {
  // por compatibilidad con tus mocks anteriores
  h25_denuncias_bas?: ApiDenunciaBasica[];
  h25_datos_sp?: ApiServidorPublico[];
  h25_denunc_anon?: ApiDenunciante[];
  h25_falta_clasif?: ApiFaltaClasif[];
  h25_proc_inv?: ApiProcInv[];
  h25_res_sanc?: ApiResolucion[];
  // y la estructura tal cual de la API real
  h25_sp?: ApiServidorPublico[];
};

export default function TrackingSection() {
  const [folio, setFolio] = useState('');
  const [petition, setPetition] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // para mostrar si vino de API real o mock
  const [dataSource, setDataSource] = useState<'api' | 'mock' | null>(null);

  // 🔹 guarda los folios que sí encontraron coincidencia
  const saveFolioLocally = (folioNumber: number) => {
    if (typeof window === 'undefined') return;
    try {
      const storageKey = 'df4_recent_folios';
      const raw = window.localStorage.getItem(storageKey);
      let current: number[] = [];

      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          current = parsed.filter((v) => typeof v === 'number');
        }
      }

      // metemos al inicio y evitamos duplicados, máximo 5
      const updated = [folioNumber, ...current.filter((v) => v !== folioNumber)].slice(0, 5);
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error('No se pudo guardar el folio localmente', err);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const folioClean = folio.trim();

    setError(null);
    setPetition(null);
    setDataSource(null);

    if (!folioClean) {
      setError('Ingresa un folio para poder buscar tu denuncia.');
      return;
    }

    const folioNumber = Number(folioClean);
    if (Number.isNaN(folioNumber)) {
      setError('El folio debe ser numérico, por ejemplo: 10001.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/denuncias', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Error al consultar la API de denuncias');
      }

      const raw: ApiResponse = await res.json();

      // si tu endpoint marca si vino de API real o mock, puedes usar algo tipo:
      const source = (raw as any).source === 'api' ? 'api' : 'mock';
      setDataSource(source);

      const basicosList = raw.h25_denuncias_bas ?? [];
      const spList = raw.h25_sp ?? raw.h25_datos_sp ?? [];
      const denuncianteList = raw.h25_denunc_anon ?? [];
      const faltasList = raw.h25_falta_clasif ?? [];
      const procesosList = raw.h25_proc_inv ?? [];
      const resolucionesList = raw.h25_res_sanc ?? [];

      // Buscar base por folio_id
      const basicos = basicosList.find((d) => d.folio_id === folioNumber);

      if (!basicos) {
        setError(
          'No se encontró ninguna denuncia con ese folio. Verifica que esté bien escrito o que corresponda al sistema.'
        );
        return;
      }

      const denunciaId = basicos.folio_id;

      const servidorPublico = spList.find((s) => s.denuncia_id === denunciaId);
      const denunciante = denuncianteList.find((d) => d.denuncia_id === denunciaId);
      const falta = faltasList.find((f) => f.denuncia_id === denunciaId);
      const procInv = procesosList.find((p) => p.denuncia_id === denunciaId);
      const resol = resolucionesList.find((r) => r.denuncia_id === denunciaId);

      const petitionFromApi = {
        folio: denunciaId,
        datosGenerales: {
          fechaEmision: new Date(basicos.fecha_emision).toLocaleDateString('es-MX'),
          motivo: basicos.razon_justificacion,
          estadoActual: basicos.estado_denuncia,
        },
        servidorPublico: {
          alcaldiaOrganismo: servidorPublico?.organismo_alcaldia ?? 'No disponible',
          cargo: servidorPublico?.cargo_grado_servidor ?? 'No disponible',
          tipoFalta:
            falta?.tipo_falta ??
            servidorPublico?.tipo_de_falta ??
            'No disponible',
          unidadInvestigadora: servidorPublico?.unidad_investigadora ?? 'No disponible',
          idDenuncia: String(denunciaId),
        },
        denunciante: {
          calidad: denunciante?.calidad_denunciante ?? 'No especificado',
        },
        falta: {
          tipo:
            falta?.tipo_falta ??
            servidorPublico?.tipo_de_falta ??
            'No especificado',
          area:
            falta?.area_proyecto_vinculado ??
            servidorPublico?.organismo_alcaldia ??
            'Dependencia no especificada',
        },
        investigacion: {
          plazosLegales: procInv?.plazos_legales_dias
            ? `${procInv.plazos_legales_dias} días`
            : 'No especificado',
          medidasCautelares: procInv?.medidas_cautelares ?? 'No registradas',
          relacionConDenuncia: `Asociada al folio ${denunciaId}`,
          estadoInvestigacion:
            resol?.resultado_fallo ?? basicos.estado_denuncia ?? 'En trámite',
          ultimaActualizacion: resol?.fecha_resolucion_final
            ? new Date(resol.fecha_resolucion_final).toLocaleDateString('es-MX')
            : new Date(basicos.fecha_emision).toLocaleDateString('es-MX'),
          avancePorcentaje: 'ND',
        },
        timeline: [
          {
            title: 'Denuncia registrada',
            description: basicos.razon_justificacion,
            date: new Date(basicos.fecha_emision).toLocaleString('es-MX'),
          },
          resol && {
            title: 'Resolución',
            description: `Resultado: ${
              resol.resultado_fallo ?? 'No especificado'
            }. Sanción: ${resol.tipo_sancion_impuesta ?? 'No especificada'}.`,
            date: resol.fecha_resolucion_final
              ? new Date(resol.fecha_resolucion_final).toLocaleString('es-MX')
              : '',
          },
          {
            title: 'Estado actual',
            description: `La denuncia se encuentra en estado: ${basicos.estado_denuncia}.`,
            date: new Date().toLocaleString('es-MX'),
          },
        ].filter(Boolean),
      };

      setPetition(petitionFromApi);
      // 👇 aquí guardamos el folio para que después lo lea el panel
      saveFolioLocally(denunciaId);
    } catch (err) {
      console.error(err);
      setError(
        'Ocurrió un problema al consultar la API de denuncias. Intenta de nuevo más tarde.'
      );
      setDataSource(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tracking" className="py-16 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#E5E7EB]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2">
            Rastrea el estado de tu denuncia
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] mb-6">
            Ingresa el folio que se te proporcionó para consultar el avance de tu caso
            dentro del sistema.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center"
          >
            <div className="flex-1">
              <label
                htmlFor="folio"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Folio de denuncia
              </label>
              <input
                id="folio"
                type="text"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Ejemplo: 10001"
                className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-[#8B1538] text-white font-semibold hover:bg-[#70102d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar denuncia'}
            </button>
          </form>

          {/* Mensaje de origen de los datos */}
          {dataSource && (
            <p className="mt-3 text-xs text-[#6B7280]">
              Mostrando información proveniente de:{" "}
              <span className="font-semibold">
                {dataSource === 'api' ? 'API oficial de datos abiertos' : 'datos de demostración'}
              </span>
              .
            </p>
          )}

          {/* Mensajes de error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          {/* Resultado */}
          {petition && !error && <PetitionResult petition={petition} />}
        </div>
      </div>
    </section>
  );
}
