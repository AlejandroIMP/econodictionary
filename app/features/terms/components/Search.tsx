import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "~/features/shared/components/ui/input";
import { Button } from "~/features/shared/components/ui/button";
import { cn } from "~/features/shared/utils";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Search({
  value,
  onChange,
  placeholder = "Buscar términos...",
  className,
}: SearchProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="search-terms" className="sr-only">
        Buscar términos económicos
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        id="search-terms"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
        aria-label="Buscar términos por nombre o definición"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
