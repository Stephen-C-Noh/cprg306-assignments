"use client";

import { useEffect, useRef, useState } from "react";

export default function GroceryItem({
  id,
  name,
  quantity,
  category,
  onSelect = () => {},
  onDeleteItem = () => {},
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  function handleToggleMenu(e) {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }

  function handleDelete(e) {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDeleteItem(id);
  }

  function handleModify(e) {
    e.stopPropagation();
    setIsMenuOpen(false);
    // handleModify logic here
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <li
      className="relative border border-gray-300 rounded-md p-3 shadow-sm cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
      onClick={onSelect}
    >
      <div className="pr-10">
        {name} - Quantity: {quantity} - Category: {category}
      </div>

      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          type="button"
          className="h-8 w-8 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={handleToggleMenu}
          aria-label="Open item actions"
          aria-expanded={isMenuOpen}
        >
          ...
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-28 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 z-20">
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleModify}
              
            >
              Modify
            </button>
          </div>
        )}
      </div>
    </li>
  );
}