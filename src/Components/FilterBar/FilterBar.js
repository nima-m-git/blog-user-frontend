import { useEffect, useState } from "react";

import { Button } from "../index";
import "./FilterBar.scss";

const button = {
  states: ["Ascending", "Descending"],
  filter: "order",
};

const FilterBar = ({ setFilter }) => {
  const [choice, setChoice] = useState("timeCreated");
  const [order, setOrder] = useState("Ascending");

  useEffect(() => {
    setFilter(choice, order);
  }, [choice, order, setFilter]);

  return (
    <div className="filter-bar">
      <select value={choice} onChange={(e) => setChoice(e.target.value)}>
        <option value="timeCreated">Added</option>
        <option value="timeLastEdited">Edited</option>
        <option value="comments">Comments</option>
      </select>
      <Button {...{ button }} handleToggle={setOrder} />
    </div>
  );
};

export default FilterBar;
