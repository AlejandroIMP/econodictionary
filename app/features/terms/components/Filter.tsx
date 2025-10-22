import { Filter as FilterIcon, X } from "lucide-react";
import { Select } from "~/features/shared/components/ui/select";
import { Button } from "~/features/shared/components/ui/button";
import { Badge } from "~/features/shared/components/ui/badge";
import { cn } from "~/features/shared/utils";

interface FilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  isLoading?: boolean;
  className?: string;
}

export function Filter({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading = false,
  className,
}: FilterProps) {
  const hasActiveFilter = selectedCategory && selectedCategory !== "All Categories";

  return (
    <fieldset className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <legend className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-zinc-500" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Filtrar por:
        </span>
      </legend>

      <div className="flex flex-1 items-center gap-2">
        <label htmlFor="category-filter" className="sr-only">
          Seleccionar categoría
        </label>
        <Select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 sm:w-auto sm:min-w-[200px]"
          disabled={isLoading}
          aria-label="Filtrar términos por categoría"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange("All Categories")}
            className="gap-1"
            aria-label="Limpiar filtros"
          >
            <X className="h-3 w-3" />
            Limpiar
          </Button>
        )}
      </div>

      {hasActiveFilter && (
        <div className="flex flex-wrap gap-2" role="status" aria-live="polite">
          <Badge variant="secondary" className="gap-1">
            {selectedCategory}
            <button
              onClick={() => onCategoryChange("All Categories")}
              className="ml-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
              aria-label={`Eliminar filtro ${selectedCategory}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}
    </fieldset>
  );
}
