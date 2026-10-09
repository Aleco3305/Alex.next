import { getStrapiData } from "./lib/strapi";

export default async function Home() {
  // Llama a tu API de Strapi
  const strapiData = await getStrapiData("/api/principal");

  // Si Strapi está apagado o no responde
  if (!strapiData || !strapiData.data) {
    return (
      <main style={{ padding: "40px", color: "white" }}>
        <h1>No se pudo conectar con Strapi</h1>
        <p>Asegúrate de que el servidor de Strapi esté corriendo en el puerto 1337.</p>
      </main>
    );
  }

  // Obtenemos los campos Bienvenido y Contenido de Strapi
  const { Bienvenido, Contenido } = strapiData.data;

  return (
    <main style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        {Bienvenido}
      </h1>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
        {Contenido}
      </p>
    </main>
  );
}
