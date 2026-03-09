"use client";
import { useState } from "react";
import GroceryItemList from "./GroceryItemList";
import NewGroceryItem from "./NewGroceryItem";
import itemsData from "./grocery-items.json";
import MealIdeas from "./MealIdeas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelectedItem(name) {
    setSelectedIngredient(name);
    setIsModalOpen(true);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  return (
    <>
      <main
        className={`p-4 max-w-xl mx-auto transition-[filter] duration-200 ${
          isModalOpen ? "blur-sm" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        <h1 className="text-3xl font-bold mb-4">Shopping List and Meal Ideas</h1>
        <NewGroceryItem onAddItem={handleAddItem} />
        <GroceryItemList items={items} onSelectItem={handleSelectedItem} />
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 my-6 w-full max-w-xl">
            <button
              className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-2xl font-bold leading-none text-slate-600 backdrop-blur hover:text-red-600 focus:outline-none"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <MealIdeas ingredient={selectedIngredient} />
          </div>
        </div>
      )}
    </>
  );
}
