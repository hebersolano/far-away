import { useState } from "react";

export default function ActionsList({ sortItems, removeAllItems }) {
  const [lastSortType, setLastSortType] = useState("by-addition");

  function handleChange(evt) {
    console.log(evt.target.value);
    const sortType = evt.target.value;
    if (sortType == "by-addition" && lastSortType !== "by-addition") sortItems.sortByAddition();
    if (sortType == "by-description" && lastSortType !== "by-description") sortItems.sortByDescription();
    if (sortType == "by-package-status" && lastSortType !== "by-package-status") sortItems.sortByStatus();
    setLastSortType(sortType);
  }
  return (
    <div className="actions">
      <select name="sort-by" onChange={handleChange}>
        <option value="by-addition">Sort by addition</option>
        <option value="by-description">Sort by description</option>
        <option value="by-package-status">Sort by package status</option>
      </select>
      <button onClick={removeAllItems}>Clear List</button>
    </div>
  );
}
