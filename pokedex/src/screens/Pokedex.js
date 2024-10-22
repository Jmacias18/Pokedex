import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getPokemonsApi,
  getPokemonDetailsByUrlApi,
  getPokemonsApiTotal,
} from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import useAuth from "../hooks/useAuth";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [load, setLoad] = useState(false);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    (async () => {
      await loadPokemons();
      // await loadPokemonsTotal();
    })();
  }, []);

  // const loadPokemonsTotal = async () => {
  //   try {
  //     const responseTotal = await getPokemonsApiTotal();

  //     const pokemonsArrayTotal = [];
  //     for await (const pokemon of responseTotal.results) {
  //       const pokemonDetailsTotal = await getPokemonDetailsByUrlApi(
  //         pokemon.url
  //       );

  //       pokemonsArrayTotal.push({
  //         id: pokemonDetailsTotal.id,
  //         name: pokemonDetailsTotal.name,
  //         type: pokemonDetailsTotal.types[0].type.name,
  //         order: pokemonDetailsTotal.order,
  //         image:
  //           pokemonDetailsTotal.sprites.other["official-artwork"].front_default,
  //       });
  //     }
  //     setFilterData([...pokemonsArrayTotal]);
  //     console.log(filterData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const loadPokemons = async () => {
    try {
      // const response = await getPokemonsApi(nextUrl);

      const response = await getPokemonsApiTotal(nextUrl);

      setNextUrl(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      console.log("uno");
      console.log([...pokemons]);
      console.log("dos");

      console.log([...pokemonsArray]);
      console.log("resultado");

      setPokemons([...pokemons, ...pokemonsArray]);
      setFilterData([...pokemons, ...pokemonsArray]);
      setLoad(true);
      console.log(pokemons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <SafeAreaView>  // se coloco esto cuando es vista, pero con la lista no funcionaba , y al hacer scroll, la lista estaba en las notificacion
    // Asi que el SafeArea lo coloque en la lista, y ahi si funcion
    <>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        filterData={filterData}
        setFilterData={setFilterData}
        valor={true}
        load={load}
      />
    </>

    // </SafeAreaView>
  );
}
