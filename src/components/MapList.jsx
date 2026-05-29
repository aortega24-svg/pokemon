import { useState } from "react";
import { Link } from "react-router";
import "./mapas.css"; 

export default function MapList() {

  const regiones = [
    { id: 1, nombre: "Región de Kanto", generacion: "1ª Generación", color: "#ff4757" },
    { id: 2, nombre: "Región de Johto", generacion: "2ª Generación", color: "#2ed573" },
    { id: 3, nombre: "Región de Hoenn", generacion: "3ª Generación", color: "#1e90ff" },
    { id: 4, nombre: "Región de Sinnoh", generacion: "4ª Generación", color: "#ffa502" }
  ];

  const [activeMap, setActiveMap] = useState(regiones[0].id);

  return (
    <section className="pantalla-mapas">
      
      <div className="mapas-header">
        <span className="mapas-titulo-texto">Mapa Regional</span>
      </div>


      <div className="mapas-lista">
        {regiones.map((reg) => {
          const isActive = activeMap === reg.id;

          return (
            <div 
              key={reg.id} 
              className={`fila-mapa ${isActive ? "activa" : ""}`}
              onMouseEnter={() => setActiveMap(reg.id)} 
            >
              <div className="indicador-flecha-mapa">
                {isActive && <span>❯</span>}
              </div>

              <div className="punto-region" style={{ backgroundColor: reg.color }}></div>

              <div className="info-mapa">
                <span className="nombre-region">{reg.nombre}</span>
                <span className="gen-region">{reg.generacion}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}