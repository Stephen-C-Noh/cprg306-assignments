"use client";
import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items, onSelectItem=() => {handleSelectedItem} }) {
  const [sortBy, setSortBy] = useState("name");

  const buttonBase = "px-3 py-1 rounded-md text-sm font-medium";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";
  
  function extractName(name){
    let nameBeforeComma = name.substring(0, name.indexOf(",") !== -1 ? name.indexOf(",") : name.length).trim();
    // Keep only alphabet and whitespace characters
    nameBeforeComma = nameBeforeComma.replace(/[^A-Za-z\s]/g, "");
    return nameBeforeComma.trim();
  }

  if (sortBy === "grouped") {
    const groupedItems = [...items].reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const categories = Object.keys(groupedItems).sort();
    categories.forEach((cat) => groupedItems[cat].sort((a, b) => a.name.localeCompare(b.name)));

    return (
      <div className="mt-6">
        <div className="flex gap-2 mb-4">
          <button className={`${buttonBase} ${sortBy === "name" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("name")}>Sort by Name</button>
          <button className={`${buttonBase} ${sortBy === "category" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("category")}>Sort by Category</button>
          <button className={`${buttonBase} ${sortBy === "grouped" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("grouped")}>Group by Category</button>
        </div>
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-xl font-bold capitalize mt-4">{category}</h2>
            <ul className="space-y-2">
              {groupedItems[category].map((item) => (
                <GroceryItem
                  key={item.id}
                  {...item}
                  onSelect={() => {
                    let nameBeforeComma = extractName(item.name);
                    if (onSelectItem) onSelectItem(nameBeforeComma);
                  }}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        <button className={`${buttonBase} ${sortBy === "name" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("name")}>Sort by Name</button>
        <button className={`${buttonBase} ${sortBy === "category" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("category")}>Sort by Category</button>
        <button className={`${buttonBase} ${sortBy === "grouped" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("grouped")}>Group by Category</button>
      </div>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <GroceryItem
            key={item.id}
            {...item}
            onSelect={() => {
              let nameBeforeComma = extractName(item.name);
              console.log(nameBeforeComma);
              if (onSelectItem) onSelectItem(nameBeforeComma);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
