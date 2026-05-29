import { Link } from "react-router";
import poke from "/src/assets/poke.jpg"
import shiny from "/src/assets/shiny.png"
import mochila from "/src/assets/mochila.png"
import mapa from "/src/assets/mapa.png"



export default function Home() {
  return (
          <div className="cuadricula">
        
        
        {/* Botón 1 */}
        <div className="caja-contenedor">
          <Link to={'/pokemons'} className="boton-interior">
            <img src="src\assets\poke.jpg" alt="Pokemons" />
            <p>Pokemons</p>
          </Link>
        </div>

        {/* Caja 2 */}
        <div className="caja-contenedor">
        <Link to="/mapas" className="boton-interior">
          <img src="/src/assets/mapa.png" alt="Mapas" />
          <p>Mapas</p>
        </Link>
        </div>

        {/* Caja 3 */}
        <div className="caja-contenedor">
          <Link to={'/objetos'} className="boton-interior">
            <img src="src\assets\mochila.png" alt="Objetos" />
            <p>Objectos</p>
          </Link>
        </div>

        {/* Caja 4 */}
        <div className="caja-contenedor">
          <Link to={'/shiny'}className="boton-interior">
            <img src="src\assets\shiny.png" alt="Shiny" />
            <p>Pokémon shiny</p>
          </Link>
        </div>

      </div>
  );
}