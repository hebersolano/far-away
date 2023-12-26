import { useState } from "react";

export default function Form({ addItem }) {
  const [formState, setFormState] = useState({ description: "", quantity: 1 });
  function handleChange(evt) {
    if (evt.target.type == "select-one")
      setFormState((state) => {
        return { ...state, quantity: evt.target.value };
      });

    if (evt.target.type == "text")
      setFormState((state) => {
        return { ...state, description: evt.target.value };
      });
  }

  function handleAddItem() {
    addItem(formState);
    setFormState({ description: "", quantity: 0 });
  }

  return (
    <div className="add-form">
      <p>What do you need for your trip?</p>
      <select name="items-number" value={formState.quantity} onChange={handleChange}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num, i) => (
          <option key={i} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item-description"
        value={formState.description}
        onChange={handleChange}
        placeholder="item..."
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}
