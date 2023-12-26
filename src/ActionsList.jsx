export default function ActionsList() {
  return (
    <div className="actions">
      <select name="sort-by" id="">
        <option value="by-addition">Sort by addition</option>
        <option value="by-description">Sort by description</option>
        <option value="by-package-status">Sort by package status</option>
      </select>
      <button>Clear List</button>
    </div>
  );
}
