import type { PokemonResponse } from "../types/pokemon";

export const fetchPokemons = async (limit: number, offset: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data: PokemonResponse = await res.json();

  return data;
};
