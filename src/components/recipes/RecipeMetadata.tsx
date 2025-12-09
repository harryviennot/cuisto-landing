import { Clock, Users, ChefHat, Fire } from "@phosphor-icons/react/dist/ssr";
import type { DifficultyLevel } from "@/types/recipe";

interface Props {
  prepTime: number | null;
  cookTime: number | null;
  totalTime: number | null;
  servings: number | null;
  difficulty: DifficultyLevel | null;
  timesCooked: number;
  translations: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    servings: string;
    difficulty: string;
    timesCookedBy: string;
    easy: string;
    medium: string;
    hard: string;
    minutes: string;
  };
}

function formatTime(minutes: number | null, minutesLabel: string): string | null {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} ${minutesLabel}`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}${minutesLabel}`;
}

export default function RecipeMetadata({
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
  timesCooked,
  translations: t,
}: Props) {
  const difficultyColors: Record<DifficultyLevel, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
  };

  const difficultyLabels: Record<DifficultyLevel, string> = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
  };

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {/* Total Time */}
      {totalTime && (
        <div className="flex items-center gap-2 text-text-body">
          <Clock className="w-4 h-4 text-primary" weight="fill" />
          <span>{formatTime(totalTime, t.minutes)}</span>
        </div>
      )}

      {/* Prep Time */}
      {prepTime && !totalTime && (
        <div className="flex items-center gap-2 text-text-body">
          <Clock className="w-4 h-4 text-text-muted" weight="regular" />
          <span>
            {t.prepTime}: {formatTime(prepTime, t.minutes)}
          </span>
        </div>
      )}

      {/* Cook Time */}
      {cookTime && !totalTime && (
        <div className="flex items-center gap-2 text-text-body">
          <Fire className="w-4 h-4 text-text-muted" weight="fill" />
          <span>
            {t.cookTime}: {formatTime(cookTime, t.minutes)}
          </span>
        </div>
      )}

      {/* Servings */}
      {servings && (
        <div className="flex items-center gap-2 text-text-body">
          <Users className="w-4 h-4 text-primary" weight="fill" />
          <span>
            {servings} {t.servings}
          </span>
        </div>
      )}

      {/* Difficulty */}
      {difficulty && (
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}
        >
          <ChefHat className="w-3.5 h-3.5" weight="fill" />
          <span>{difficultyLabels[difficulty]}</span>
        </div>
      )}

      {/* Times Cooked */}
      {timesCooked > 0 && (
        <div className="flex items-center gap-2 text-text-muted text-xs">
          <Fire className="w-3.5 h-3.5" weight="fill" />
          <span>{t.timesCookedBy}</span>
        </div>
      )}
    </div>
  );
}
