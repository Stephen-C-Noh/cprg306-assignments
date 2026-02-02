import Item from "./Item";
import items from "./items.json";


export default function ItemList() {
  // Basic version without filtering
  // return (
  //   <ul className="space-y-2">
  //     {items.map((item) => (
  //       <Item key={item.id} {...item} />
  //     ))}
  //   </ul>
  // );

  // Enhanced version with filtering by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  // category names SORTED(Not required, but seems like the example have it sorted)
  const categories = Object.keys(groupedItems).sort();

    return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold capitalize mt-4">
            {category}
          </h2>
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