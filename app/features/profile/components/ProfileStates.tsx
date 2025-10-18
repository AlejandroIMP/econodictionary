import { Loader2 } from "lucide-react";
import { Card } from "../../shared/components/ui";

export function ProfileLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="flex-1 w-full">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2 w-1/2" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-24" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-24" />
            </div>
          </div>
        </div>
      </Card>

      {/* Info skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/4 mb-2" />
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/**
 * Componente que muestra un estado de carga
 */
export function ProfileLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
      </div>
    </div>
  );
}

/**
 * Componente que muestra un mensaje de error
 */
export function ProfileError({ error }: { error: string }) {
  return (
    <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
        Error loading profile
      </h3>
      <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
    </Card>
  );
}
