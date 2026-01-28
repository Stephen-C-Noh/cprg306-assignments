export default function Item({ name, quantity, category }) {
  return (

    <li className="border border-grey-300 bg-white p-4 mb-2 rounded-lg shadow-sm list-none space-y-1">
        <p className="text-lg font-semibold">Item: {name}</p>
        <p className="text-sm text-gray-500 capitalize">Category: {category}</p>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
    </li>
  );
}