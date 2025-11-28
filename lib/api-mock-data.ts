// Datos mock que simulan la respuesta de la API

import type {
  ServidorPublicoImplicado,
  CalidadDenunciante,
  DenunciaBasica,
  FaltaClasificacion,
  ProcesoInvestigacion,
  ResolucionSancion,
  ProgramaSocial,
  DenunciaCompleta,
} from "./api-types"

// Servidores públicos implicados
const servidoresPublicos: ServidorPublicoImplicado[] = [
  {
    id_sp: 1,
    denuncia_id: 10001,
    organismo_alcaldia: "Alcaldia Cuauhtemoc",
    cargo_grado_servidor: "Director de Area",
    tipo_de_falta: "Administrativa",
    unidad_investigadora: "Auditoria Interna",
  },
  {
    id_sp: 2,
    denuncia_id: 10002,
    organismo_alcaldia: "Alcaldia Benito Juarez",
    cargo_grado_servidor: "Subdirector de Obras",
    tipo_de_falta: "Administrativa",
    unidad_investigadora: "Contraloria Municipal",
  },
  {
    id_sp: 3,
    denuncia_id: 10003,
    organismo_alcaldia: "Secretaria de Salud QR",
    cargo_grado_servidor: "Jefe de Departamento",
    tipo_de_falta: "Penal",
    unidad_investigadora: "Fiscalia Anticorrupcion",
  },
  {
    id_sp: 4,
    denuncia_id: 10004,
    organismo_alcaldia: "Secretaria de Educacion",
    cargo_grado_servidor: "Coordinador Regional",
    tipo_de_falta: "Administrativa",
    unidad_investigadora: "Organo Interno de Control",
  },
  {
    id_sp: 5,
    denuncia_id: 10005,
    organismo_alcaldia: "Alcaldia Cozumel",
    cargo_grado_servidor: "Director de Compras",
    tipo_de_falta: "Administrativa",
    unidad_investigadora: "Auditoria Superior",
  },
]

// Calidad de denunciantes
const calidadDenunciantes: CalidadDenunciante[] = [
  { denuncia_id: 10001, calidad_denunciante: "Ciudadano" },
  { denuncia_id: 10002, calidad_denunciante: "Anonimo" },
  { denuncia_id: 10003, calidad_denunciante: "Colega" },
  { denuncia_id: 10004, calidad_denunciante: "Anonimo" },
  { denuncia_id: 10005, calidad_denunciante: "Ciudadano" },
]

// Denuncias básicas
const denunciasBasicas: DenunciaBasica[] = [
  {
    folio_id: 10001,
    fecha_emision: "2025-01-15",
    razon_justificacion: "Demora excesiva en tramite de licencia de construccion sin justificacion",
    estado_denuncia: "En curso",
  },
  {
    folio_id: 10002,
    fecha_emision: "2025-01-16",
    razon_justificacion: "Cobro indebido de cuotas no oficiales para agilizar tramite de permisos",
    estado_denuncia: "En curso",
  },
  {
    folio_id: 10003,
    fecha_emision: "2024-12-10",
    razon_justificacion: "Desvio de recursos destinados a medicamentos e insumos medicos",
    estado_denuncia: "Cerrada",
  },
  {
    folio_id: 10004,
    fecha_emision: "2025-02-01",
    razon_justificacion: "Nepotismo en contratacion de personal docente sin cumplir requisitos",
    estado_denuncia: "En revision",
  },
  {
    folio_id: 10005,
    fecha_emision: "2025-01-20",
    razon_justificacion: "Irregularidades en proceso de licitacion de obra publica municipal",
    estado_denuncia: "En curso",
  },
]

// Clasificación de faltas
const faltasClasificacion: FaltaClasificacion[] = [
  {
    denuncia_id: 10001,
    tipo_falta: "Negligencia",
    area_proyecto_vinculado: "Tramites y Licencias",
  },
  {
    denuncia_id: 10002,
    tipo_falta: "Corrupcion",
    area_proyecto_vinculado: "Tramites y Permisos",
  },
  {
    denuncia_id: 10003,
    tipo_falta: "Corrupcion",
    area_proyecto_vinculado: "Salud y Servicios Medicos",
  },
  {
    denuncia_id: 10004,
    tipo_falta: "Etica",
    area_proyecto_vinculado: "Educacion",
  },
  {
    denuncia_id: 10005,
    tipo_falta: "Corrupcion",
    area_proyecto_vinculado: "Proceso de Licitaciones",
  },
]

// Procesos de investigación
const procesosInvestigacion: ProcesoInvestigacion[] = [
  {
    denuncia_id: 10001,
    plazos_legales_dias: 90,
    medidas_cautelares: "Ninguna",
  },
  {
    denuncia_id: 10002,
    plazos_legales_dias: 120,
    medidas_cautelares: "Reasignacion",
  },
  {
    denuncia_id: 10003,
    plazos_legales_dias: 120,
    medidas_cautelares: "Suspension temporal",
  },
  {
    denuncia_id: 10004,
    plazos_legales_dias: 90,
    medidas_cautelares: "Ninguna",
  },
  {
    denuncia_id: 10005,
    plazos_legales_dias: 150,
    medidas_cautelares: "Suspension temporal",
  },
]

// Resoluciones y sanciones
const resolucionesSanciones: ResolucionSancion[] = [
  {
    denuncia_id: 10001,
    fecha_resolucion_final: null,
    resultado_fallo: null,
    tipo_sancion_impuesta: null,
    monto_suspension: null,
  },
  {
    denuncia_id: 10002,
    fecha_resolucion_final: null,
    resultado_fallo: null,
    tipo_sancion_impuesta: null,
    monto_suspension: null,
  },
  {
    denuncia_id: 10003,
    fecha_resolucion_final: "2025-06-17",
    resultado_fallo: "Fundada",
    tipo_sancion_impuesta: "Suspension",
    monto_suspension: 30,
  },
  {
    denuncia_id: 10004,
    fecha_resolucion_final: null,
    resultado_fallo: null,
    tipo_sancion_impuesta: null,
    monto_suspension: null,
  },
  {
    denuncia_id: 10005,
    fecha_resolucion_final: null,
    resultado_fallo: null,
    tipo_sancion_impuesta: null,
    monto_suspension: null,
  },
]

// Programas sociales
export const programasSociales: ProgramaSocial[] = [
  {
    id: 1,
    programas: "Programa Social",
    nombre_programa: "Mujer es Poder",
    institucion_encargada: "Secretaria de Bienestar",
    tipo_apoyo: "Economico",
    costo_servicio: "Sin costo",
    pasos_a_seguir: "Esperar convocatoria, registrarse en linea, presentar documentos",
    requisitos: "Residir en Q. Roo, ser mujer mayor de 18 años, identificacion oficial",
    zona_region_que_aplica: "Todo el Estado",
    estado_actual_programa: "Vigente",
    categoria_programa: "Apoyo a mujeres",
    link_externo: "https://mujerespoder.qroo.gob.mx/"
  },
  {
    id: 2,
    programas: "Servicio Publico",
    nombre_programa: "Atencion Medica Gratuita",
    institucion_encargada: "Secretaria de Salud",
    tipo_apoyo: "Servicio de salud",
    costo_servicio: "Sin costo",
    pasos_a_seguir: "Acudir a centro de salud con documentos, registro, consulta",
    requisitos: "CURP, comprobante de domicilio, no contar con seguridad social",
    zona_region_que_aplica: "Todo el Estado",
    estado_actual_programa: "Vigente",
    categoria_programa: "Salud",
    link_externo: "https://salud.qroo.gob.mx/atencion-medica-gratuita"
  },
  {
    id: 3,
    programas: "Programa Social",
    nombre_programa: "Becas para el Bienestar",
    institucion_encargada: "Secretaria de Educacion",
    tipo_apoyo: "Economico educativo",
    costo_servicio: "Sin costo",
    pasos_a_seguir: "Inscripcion escolar, registro en plataforma, validacion",
    requisitos: "Estudiante de nivel basico o medio superior, buen promedio",
    zona_region_que_aplica: "Todo el Estado",
    estado_actual_programa: "Vigente",
    categoria_programa: "Educacion",
    link_externo: "https://www.gob.mx/becasbenitojuarez"
  },
  {
    id: 4,
    programas: "Servicio Publico",
    nombre_programa: "Asesoria Legal Gratuita",
    institucion_encargada: "Instituto de Defensa Publica",
    tipo_apoyo: "Asesoria juridica",
    costo_servicio: "Sin costo",
    pasos_a_seguir: "Agendar cita, acudir con documentos del caso, recibir orientacion",
    requisitos: "Identificacion oficial, documentos relacionados al caso",
    zona_region_que_aplica: "Todo el Estado",
    estado_actual_programa: "Vigente",
    categoria_programa: "Justicia",
    link_externo: "https://cancun.gob.mx/cancun/noticias/leer/626",
  },
]

// Función para obtener denuncias completas combinando todas las tablas
export function getDenunciasCompletas(): DenunciaCompleta[] {
  return denunciasBasicas.map((denuncia) => ({
    ...denuncia,
    servidor_publico: servidoresPublicos.find((sp) => sp.denuncia_id === denuncia.folio_id),
    calidad_denunciante: calidadDenunciantes.find((cd) => cd.denuncia_id === denuncia.folio_id),
    clasificacion_falta: faltasClasificacion.find((fc) => fc.denuncia_id === denuncia.folio_id),
    proceso_investigacion: procesosInvestigacion.find((pi) => pi.denuncia_id === denuncia.folio_id),
    resolucion_sancion: resolucionesSanciones.find((rs) => rs.denuncia_id === denuncia.folio_id),
  }))
}

// Función para obtener una denuncia específica por ID
export function getDenunciaById(id: number): DenunciaCompleta | undefined {
  const denuncias = getDenunciasCompletas()
  return denuncias.find((d) => d.folio_id === id)
}

// Función para obtener estadísticas
export function getEstadisticas() {
  const denuncias = getDenunciasCompletas()
  const total = denuncias.length
  const fundadas = denuncias.filter((d) => d.resolucion_sancion?.resultado_fallo === "Fundada").length
  const enCurso = denuncias.filter((d) => d.estado_denuncia === "En curso").length
  const cerradas = denuncias.filter((d) => d.estado_denuncia === "Cerrada").length
  const enRevision = denuncias.filter((d) => d.estado_denuncia === "En revision").length

  // Contar tipos de falta
  const tiposFalta: Record<string, number> = {}
  denuncias.forEach((d) => {
    if (d.clasificacion_falta) {
      const tipo = d.clasificacion_falta.tipo_falta
      tiposFalta[tipo] = (tiposFalta[tipo] || 0) + 1
    }
  })

  return {
    total,
    fundadas,
    porcentajeFundadas: total > 0 ? Math.round((fundadas / cerradas) * 100) : 0,
    enCurso,
    cerradas,
    enRevision,
    tiposFalta,
  }
}
