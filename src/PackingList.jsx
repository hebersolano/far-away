import ActionsList from "./ActionsList";
import ItemList from "./ItemList";

export default function PackingList({ itemsData, removeItem, itemPacked, sortItems, removeAllItems }) {
  return (
    <div className="list">
      <ul>
        {itemsData.map((item) => (
          <ItemList key={item.id} itemData={item} removeItem={removeItem} itemPacked={itemPacked} />
        ))}
      </ul>
      <ActionsList sortItems={sortItems} removeAllItems={removeAllItems} />
    </div>
  );
}
