"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import type { MenuGroup } from "@/lib/business";
import { cn } from "@/lib/cn";

type Meal = "breakfast" | "lunch";

export function MenuExplorer({
  breakfast,
  lunch,
}: {
  breakfast: MenuGroup[];
  lunch: MenuGroup[];
}) {
  const [meal, setMeal] = useState<Meal>("breakfast");
  const [query, setQuery] = useState("");

  const groups = meal === "breakfast" ? breakfast : lunch;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) =>
            it.name.toLowerCase().includes(q) ||
            it.desc?.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Meal toggle */}
        <div
          role="tablist"
          aria-label="Menu section"
          className="inline-flex rounded-xl border border-sand bg-card p-1"
        >
          {(["breakfast", "lunch"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={meal === m}
              onClick={() => setMeal(m)}
              className={cn(
                "min-h-11 rounded-lg px-5 text-sm font-medium capitalize transition-colors",
                meal === m
                  ? "bg-espresso text-paper"
                  : "text-stone hover:text-espresso",
              )}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <MagnifyingGlass
            weight="regular"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search the ${meal} menu…`}
            aria-label={`Search the ${meal} menu`}
            className="min-h-11 w-full rounded-xl border border-sand bg-card pl-9 pr-3 text-base text-espresso placeholder:text-stone/60 focus:border-clay focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="text-stone">
            No items match &ldquo;{query}&rdquo;. Try another search.
          </p>
        ) : (
          filtered.map((g) => (
            <div
              key={g.group}
              className="rounded-2xl border border-sand bg-card p-6"
            >
              <h3 className="font-display text-xl font-semibold text-espresso">
                {g.group}
              </h3>
              <ul className="mt-4 divide-y divide-sand">
                {g.items.map((it) => (
                  <li key={it.name} className="py-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-medium text-espresso">{it.name}</p>
                      {it.price && (
                        <span className="shrink-0 font-display font-semibold text-clay">
                          {it.price}
                        </span>
                      )}
                    </div>
                    {it.desc && (
                      <p className="mt-0.5 text-sm text-stone">{it.desc}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
