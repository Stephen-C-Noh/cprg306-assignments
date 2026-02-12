import NewItem from "./NewItem";

export default function Page(){
    return (
        <main className="p-4 bg-gray-300 min-h-screen dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4">Week 5: New Item Form</h1>
            <NewItem />
        </main>
    );
}