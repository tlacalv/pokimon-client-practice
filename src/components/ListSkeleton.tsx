import React from "react";

export const ListSkeleton = () => {
  const list = new Array(10).fill(null);
  return (
    <div className="list-wrapper">
      <ul className="list">
        {list.map((_, i) => (
          <li key={i} className="skeleton-item-list"></li>
        ))}
      </ul>
      <div className="controls">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};
