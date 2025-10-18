import { Mail, AtSign, Calendar } from "lucide-react";
import type { ProfileData } from "../hooks/useProfile";
import { Card } from "../../shared/components/ui";

interface ProfileContactInfoProps {
  profileData: ProfileData;
}

/**
 * Componente que muestra la información de contacto del usuario
 */
export function ProfileContactInfo({ profileData }: ProfileContactInfoProps) {
  const joinDate = profileData.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        Contact Information
      </h2>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
            <p className="font-medium text-slate-900 dark:text-white break-all">
              {profileData.email}
            </p>
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <AtSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Username</p>
            <p className="font-medium text-slate-900 dark:text-white">
              @{profileData.username}
            </p>
          </div>
        </div>

        {/* Join Date */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Member since
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              {joinDate}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
