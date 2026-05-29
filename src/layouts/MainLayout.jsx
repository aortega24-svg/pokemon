import { Link, Outlet } from "react-router";
import "./estilo.css"


export default function MainLayout() {
  return (
    <div className="marco-rojo">
      <div className="estado">
        <img src="src\assets\estado.png" alt="Pokemons" />
      </div>


      <Outlet />

      <div className="contenedor-inferior">

        <div className="caja-contenedor_i">
          <button className="boton-inicio_i">
              <img src="src\assets\casa(1).png" alt="inicio" />
            </button>
        </div>

        <div className="caja-contenedor_i">
          <Link to={'/'} className="boton-inicio_i">
              <img src="src\assets\cassa.png" alt="inicio" />
            </Link>
        </div>

        <div className="caja-contenedor_i">
          <button className="boton-inicio_i">
              <img src="src\assets\casa(2).png" alt="inicio" />
            </button>
        </div>
      </div>

  
    </div>
  );
}