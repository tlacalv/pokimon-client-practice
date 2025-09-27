import React from "react";
import type { Result } from "../types/pokemon";

interface IProps {
  list: Result[];
  onPrev: () => void;
  onNext: () => void;
}
export const PaginatedList = ({ list, onPrev, onNext }: IProps) => {
  return (
    <div className="list-wrapper">
      <ul className="list">
        {list.map((item) => (
          <li key={item.name} className="item-list">
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="controls">
        <button onClick={onPrev}>Prev page</button>
        <button onClick={onNext}>Next page</button>
      </div>
    </div>
  );
};
