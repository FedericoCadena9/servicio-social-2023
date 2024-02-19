import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Inicializa el cliente de Supabase
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

async function fetchExternalApiData() {
  const response = await fetch(
    "http://38.49.158.178:84/api-servicio/index2.php"
  );
  if (!response.ok) {
    throw new Error("Error al obtener datos de la API externa");
  }
  const text = await response.text();

  // Encuentra el inicio y el fin del array JSON dentro del texto de la respuesta
  const startIndex = text.indexOf("[");
  const endIndex = text.lastIndexOf("]");

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("JSON no encontrado en la respuesta de la API");
  }

  // Extrae el texto JSON del contenido HTML
  const jsonText = text.substring(startIndex, endIndex + 1);
  // Convierte el texto JSON en un objeto JavaScript
  const jsonData = JSON.parse(jsonText);
  try {
    return jsonData;
  } catch (error) {
    throw new Error("Error al parsear el texto JSON: " + error.message);
  }
}

async function getSupabaseData() {
  const { data, error } = await supabaseAdmin.from("alumnos").select("*");
  if (error) {
    throw error;
  }
  return data;
}

async function moveToHistorical(data) {
  // Asume que 'data' es un array de registros para mover a 'alumnos_historial'
  const { error: insertError } = await supabaseAdmin
    .from("alumnos_historial")
    .insert(data);

  if (insertError) {
    throw insertError;
  }

  // Elimina los registros de 'alumnos'
  const idsToDelete = data.map((alumno) => alumno.id);
  const { error: deleteError } = await supabaseAdmin
    .from("alumnos")
    .delete()
    .in("id", idsToDelete);

  if (deleteError) {
    throw deleteError;
  }
}

async function upsertAlumnos(data) {
  // Asume que 'data' es un array de registros para actualizar o insertar en 'alumnos'
  const { error } = await supabaseAdmin
    .from("alumnos")
    .upsert(data, { onConflict: "id" }); // Asume que 'id' es la clave primaria
  if (error) {
    throw error;
  }
}

export async function POST(req) {
  try {
    const externalData = await fetchExternalApiData();
    const supabaseData = await getSupabaseData();

    // Identificar registros eliminados
    const toMoveToHistorical = supabaseData.filter(
      (alumno) => !externalData.find((ext) => ext.id === alumno.id)
    );

    // Mover registros eliminados a 'alumnos_historial'
    await moveToHistorical(toMoveToHistorical);

    // Identificar y preparar registros nuevos o actualizados
    const toUpsert = externalData.map((ext) => {
      const existing = supabaseData.find((alumno) => alumno.id === ext.id);
      return existing ? { ...existing, ...ext } : ext;
    });

    // Actualizar e insertar registros nuevos
    await upsertAlumnos(toUpsert);

    const existingIds = toMoveToHistorical.map((alumno) => alumno.id);
    if (existingIds.length > 0) {
      const { error } = await supabaseAdmin
        .from("alumnos")
        .delete()
        .in("id", existingIds);

      if (error) {
        throw error;
      }
    }

    // Devolver respuesta de éxito
    return NextResponse.json({
      status: 200,
      message: "Alumnos actualizados correctamente",
    });
  } catch (error) {
    console.error(error);
    // Devolver respuesta de error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
