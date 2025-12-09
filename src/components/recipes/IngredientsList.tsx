import type { Ingredient } from "@/types/recipe";

interface Props {
  ingredients: Ingredient[];
  title: string;
}

export default function IngredientsList({ ingredients, title }: Props) {
  if (!ingredients || ingredients.length === 0) return null;

  // Group ingredients by their group field
  const groupedIngredients = ingredients.reduce<Record<string, Ingredient[]>>(
    (acc, ing) => {
      const group = ing.group || "_default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(ing);
      return acc;
    },
    {}
  );

  const groups = Object.entries(groupedIngredients);
  const hasGroups = groups.length > 1 || (groups.length === 1 && groups[0][0] !== "_default");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-heading">{title}</h2>

      {hasGroups ? (
        // Render grouped ingredients
        <div className="space-y-6">
          {groups.map(([group, items]) => (
            <div key={group}>
              {group !== "_default" && (
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
                  {group}
                </h3>
              )}
              <ul className="space-y-2">
                {items.map((ing, idx) => (
                  <IngredientItem key={`${group}-${idx}`} ingredient={ing} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        // Render flat list
        <ul className="space-y-2">
          {ingredients.map((ing, idx) => (
            <IngredientItem key={idx} ingredient={ing} />
          ))}
        </ul>
      )}
    </div>
  );
}

function IngredientItem({ ingredient }: { ingredient: Ingredient }) {
  const { name, quantity, unit, notes } = ingredient;

  return (
    <li className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div className="flex-1">
        <span className="text-text-heading">
          {quantity && (
            <span className="font-medium">
              {quantity}
              {unit && ` ${unit}`}{" "}
            </span>
          )}
          {name}
        </span>
        {notes && (
          <span className="text-text-muted text-sm ml-1">({notes})</span>
        )}
      </div>
    </li>
  );
}
