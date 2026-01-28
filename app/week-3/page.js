import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="flex justify-center-safe flex-col items-center p-4">
      <div>
        <h1 className="text-4xl font-bold mb-4">Shopping List</h1>
      </div>
      <GroceryItemList />
    </main>
  );
}