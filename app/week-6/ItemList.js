"use client";
import { useState } from "react";
import Item from "./Item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const buttonBase = "px-3 py-1 rounded-md text-sm font-medium";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";

  if (sortBy === "grouped") {
    const groupedItems = [...items].reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const categories = Object.keys(groupedItems).sort();
    categories.forEach((cat) => groupedItems[cat].sort((a, b) => a.name.localeCompare(b.name)));

    return (
      <div>
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
                <Item key={item.id} {...item} />
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
    <div>
      <div className="flex gap-2 mb-4">
        <button className={`${buttonBase} ${sortBy === "name" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("name")}>Sort by Name</button>
        <button className={`${buttonBase} ${sortBy === "category" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("category")}>Sort by Category</button>
        <button className={`${buttonBase} ${sortBy === "grouped" ? activeStyle : inactiveStyle}`} onClick={() => setSortBy("grouped")}>Group by Category</button>
      </div>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
