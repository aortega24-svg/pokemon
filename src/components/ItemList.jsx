import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./objetos.css"; 

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  
  // Categoría por defecto: pokeballs
  const [categoriaActual, setCategoriaActual] = useState("standard-balls");

  // Lista de categorías que queremos mostrar en el menú superior
  const categorias = [
    { id: "standard-balls", nombre: "Balls" },
    { id: "healing", nombre: "Pociones" },
    { id: "baking-only", nombre: "Bayas" },
    { id: "stat-boosts", nombre: "Combate" }
  ];

  useEffect(() => {
    const loadItemsByCategory = async () => {
      try {
        setLoading(true);
        setItems([]); // Vaciamos la lista anterior mientras carga
        
        // Pedimos los objetos de la categoría seleccionada
        const res = await fetch(`https://pokeapi.co/api/v2/item-category/${categoriaActual}`);
        const data = await res.json();

        // Limitamos a los primeros 20 objetos de esa categoría para que no tarde demasiado
        const objetosDeCategoria = data.items.slice(0, 20);

        // Buscamos los detalles (imágenes) de cada objeto
        const detailedItems = await Promise.all(
          objetosDeCategoria.map(async (item) => {
            const resDetail = await fetch(item.url);
            return await resDetail.json();
          })
        );

        // Filtramos por si acaso algún objeto de la API no tiene imagen disponible
        const itemsConImagen = detailedItems.filter(item => item.sprites && item.sprites.default);

        setItems(itemsConImagen);
        if (itemsConImagen.length > 0) setActiveItem(itemsConImagen[0].id);
      } catch (error) {
        console.error("Error cargando objetos por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItemsByCategory();
  }, [categoriaActual]); 

  return (
    <section className="pantalla-objetos">
      
      <div className="menu-categorias">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`btn-categoria ${categoriaActual === cat.id ? "activo" : ""}`}
            onClick={() => setCategoriaActual(cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div className="mochila-lista">
        {loading ? (
          <p className="cargando-texto">Buscando en la mochila...</p>
        ) : items.length === 0 ? (
          <p className="cargando-texto">Mochila vacía</p>
        ) : (
          items.map((item) => {
            const isActive = activeItem === item.id;
            const nombreLimpio = item.name.replace("-", " ");

            return (
              <div 
                key={item.id} 
                className={`fila-objeto ${isActive ? "activa" : ""}`}
                onMouseEnter={() => setActiveItem(item.id)}
              >
                <div className="indicador-flecha">
                  {isActive && <span>❯</span>}
                </div>

                <div className="icono-objeto">
                  <img src={item.sprites.default} alt={item.name} />
                </div>

                <div className="nombre-objeto">
                  {nombreLimpio}
                </div>

                <div className="cantidad-objeto">
                  x &nbsp; {item.id % 5 + 1} 
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}