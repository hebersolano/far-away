import { useState } from "react";

export default function Form({ addItem }) {
  const [formState, setFormState] = useState({ item: "", number: 0 });
  function handleChange(evt) {
    if (evt.target.type == "select-one")
      setFormState((state) => {
        return { ...state, number: evt.target.value };
      });

    if (evt.target.type == "text")
      setFormState((state) => {
        return { ...state, item: evt.target.value };
      });
  }

  function handleAddItem() {
    addItem(formState);
    setFormState({ item: "", number: 0 });
  }

  return (
    <div className="add-form">
      <p>What do you need for your trip?</p>
      <select name="items-number" value={formState.number} onChange={handleChange}>
        <option value="null">--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input type="text" name="item-description" value={formState.item} onChange={handleChange} placeholder="item..." />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}
