"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  function handleSubmit(e) {
    e.preventDefault();
    // Create Object: create an item object with the current name, quantity, and category.
    const newItem = { name, quantity, category };
    // log the item
    console.log("New Item:", newItem);
    // User feedback: call alert() to display the detail of created item
    alert(`Item Added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    // Reset form fields
    setName("");
    setQuantity(1);
    setCategory("produce");
  }
  return (
    <form className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2 dark:text-gray-200">New Item</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
        <input
          type="text"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="mb-2 flex flex-row space-x-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity:
          </label>
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        label="+">
            +
        </button>
    </form>
  );
}
