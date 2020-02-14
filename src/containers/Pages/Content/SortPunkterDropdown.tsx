import React from "react";

interface Props {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

export const SortPunkterDropdown: React.FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <div className="content__sort-by">
      <div className="content__sort-by-inner">
        <select
          name={sortBy}
          data-testid="sort-by"
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Active">Active</option>
        </select>
      </div>
    </div>
  );
};
