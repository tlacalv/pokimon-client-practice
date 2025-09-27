import React, { useEffect, useState } from "react";
import type { PokemonResponse, Result } from "../types/pokemon";
const LIMIT_RESULTS = 10;

//to another place

export const PokemonList = () => {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT_RESULTS;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_RESULTS}&offset=${offset}`
        );
        const data: PokemonResponse = await res.json();

        setList(data.results);
      } catch (e) {
        setList([]);
        console.log(e);
      }
    };

    fetchPokemons();
  }, [offset]);

  const onNext = () => {
    setPage((prev) => prev + 1);
  };
  const onPrev = () => {
    setPage((prev) => prev - 1);
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <h1>Pokimon</h1>

        {/* componentize list */}
        <div className="list-wrapper">
          <ul className="list">
            {list.map((item) => (
              <li className="item-list">
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <div className="controls">
            <button onClick={onPrev}>Prev page</button>
            <button onClick={onNext}>Next page</button>
          </div>
        </div>
      </div>
    </div>
  );
};
