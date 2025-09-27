import React, { useEffect, useState } from "react";
import type { PokemonResponse, Result } from "../types/pokemon";
const LIMIT_RESULTS = 10;

export const PokemonList = () => {
  // TODO save previous responses in memory to prevent another request
  // should I do it by spliting array and making calculations assuming list will always start from the first element?
  // this approach might save up memory and be less complex but aslo not future proof and there might be some pitfalls I'm missing
  // app will always start showing the first elements of the list, so we can go with the array approach for now
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT_RESULTS;

  useEffect(() => {
    //TODO: move fetch into an utils file
    //TODO:  might add an input to search pokemons and render that instead of the main list
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
