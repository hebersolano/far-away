export default function ItemList({ itemData, removeItem, itemPacked }) {
  function handleRemove() {
    removeItem(itemData.uuid);
  }

  function handleCheck(evt) {
    itemPacked(itemData.uuid);
  }

  return (
    <li>
      <input type="checkbox" name="" checked={itemData.completed} onChange={handleCheck} />
      <span style={{ textDecoration: itemData.completed ? "line-through" : "none" }}>
        {itemData.quantity} {itemData.description}
      </span>
      <button onClick={handleRemove}>&times;</button>
    </li>
  );
}
