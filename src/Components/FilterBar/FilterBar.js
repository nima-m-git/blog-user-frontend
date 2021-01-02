import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "../index";
import "./FilterBar.scss";

const buttons = [
  {
    states: ["Ascending", "Descending"],
    filter: "order",
  },
];

const FilterBar = ({ posts, setFilteredPosts, username }) => {
  const initialFilters = useMemo(
    () => ({
      order: "Ascending",
    }),
    []
  );

  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = useCallback(() => setFilters(initialFilters), [
    initialFilters,
  ]);

  useEffect(() => {
    let filtered = [...posts];

    if (!filters || filters.viewAll === false) {
      filtered = [];
    } else {
      if (filters.usersPosts === true) {
        filtered = filtered.filter((post) => post.author === username);
      } else if (filters.userPosts === false) {
        filtered = filtered.filter((post) => post.author !== username);
      }

      if (filters.published === true) {
        filtered = filtered.filter((post) => post.published);
      } else if (filters.published === false) {
        filtered = filtered.filter((post) => !post.published);
      }

      if (filters.dateAdded === true) {
        filtered = filtered.sort((a, b) =>
          a.timeCreated > b.timeCreated ? 1 : -1
        );
      } else if (filters.dateAdded === false) {
        filtered = filtered.sort((a, b) =>
          a.timeCreated < b.timeCreated ? 1 : -1
        );
      }
    }

    setFilteredPosts(filtered);
  }, [setFilters, posts, username, filters, setFilteredPosts]);

  return (
    <div className="filter-bar">
      {buttons.map((button, i) => (
        <Button
          {...{ button }}
          {...{ resetFilters }}
          {...{ setFilters }}
          {...{ filters }}
          key={i}
        />
      ))}
    </div>
  );
};

export default FilterBar;
