import { Suspense } from "react";
import { getStrapiData } from "./lib/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Componente asíncrono que realiza la petición
async function Content() {
  const strapiData = await getStrapiData(
    "/api/principal?populate[Oruro][populate]=*&populate[Caporales][populate]=*"
  );

  const data = strapiData?.data;

  // 1. Fondo Oruro
  const bgOruroUrl = data?.Oruro?.[0]?.url || data?.Oruro?.url;
  const bgImage = bgOruroUrl ? `${STRAPI_URL}${bgOruroUrl}` : "";

  // 2. Extraer Caporales y Tinku
  const caporalItem = data?.Caporales?.[0] || data?.Caporales;

  // Caporales
  const tituloCaporal = caporalItem?.Caporales || "Caporales";
  const descripcionCaporal =
    caporalItem?.Descripcion || "Danza ágil y enérgica del folklore boliviano.";
  const caporalMedia = caporalItem?.Caporalito;
  const rawCaporalUrl = Array.isArray(caporalMedia)
    ? caporalMedia[0]?.url
    : caporalMedia?.url || caporalMedia?.data?.attributes?.url;
  const caporalImgSrc = rawCaporalUrl ? `${STRAPI_URL}${rawCaporalUrl}` : null;

  // Tinku
  const tituloTinku = caporalItem?.Tinkus || "Tinkus";
  const descripcionTinku =
    caporalItem?.DescT || "Danza ritual y enérgica de las comunidades del Altiplano.";
  const tinkuMedia = caporalItem?.Tinkito;
  const rawTinkuUrl = Array.isArray(tinkuMedia)
    ? tinkuMedia[0]?.url
    : tinkuMedia?.url || tinkuMedia?.data?.attributes?.url;
  const tinkuImgSrc = rawTinkuUrl ? `${STRAPI_URL}${rawTinkuUrl}` : null;

  const tarjetasDanzas = [
    {
      id: "caporales",
      titulo: tituloCaporal,
      descripcion: descripcionCaporal,
      imagen: caporalImgSrc,
      activo: true,
    },
    {
      id: "tinku",
      titulo: tituloTinku,
      descripcion: descripcionTinku,
      imagen: tinkuImgSrc,
      activo: true,
    },
    {
      id: "danza-3",
      titulo: "Próxima Danza",
      descripcion: "Espacio reservado para una nueva danza del Carnaval.",
      imagen: null,
      activo: false,
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: bgImage
          ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.95)), url(${bgImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 20px 40px 20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", marginTop: "20px" }}>
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textShadow: "2px 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          {data?.Bienvenido || "La Magia del Carnaval de Oruro"}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "#e2e8f0",
            textShadow: "1px 2px 6px rgba(0,0,0,0.8)",
          }}
        >
          {data?.Contenido ||
            "Explora la devoción, la música y el folklore de la obra maestra del patrimonio oral e intangible de la humanidad."}
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "40px auto 0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {tarjetasDanzas.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              height: "420px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {item.imagen && (
              <>
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.95) 25%, transparent 80%)",
                    zIndex: 2,
                  }}
                />
              </>
            )}

            <div
              style={{
                position: "relative",
                zIndex: 3,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              {!item.imagen && (
                <div
                  style={{
                    margin: "auto",
                    border: "2px dashed rgba(255, 255, 255, 0.4)",
                    padding: "16px 24px",
                    borderRadius: "8px",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  + Agregar Danza
                </div>
              )}

              <h3
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                  color: item.activo ? "#facc15" : "#94a3b8",
                  marginBottom: "8px",
                }}
              >
                {item.titulo}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  color: item.activo ? "#e2e8f0" : "#64748b",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Componente principal envuelto en Suspense
export default function Home() {
  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white" }}>
      <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Cargando datos...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}