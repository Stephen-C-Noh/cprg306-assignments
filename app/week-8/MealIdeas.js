"use client";

import { useEffect, useState } from "react";

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [heroImageBroken, setHeroImageBroken] = useState(false);

  useEffect(() => {
    if (!ingredient) {
      setMeals([]);
      setError(null);
      setHeroImageBroken(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);
    setHeroImageBroken(false);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        setMeals(data.meals ?? []);
      })
      .catch(() => {
        if (ignore) return;
        setError("Could not load meal ideas.");
        setMeals([]);
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [ingredient]);

  const heroImage = heroImageBroken ? null : meals[0]?.strMealThumb;

  return (
    <section className="max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl">
      <div className="relative aspect-square w-full">
        {heroImage ? (
          <img
            src={heroImage}
            alt={`Meal idea for ${ingredient}`}
            className="h-full w-full object-cover"
            onError={() => setHeroImageBroken(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-orange-200 via-amber-100 to-slate-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
            Meal Ideas
          </p>
          <h2 className="mt-1 text-2xl font-semibold leading-tight sm:text-3xl">
            {ingredient ? `Ideas for "${ingredient}"` : "Select a grocery item"}
          </h2>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {!ingredient && <p className="text-slate-600">Choose an item to see ideas.</p>}

        {ingredient && loading && (
          <p className="text-slate-600">Loading meal ideas for "{ingredient}"...</p>
        )}

        {ingredient && error && <p className="text-red-600">{error}</p>}

        {ingredient && !loading && !error && meals.length === 0 && (
          <p className="text-slate-700">No meals found.</p>
        )}

        {ingredient && !loading && !error && meals.length > 0 && (
          <div>
            <p className="mb-3 text-sm text-slate-500">{meals.length} meal ideas found</p>
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  {meal.strMeal}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

