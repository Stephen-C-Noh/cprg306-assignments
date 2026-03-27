
export default function GroceryItem({ name, quantity, category, onSelect }) {
  return (
    <li
      className="border border-gray-300 rounded-md p-2 shadow-sm cursor-pointer"
      onClick={onSelect}
    >
      {name} - Quantity: {quantity} - Category: {category}
    </li>
  );
}