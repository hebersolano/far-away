export default function Stats({ itemsData }) {
  const packedItems = itemsData.reduce((acc, item) => (item.completed ? acc + 1 : acc), 0);
  const percentage = (packedItems / itemsData.length) * 100;
  return (
    <div className="stats">
      {itemsData.length > 0 ? (
        <p>
          You have {itemsData.length} items on your list, and you already packed {packedItems} &#40;{percentage}%&#41;
        </p>
      ) : (
        <p>Add an item for your trip</p>
      )}
    </div>
  );
}
