"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/contexts/AuthContext";
import GroceryItemList from "./GroceryItemList";
import NewGroceryItem from "./NewGroceryItem";
import itemsData from "./grocery-items.json";
import MealIdeas from "./MealIdeas";
import Link from "next/link";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/week-9");
    }
  }, [user]);

  const [items, setItems] = useState(itemsData);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && sessionStorage.getItem("justLoggedIn")) {
      sessionStorage.removeItem("justLoggedIn");
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  function handleSelectedItem(name) {
    setSelectedIngredient(name);
    setIsModalOpen(true);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  return (
    <>
      {showWelcome && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
          <span>Welcome, {user?.displayName}!</span>
          <button
            onClick={() => setShowWelcome(false)}
            className="text-white font-bold hover:text-green-200 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
      <main
        className={`p-4 max-w-2xl mx-auto transition-[filter] duration-200 ${
          isModalOpen ? "blur-sm" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Shopping List and Meal Ideas</h1>
          <div className="flex gap-2">
            <Link
              href="/week-9/profile"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={() => firebaseSignOut()}
              className="border border-red-300 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
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
