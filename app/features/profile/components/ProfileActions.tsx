import { Edit2, LogOut, RefreshCw } from "lucide-react";
import { Button } from "../../shared/components/ui";
import type { ProfileData } from "../hooks/useProfile";

interface ProfileActionsProps {
  profileData: ProfileData;
  onRefresh: () => Promise<void>;
  onLogout: () => Promise<void>;
  isLoading?: boolean;
}

/**
 * Componente que muestra las acciones disponibles para el perfil
 */
export function ProfileActions({
  profileData,
  onRefresh,
  onLogout,
  isLoading,
}: ProfileActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onRefresh}
        disabled={isLoading}
        variant="outline"
        className="gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh Profile
      </Button>

      <Button
        variant="outline"
        className="gap-2"
        disabled={isLoading}
      >
        <Edit2 className="w-4 h-4" />
        Edit Profile
      </Button>

      <Button
        onClick={onLogout}
        variant="destructive"
        className="gap-2 ml-auto"
        disabled={isLoading}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
}
