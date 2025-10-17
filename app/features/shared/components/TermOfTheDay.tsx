import { Link } from "react-router";
import { ArrowRight, Lightbulb, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";
import { Button } from "~/features/shared/components/ui/button";
import { Badge } from "~/features/shared/components/ui/badge";
import { useTerms } from "~/features/terms/hooks/useTerms";
import { type Term } from "~/features/terms/types";

// Función para obtener un término basado en la fecha actual (cambia diariamente)
function getDailyTerm(terms: Term[]) {
  if (terms.length === 0) return null;

  // Usar la fecha actual en GMT como semilla para consistencia
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Crear un hash simple de la fecha para obtener un índice consistente
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash) + today.charCodeAt(i);
    hash = hash & hash; // Convertir a 32 bits
  }

  // Usar el hash absoluto para obtener un índice válido
  const randomIndex = Math.abs(hash) % terms.length;
  return terms[randomIndex];
}

interface TermOfTheDayProps {
  className?: string;
}

export function TermOfTheDay({ className = "" }: TermOfTheDayProps) {
  const { terms, isLoading, error } = useTerms();

  // Obtener el término del día basado en la fecha actual y los términos disponibles
  const dailyTerm = getDailyTerm(terms);

  // Mostrar loading state
  if (isLoading) {
    return (
      <section className={`py-16 -mt-8 relative z-10 ${className}`}>
        <div className="container mx-auto px-4">
          <Card className="term-of-day max-w-4xl mx-auto shadow-2xl border-2 border-blue-100 dark:border-blue-900">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">
                      Término del Día
                    </CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-300">
                      Cargando...
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white">Nuevo</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Mostrar error state
  if (error || !dailyTerm) {
    return (
      <section className={`py-16 -mt-8 relative z-10 ${className}`}>
        <div className="container mx-auto px-4">
          <Card className="term-of-day max-w-4xl mx-auto shadow-2xl border-2 border-red-100 dark:border-red-900">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-50 dark:from-red-950/50 dark:to-red-950/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-red-900 dark:text-red-100">
                      Término del Día
                    </CardTitle>
                    <CardDescription className="text-red-700 dark:text-red-300">
                      {error ? "Error al cargar el término" : "No hay términos disponibles"}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-red-600 text-white">Error</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-red-600 dark:text-red-400">
                {error || "No se pudieron cargar los términos. Inténtalo de nuevo más tarde."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 -mt-8 relative z-10 ${className}`}>
      <div className="container mx-auto px-4">
        <Card className="term-of-day max-w-4xl mx-auto shadow-2xl border-2 border-blue-100 dark:border-blue-900">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">
                    Término del Día
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    Actualizado diariamente
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white">Nuevo</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {dailyTerm.name}
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {dailyTerm.definition}
            </p>
            <div className="flex items-center justify-between sm:flex-row flex-col gap-4">
              <Badge variant="secondary" className="text-sm">
                {dailyTerm.category}
              </Badge>
              <Link to={`/terms/${dailyTerm.id}`}>
                <Button variant="link" className="text-blue-600">
                  Ver más detalles
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}