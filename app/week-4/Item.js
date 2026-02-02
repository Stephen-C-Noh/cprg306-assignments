
export default function Item({name, quantity, category}) {
  return (
    <li className="border border-gray-300 rounded-md p-2 shadow-sm">
      {name} - Quantity: {quantity} - Category: {category}
    </li>
  );
}