import { useEffect, useState } from "react";
import "./shiny_estilo.css"; 

export default function PokemonShiny() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShinyPokemons = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();

        const detallados = await Promise.all(
          data.results.map(async (p) => {
            const detalleRes = await fetch(p.url);
            return await detalleRes.json();
          })
        );
        setPokemons(detallados);
      } catch (error) {
        console.error("Error cargando shinies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShinyPokemons();
  }, []);

  if (loading) return <div className="cargando-shiny">✨ Buscando Pokémon Singulares... ✨</div>;

  return (
    <div className="pagina-shiny">

      <div className="grid-shiny">
        {pokemons.map((poke) => {
          const imagenShiny = 
            poke.sprites.other["official-artwork"].front_shiny || 
            poke.sprites.front_shiny;

          return (
            <div key={poke.id} className="card-shiny">
              <div className="destello-icono">⭐</div>
              <img src={imagenShiny} alt={poke.name} />
              <p>{poke.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}