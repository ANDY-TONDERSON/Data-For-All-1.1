import { NextResponse } from "next/server";

// 🔹 Datos de ejemplo (mock) basados en lo que tú proporcionaste
const MOCK_DATA = {
  h25_sp: [
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
      organismo_alcaldia: "Secretaria de Movilidad",
      cargo_grado_servidor: "Jefe de Departamento",
      tipo_de_falta: "Etica",
      unidad_investigadora: "Contraloria General",
    },
    {
      id_sp: 3,
      denuncia_id: 10003,
      organismo_alcaldia: "Sistema de Aguas",
      cargo_grado_servidor: "Coordinador Operativo",
      tipo_de_falta: "Abuso de autoridad",
      unidad_investigadora: "Unidad de Responsabilidades",
    },
    {
      id_sp: 4,
      denuncia_id: 10004,
      organismo_alcaldia: "Instituto de Vivienda",
      cargo_grado_servidor: "Asistente Ejecutivo",
      tipo_de_falta: "Administrativa",
      unidad_investigadora: "Auditoria Interna",
    },
    {
      id_sp: 5,
      denuncia_id: 10005,
      organismo_alcaldia: "Secretaria de Obras",
      cargo_grado_servidor: "Inspector Técnico",
      tipo_de_falta: "Corrupción",
      unidad_investigadora: "Contraloria General",
    },
    {
      id_sp: 6,
      denuncia_id: 10006,
      organismo_alcaldia: "Alcaldia Iztapalapa",
      cargo_grado_servidor: "Subdirector de Programas",
      tipo_de_falta: "Mala gestion",
      unidad_investigadora: "Unidad de Responsabilidades",
    },
    {
      id_sp: 7,
      denuncia_id: 10007,
      organismo_alcaldia: "Secretaria de Salud",
      cargo_grado_servidor: "Medico Especialista",
      tipo_de_falta: "Etica",
      unidad_investigadora: "Auditoria Interna",
    },
    {
      id_sp: 8,
      denuncia_id: 10008,
      organismo_alcaldia: "Cuerpo de Policia",
      cargo_grado_servidor: "Oficial de Transito",
      tipo_de_falta: "Abuso de autoridad",
      unidad_investigadora: "Contraloria General",
    },
    {
      id_sp: 9,
      denuncia_id: 10009,
      organismo_alcaldia: "Secretaria de Finanzas",
      cargo_grado_servidor: "Analista de Presupuesto",
      tipo_de_falta: "Corrupción",
      unidad_investigadora: "Unidad de Responsabilidades",
    },
    {
      id_sp: 10,
      denuncia_id: 10010,
      organismo_alcaldia: "Alcaldia Benito Juarez",
      cargo_grado_servidor: "Encargado de Mantenimiento",
      tipo_de_falta: "Administrativa",
      unidad_investigadora: "Auditoria Interna",
    },
  ],
  h25_denunc_anon: [
    { id_denunc_cal: 1, denuncia_id: 10001, calidad_denunciante: "Ciudadano/afectado" },
    { id_denunc_cal: 2, denuncia_id: 10002, calidad_denunciante: "Anonimo" },
    { id_denunc_cal: 3, denuncia_id: 10003, calidad_denunciante: "Colega/funcionario" },
    { id_denunc_cal: 4, denuncia_id: 10004, calidad_denunciante: "Auditoria interna" },
    { id_denunc_cal: 5, denuncia_id: 10005, calidad_denunciante: "Ciudadano/afectado" },
    { id_denunc_cal: 6, denuncia_id: 10006, calidad_denunciante: "Anonimo" },
    { id_denunc_cal: 7, denuncia_id: 10007, calidad_denunciante: "Ciudadano/afectado" },
    { id_denunc_cal: 8, denuncia_id: 10008, calidad_denunciante: "Anonimo" },
    { id_denunc_cal: 9, denuncia_id: 10009, calidad_denunciante: "Colega/funcionario" },
    { id_denunc_cal: 10, denuncia_id: 10010, calidad_denunciante: "Ciudadano/afectado" },
  ],
  h25_denuncias_bas: [
    {
      folio_id: 10001,
      fecha_emision: "2025-01-15",
      razon_justificacion: "Mala atencion en ventanilla de servicios",
      estado_denuncia: "Cerrada",
    },
    {
      folio_id: 10002,
      fecha_emision: "2025-01-16",
      razon_justificacion: "Demora excesiva en la entrega de documentos",
      estado_denuncia: "En curso",
    },
    {
      folio_id: 10003,
      fecha_emision: "2025-01-17",
      razon_justificacion: "Actitud descortés del personal de soporte",
      estado_denuncia: "En revision",
    },
    {
      folio_id: 10004,
      fecha_emision: "2025-01-18",
      razon_justificacion: "Error administrativo en el cálculo de tasas",
      estado_denuncia: "Cerrada",
    },
    {
      folio_id: 10005,
      fecha_emision: "2025-01-19",
      razon_justificacion: "Negativa a proporcionar informacion solicitada",
      estado_denuncia: "En curso",
    },
    {
      folio_id: 10006,
      fecha_emision: "2025-01-20",
      razon_justificacion: "Tramite no realizado despues de 30 dias",
      estado_denuncia: "En revision",
    },
    {
      folio_id: 10007,
      fecha_emision: "2025-01-21",
      razon_justificacion: "Falta de accesibilidad para personas con discapacidad",
      estado_denuncia: "Cerrada",
    },
    {
      folio_id: 10008,
      fecha_emision: "2025-01-22",
      razon_justificacion: "Horarios de servicio no respetados",
      estado_denuncia: "En curso",
    },
    {
      folio_id: 10009,
      fecha_emision: "2025-01-23",
      razon_justificacion: "Solicitud de pagos extraoficiales",
      estado_denuncia: "En revision",
    },
    {
      folio_id: 10010,
      fecha_emision: "2025-01-24",
      razon_justificacion: "Instalaciones en mal estado y sucias",
      estado_denuncia: "Cerrada",
    },
  ],
  h25_falta_clasif: [
    {
      id_falta: 1,
      denuncia_id: 10001,
      tipo_falta: "Administrativa",
      area_proyecto_vinculado: "Tramites y Licencias",
    },
    {
      id_falta: 2,
      denuncia_id: 10002,
      tipo_falta: "Etica",
      area_proyecto_vinculado: "Atencion Ciudadana",
    },
    {
      id_falta: 3,
      denuncia_id: 10003,
      tipo_falta: "Abuso de autoridad",
      area_proyecto_vinculado: "Seguridad Publica y Vialidad",
    },
    {
      id_falta: 4,
      denuncia_id: 10004,
      tipo_falta: "Administrativa",
      area_proyecto_vinculado: "Control de Inventario",
    },
    {
      id_falta: 5,
      denuncia_id: 10005,
      tipo_falta: "Corrupcion",
      area_proyecto_vinculado: "Proceso de Licitaciones",
    },
    {
      id_falta: 6,
      denuncia_id: 10006,
      tipo_falta: "Mala gestion",
      area_proyecto_vinculado: "Asignacion de Recursos",
    },
    {
      id_falta: 7,
      denuncia_id: 10007,
      tipo_falta: "Etica",
      area_proyecto_vinculado: "Salud y Servicios Medicos",
    },
    {
      id_falta: 8,
      denuncia_id: 10008,
      tipo_falta: "Abuso de autoridad",
      area_proyecto_vinculado: "Inspeccion y Verificacion",
    },
    {
      id_falta: 9,
      denuncia_id: 10009,
      tipo_falta: "Corrupcion",
      area_proyecto_vinculado: "Manejo de Fondos",
    },
    {
      id_falta: 10,
      denuncia_id: 10010,
      tipo_falta: "Administrativa",
      area_proyecto_vinculado: "Mantenimiento Urbano",
    },
  ],
  h25_proc_inv: [
    {
      id_proceso: 1,
      denuncia_id: 10001,
      plazos_legales_dias: 60,
      medidas_cautelares: "Ninguna",
    },
    {
      id_proceso: 2,
      denuncia_id: 10002,
      plazos_legales_dias: 90,
      medidas_cautelares: "Reasignacion de funciones",
    },
    {
      id_proceso: 3,
      denuncia_id: 10003,
      plazos_legales_dias: 120,
      medidas_cautelares: "Suspension temporal",
    },
    {
      id_proceso: 4,
      denuncia_id: 10004,
      plazos_legales_dias: 60,
      medidas_cautelares: "Ninguna",
    },
    {
      id_proceso: 5,
      denuncia_id: 10005,
      plazos_legales_dias: 90,
      medidas_cautelares: "Separacion preventiva del cargo",
    },
    {
      id_proceso: 6,
      denuncia_id: 10006,
      plazos_legales_dias: 60,
      medidas_cautelares: "Ninguna",
    },
    {
      id_proceso: 7,
      denuncia_id: 10007,
      plazos_legales_dias: 120,
      medidas_cautelares: "Reasignacion de funciones",
    },
    {
      id_proceso: 8,
      denuncia_id: 10008,
      plazos_legales_dias: 90,
      medidas_cautelares: "Suspension temporal",
    },
    {
      id_proceso: 9,
      denuncia_id: 10009,
      plazos_legales_dias: 60,
      medidas_cautelares: "Separacion preventiva del cargo",
    },
    {
      id_proceso: 10,
      denuncia_id: 10010,
      plazos_legales_dias: 120,
      medidas_cautelares: "Ninguna",
    },
  ],
  h25_res_sanc: [
    {
      id_resolucion: 1,
      denuncia_id: 10001,
      fecha_resolucion_final: "2025-04-15",
      resultado_fallo: "Improcedente",
      tipo_sancion_impuesta: "Ninguna",
      monto_suspension: 0,
    },
    {
      id_resolucion: 2,
      denuncia_id: 10002,
      fecha_resolucion_final: "2025-05-16",
      resultado_fallo: "Fundada",
      tipo_sancion_impuesta: "Amonestacion verbal",
      monto_suspension: 0,
    },
    {
      id_resolucion: 3,
      denuncia_id: 10003,
      fecha_resolucion_final: "2025-06-17",
      resultado_fallo: "Fundada",
      tipo_sancion_impuesta: "Suspension",
      monto_suspension: 30,
    },
    {
      id_resolucion: 4,
      denuncia_id: 10004,
      fecha_resolucion_final: "2025-04-18",
      resultado_fallo: "Archivada",
      tipo_sancion_impuesta: "Ninguna",
      monto_suspension: 0,
    },
    {
      id_resolucion: 5,
      denuncia_id: 10005,
      fecha_resolucion_final: "2025-05-19",
      resultado_fallo: "Fundada",
      tipo_sancion_impuesta: "Multa",
      monto_suspension: 15000,
    },
    {
      id_resolucion: 6,
      denuncia_id: 10006,
      fecha_resolucion_final: "2025-04-20",
      resultado_fallo: "Sobreseida",
      tipo_sancion_impuesta: "Ninguna",
      monto_suspension: 0,
    },
    {
      id_resolucion: 7,
      denuncia_id: 10007,
      fecha_resolucion_final: "2025-06-21",
      resultado_fallo: "Fundada",
      tipo_sancion_impuesta: "Amonestacion escrita",
      monto_suspension: 0,
    },
    {
      id_resolucion: 8,
      denuncia_id: 10008,
      fecha_resolucion_final: "2025-05-22",
      resultado_fallo: "Fundada",
      tipo_sancion_impuesta: "Suspension",
      monto_suspension: 90,
    },
    {
      id_resolucion: 9,
      denuncia_id: 10009,
      fecha_resolucion_final: "2025-04-23",
      resultado_fallo: "Improcedente",
      tipo_sancion_impuesta: "Ninguna",
      monto_suspension: 0,
    },
    {
      id_resolucion: 10,
      denuncia_id: 10010,
      fecha_resolucion_final: "2025-06-24",
      resultado_fallo: "Archivada",
      tipo_sancion_impuesta: "Ninguna",
      monto_suspension: 0,
    },
  ],
  h25_tra_ser_ps: [
    {
      id: 1,
      programas: "Programa Social",
      nombre_programa: "Mujer es Poder",
      descripcion:
        "Apoyo económico directo para mujeres de 18 a 59 años en situación de vulnerabilidad.",
      objetivo:
        "Reducir la brecha de desigualdad de género y fortalecer la autonomía económica de las mujeres.",
      tipo_objetivo: "Específico",
      institucion_encargada: "Secretaría de Bienestar",
      institucion_acronimo: "SEBIEN",
      direccion: "Dato de la Institución",
      horarios_atencion: "L-V 9:00 a 16:00",
      telefono_contacto: "Dato de Contacto",
      correo_contacto: "dato@qroo.gob.mx",
      redes_sociales: "Dato de Redes",
      latitud_institucion: "Dato de Latitud",
      longitud_institucion: "Dato de Longitud",
      tipo_apoyo: "Económico (bimestral)",
      costo_servicio: "Sin costo",
      pasos_a_seguir: "Esperar convocatoria y registro en módulos.",
      modalidad: "Presencial",
      poblacion_objetivo: "Mujeres de 18 a 59 años en vulnerabilidad.",
      descripcion_indicador:
        "Mujeres beneficiadas que invierten el apoyo en su desarrollo.",
      requisitos: "Residir en Q. Roo, Cédula de Identificación.",
      documentos_requeridos: "INE, CURP, Comprobante de domicilio.",
      fechas_solicitud: "Convocatoria anual (Verificar)",
      periodos_pago: "Bimestral",
      zona_region_que_aplica: "Todo el Estado",
      enlace_modulo_atencion: "Módulos itinerantes o Centros Integradores.",
      requiere_cita: "No requiere cita.",
      tiempo_resolucion: "30 a 60 días tras registro.",
      estado_actual_programa: "Vigente",
      categoria_programa: "Combate a la Pobreza",
      numero_beneficiados_actual: "Sin datos",
      fundamentos_juridicos: "Ley de Desarrollo Social.",
      presupuesto: "Sin datos",
    },
  ],
};

export async function GET() {
  try {
    const username = process.env.DFA_API_USER;
    const password = process.env.DFA_API_PASSWORD;
    const clientId = process.env.DFA_API_CLIENT_ID ?? "4";
    const clientSecret =
      process.env.DFA_API_CLIENT_SECRET ??
      "VJi8wbu3t5tiXP7A7e81G8kXq6jK5VxlcLWVIucR";

    console.log("USERNAME_ENV", username);
    console.log("PASSWORD_ENV", password ? "****" : "NO_PASSWORD");

    // Si faltan credenciales, devolvemos directamente los datos de ejemplo
    if (!username || !password) {
      console.warn(
        "Faltan credenciales DFA_API_USER / DFA_API_PASSWORD. Usando datos de ejemplo."
      );
      return NextResponse.json(MOCK_DATA);
    }

    // 1) Pedimos token con x-www-form-urlencoded
    const tokenBody = new URLSearchParams({
      grant_type: "password",
      client_id: clientId,
      client_secret: clientSecret,
      username,
      password,
    });

    const tokenRes = await fetch("https://comedatos.qroo.gob.mx/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenBody.toString(),
    });

    const tokenText = await tokenRes.text();
    console.log("TOKEN STATUS", tokenRes.status);
    console.log("TOKEN BODY", tokenText);

    if (!tokenRes.ok) {
      console.error("Error al obtener token. Usando datos de ejemplo.");
      return NextResponse.json(MOCK_DATA);
    }

    const tokenJson = JSON.parse(tokenText) as { access_token?: string };
    const accessToken = tokenJson.access_token;

    if (!accessToken) {
      console.error("Respuesta de token sin access_token. Usando datos de ejemplo.");
      return NextResponse.json(MOCK_DATA);
    }

    // 2) Llamamos a NucleoDigital (por si más adelante lo logras hacer funcionar)
    const dataRes = await fetch(
      "https://comedatos.qroo.gob.mx/api/NucleoDigital",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      }
    );

    const dataText = await dataRes.text();
    console.log("NUCLEO STATUS", dataRes.status);

    if (!dataRes.ok) {
      console.error("Error en NucleoDigital. Usando datos de ejemplo.");
      return NextResponse.json(MOCK_DATA);
    }

    const data = JSON.parse(dataText);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error inesperado en /api/denuncias, usando datos de ejemplo:", err);
    return NextResponse.json(MOCK_DATA);
  }
}
