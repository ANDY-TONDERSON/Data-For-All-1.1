// Tipos para los datos de la API de denuncias

export interface ServidorPublicoImplicado {
  id_sp: number
  denuncia_id: number
  organismo_alcaldia: string
  cargo_grado_servidor: string
  tipo_de_falta: string
  unidad_investigadora: string
}

export interface CalidadDenunciante {
  denuncia_id: number
  calidad_denunciante: "Anonimo" | "Ciudadano" | "Colega" | "Auditoria Interna"
}

export interface DenunciaBasica {
  folio_id: number
  fecha_emision: string
  razon_justificacion: string
  estado_denuncia: "Cerrada" | "En curso" | "En revision"
}

export interface FaltaClasificacion {
  denuncia_id: number
  tipo_falta: "Corrupcion" | "Etica" | "Abuso de autoridad" | "Negligencia" | "Otra"
  area_proyecto_vinculado: string
}

export interface ProcesoInvestigacion {
  denuncia_id: number
  plazos_legales_dias: number
  medidas_cautelares: "Suspension temporal" | "Reasignacion" | "Ninguna"
}

export interface ResolucionSancion {
  denuncia_id: number
  fecha_resolucion_final: string | null
  resultado_fallo: "Fundada" | "Improcedente" | "Archivada" | null
  tipo_sancion_impuesta: "Suspension" | "Multa" | "Amonestacion" | "Ninguna" | null
  monto_suspension: number | null
}

export interface ProgramaSocial {
  id: number
  programas: string
  nombre_programa: string
  institucion_encargada: string
  tipo_apoyo: string
  costo_servicio: string
  pasos_a_seguir: string
  requisitos: string
  zona_region_que_aplica: string
  estado_actual_programa: "Vigente" | "Suspendido" | "Finalizado"
  categoria_programa: string
  link_externo?: string
}

// Tipo completo para una denuncia con todos sus datos relacionados
export interface DenunciaCompleta extends DenunciaBasica {
  servidor_publico?: ServidorPublicoImplicado
  calidad_denunciante?: CalidadDenunciante
  clasificacion_falta?: FaltaClasificacion
  proceso_investigacion?: ProcesoInvestigacion
  resolucion_sancion?: ResolucionSancion
}
