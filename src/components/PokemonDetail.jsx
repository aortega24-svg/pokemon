import { useEffect, useState } from "react";
import { useParams, Link } from "react-router"; 
import "./poke_estilo.css"; 

export default function PokemonDetail() {
  const { name } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [damageRelations, setDamageRelations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        setLoading(true);
        const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const dataPokemon = await resPokemon.json();
        setPokemon(dataPokemon);

        const primerTipo = dataPokemon.types[0].type.name;
        const resType = await fetch(`https://pokeapi.co/api/v2/type/${primerTipo}`);
        const dataType = await resType.json();
        setDamageRelations(dataType.damage_relations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPokemonDetails();
  }, [name]);

  if (loading) return <p>Carregant detalls...</p>;
  if (!pokemon) return <p>No se encontró el Pokémon.</p>;

  const alturaEnMetros = pokemon.height / 10;
  const pesoEnKilos = pokemon.weight / 10;
  const imagenOficial = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  const idFormateado = String(pokemon.id).padStart(3, '0');

  return (
    <section className="detalle-pokemon">

      <div className="detalle-card">
        <h2 className="pokemon-id-top">N.º {idFormateado}</h2>

        <div className="detalle-imagen">
          <img src={imagenOficial} alt={pokemon.name} />
        </div>

        <div className="info-fisica">
          <div className="caja-info">
            <strong>Tamaño promedio</strong>
            <span>{alturaEnMetros} m</span>
          </div>
          <div className="caja-info">
            <strong>Peso promedio</strong>
            <span>{pesoEnKilos} kg</span>
          </div>
        </div>

        <div className="seccion-bloque">
          <h3>Tipos</h3>
          <div className="tipos-contenedor">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={`badge-tipo ${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="seccion-bloque">
          <h3>Ataques Principales</h3>
          <div className="ataques-lista-rectangulos">
            {pokemon.moves.slice(0, 4).map((m) => (
              <div key={m.move.name} className={`ataque-rectangulo ${pokemon.types[0].type.name}`}>
                {m.move.name.replace("-", " ")}
              </div>
            ))}
          </div>
        </div>

        {damageRelations && (
          <div className="relaciones-danio">
            <div>
              <h3>Debilidades</h3>
              <div className="debiles-flex">
                {damageRelations.double_damage_from.map((d) => (
                  <span key={d.name} className={`badge-tipo ${d.name}`}>{d.name}</span>
                ))}
              </div>
            </div>

            <div>
              <h3>Fortalezas</h3>
              <div className="fuertes-flex">
                {damageRelations.double_damage_to.map((f) => (
                  <span key={f.name} className={`badge-tipo ${f.name}`}>{f.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}