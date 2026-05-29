import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import ItemList from "./components/ItemList"; 
import MapList from "./components/MapList";   
import PokemonShiny from "./components/PokemonShiny";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/pokemons',
        Component: PokemonList
      },
      {
        path: '/pokemon/:name', 
        Component: PokemonDetail
      },
      {
        path: '/objetos',
        Component: ItemList
      },
      {
        path: '/mapas',
        Component: MapList 
      },
      {
        path: '/shiny',
        Component: PokemonShiny 
      }
    ],
  },
]);