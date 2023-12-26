export default function ItemList({ itemData, removeItem, itemPacked }) {
  function handleRemove() {
    removeItem(itemData.id);
  }

  function handleCheck(evt) {
    itemPacked(itemData.id);
  }

  return (
    <li>
      <input type="checkbox" name="" checked={itemData.completed} onChange={handleCheck} />
      <span style={{ textDecoration: itemData.completed ? "line-through" : "none" }}>
        {itemData.number} {itemData.item}
      </span>
      <button onClick={handleRemove}>&times;</button>
    </li>
  );
}
