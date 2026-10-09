"use server"

const BASE_URL = "http://localhost:1337";

export async function getStrapiData(path: string) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      cache: "no-store", // Evita que guarde caché para ver cambios al instante
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al conectar con Strapi:", error);
    return null;
  }
}