import { createContext, useEffect, useState } from 'react'
import axios from "axios";
import useSWR from 'swr';

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();
    const [offset, setOffset] = useState(0);
    const [type, setType] = useState("all");
    const [catched, setCatched] = useState([]);
    const [prevType, setPrevType] = useState(type);

    const fetcher = (url) => axios(url).then((res) => res.data);

    useEffect(() => {
      if (type !== prevType) {
        setOffset(0);
        setPokemon([]);
        setPrevType(type);
      }
    }, [type, prevType]);

    const { data, error, isValidating, mutate } = useSWR(
      type === 'all'
        ? `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
        : `https://pokeapi.co/api/v2/type/${type}`,
      fetcher,
      {
        onSuccess: async (data) => {
          setIsLoading(true);

          let promises;

          if (type === 'all') {
            promises = data.results.map((result) => axios.get(result.url));
          } else {
            promises = data.pokemon.map((pokemonInfo) => axios.get(pokemonInfo.pokemon.url));
          }
          const fetchedPokemon = (await Promise.all(promises)).map((res) => res.data);

          setPokemon((prev) =>
            type === 'all' && offset > 0 ? [...prev, ...fetchedPokemon] : fetchedPokemon
          );

          setIsLoading(false);
        },
        revalidateOnFocus: false,
      }
    );

    useEffect(() => {
        const fetchCatched = async () => {
            const response = await axios.get("/api/catched");
            setCatched(response.data);
        }
        fetchCatched();
    }, []);
    
    if (error) return <div>Error al cargar</div>;

    return (
        <PokemonContext.Provider value={{
            pokemon,
            selectedPokemon,
            setSelectedPokemon,
            setOffset,
            isLoading,
            isValidating,
            catched,
            setCatched,
            setType,
            type
        }}>
            {children}
        </PokemonContext.Provider>
    )
};

export {PokemonProvider}

export default PokemonContext