import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPokemonsWithDetails } from "../api/api";
import "./estiloo.css"


export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getPokemonsWithDetails(20);
        setPokemons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  
  if (loading) return <p>Carregant...</p>;



    return (
      <section className="pagina">
        <div className="grid">
          <div className="buscador">
            <input type="text" className="buscar" placeholder="Buscar" />
            
            <div className="lupa">
              <img src="src\assets\lupa.png" alt="inicio" />
            </div> 
          </div> 

       
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.name}`} 
              className="card"
            >
              <div className="imagen">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </div>
              
              <div className="texto">
                <p>{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div> 
      </section>
  );}