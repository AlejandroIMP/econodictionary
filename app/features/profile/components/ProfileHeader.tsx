import { User as UserIcon } from "lucide-react";
import type { ProfileData } from "../hooks/useProfile";
import { Badge } from "../../shared/components/ui";

interface ProfileHeaderProps {
  profileData: ProfileData;
  isLoading?: boolean;
}

/**
 * Componente que muestra el encabezado del perfil con avatar y datos básicos
 */
export function ProfileHeader({ profileData, isLoading }: ProfileHeaderProps) {
  const fullName = [profileData.name, profileData.surname]
    .filter(Boolean)
    .join(" ") || "No name set";

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg">
          {profileData.avatar ? (
            <img
              src={profileData.avatar}
              alt={fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserIcon className="w-16 h-16 text-white" />
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {fullName}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-1">
          @{profileData.username}
        </p>

        <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
          {profileData.requiresEmailConfirmation && (
            <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30">
              Email unconfirmed
            </Badge>
          )}
          <Badge variant="default" className="bg-blue-600">
            Member
          </Badge>
        </div>
      </div>
    </div>
  );
}
