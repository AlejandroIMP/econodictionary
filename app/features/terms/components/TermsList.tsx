import { Link } from "react-router";
import { Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/features/shared/components/ui/card";
import { Badge } from "~/features/shared/components/ui/badge";
import { cn } from "~/features/shared/utils";
import type { Term } from "../types";

interface TermsListProps {
  terms: Term[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function TermsList({
  terms,
  isLoading = false,
  emptyMessage = "No terms found",
  className,
}: TermsListProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {[...Array(6)].map((_, i) => (
          <TermCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (terms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{emptyMessage}</p>
        <p className="mt-2 text-sm text-zinc-500">Intenta ajustar tus filtros o consulta de búsqueda</p>
      </div>
    );
  }

  return (
    <section 
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-label="Lista de términos económicos"
    >
      {terms.map((term) => (
        <TermCard key={term.id} term={term} />
      ))}
    </section>
  );
}

interface TermCardProps {
  term: Term;
}

function TermCard({ term }: TermCardProps) {
  return (
    <article>
      <Link to={`/terms/${term.id}`} className="block transition-transform hover:scale-[1.02]">
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl line-clamp-2">
              {term.name}
            </CardTitle>
            {term.category && (
              <Badge variant="secondary" className="w-fit">
                {term.category}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="pb-3">
            <CardDescription className="line-clamp-3 text-sm">
              {term.definition}
            </CardDescription>

            {term.example && (
              <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Ejemplo:
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {term.example}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-xs text-zinc-500 pt-0">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={new Date(term.createdAt).toISOString()}>
                {new Date(term.createdAt).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
}

function TermCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </CardFooter>
    </Card>
  );
}
