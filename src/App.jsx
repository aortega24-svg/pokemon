import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import ItemList from "./components/ItemList";
import MapList from "./components/MapList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Menú de inicio */}
        <Route path="/" element={<Home />} />
        
        {/* Lista de Pokémon */}
        <Route path="/pokemons" element={<PokemonList />} />
        
        {/* Detalle de cada Pokémon */}
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        
        {/* Mochila de objetos */}
        <Route path="/objetos" element={<ItemList />} />
        
        {/* Menú de mapas */}
        <Route path="/mapas" element={<MapList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;