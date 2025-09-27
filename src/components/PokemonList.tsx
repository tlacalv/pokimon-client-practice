import React, { useEffect, useRef, useState } from "react";
import type { Result } from "../types/pokemon";
import { PaginatedList } from "./PaginatedList";
import { fetchPokemons } from "../utils";
import { ListSkeleton } from "./ListSkeleton";
const LIMIT_RESULTS = 10;
type listPages = {
  [key: number]: Result[];
};
export const PokemonList = () => {
  //TODO: save elements in localstorage
  //TODO: add modal for data of each pokimon and save that in localstorage as well
  const [list, setList] = useState<listPages>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const countRef = useRef<number>(null);
  const offset = (page - 1) * LIMIT_RESULTS;
  const currentList = list[page] ?? [];

  useEffect(() => {
    const fetchCall = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemons(LIMIT_RESULTS, offset);
        if (!countRef.current) {
          countRef.current = data.count;
        }
        setList((prev) => {
          return {
            ...prev,
            [page]: data.results,
          };
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setList({});
        console.error(e);
      }
    };
    if (!list[page]) {
      fetchCall();
    }
  }, [page]);

  const onNext = () => {
    if (
      countRef.current! &&
      page >= Math.ceil(countRef.current! / LIMIT_RESULTS)
    ) {
      return;
    }

    setPage((prev) => prev + 1);
  };
  const onPrev = () => {
    if (page <= 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <h1 className="title">Pokimon</h1>
        {loading || currentList.length === 0 ? (
          <ListSkeleton />
        ) : (
          <PaginatedList list={currentList} onPrev={onPrev} onNext={onNext} />
        )}
      </div>
    </div>
  );
};
