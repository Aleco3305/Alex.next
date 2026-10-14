import { getStrapiData } from "./lib/strapi";

export default async function Home() {
  "use cache";
  
  const strapiData = await getStrapiData("/api/principal?populate=*");

  if (!strapiData || !strapiData.data) {
    return (
      <main style={{ padding: "40px", color: "white", textAlign: "center", minHeight: "100vh", backgroundColor: "#111" }}>
        <h1>No se pudo conectar con Strapi</h1>
        <p>Asegúrate de que el servidor de Strapi esté corriendo en el puerto 1337.</p>
      </main>
    );
  }

  const { Bienvenido, Contenido, Oruro } = strapiData.data;

  // Extraemos la URL de la imagen correctamente desde el array Oruro
  const imageUrl = Array.isArray(Oruro) && Oruro.length > 0 
    ? `http://localhost:1337${Oruro[0].url}` 
    : Oruro?.url 
      ? `http://localhost:1337${Oruro.url}` 
      : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: imageUrl ? `url("${imageUrl}")` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // <-- Cambiado de "center" a "flex-start" para enviarlo arriba
        alignItems: "center",         // Mantiene el título y texto centrados horizontalmente
        padding: "60px 40px",         // Espacio superior para que no peguen tanto al borde
        color: "white",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
      }}
      >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
        {Bienvenido}
      </h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "800px", lineHeight: "1.6", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
        {Contenido}
      </p>
    </main>
  );
}