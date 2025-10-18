import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks";

export interface ProfileData {
  userId: string;
  email: string;
  username: string;
  name?: string;
  surname?: string;
  avatar?: string;
  requiresEmailConfirmation?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UseProfileReturn {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetchProfileData: () => Promise<void>;
}

/**
 * Hook para gestionar los datos del perfil del usuario
 * Obtiene datos desde authStore y sincroniza con el endpoint /api/auth/me
 */
export function useProfile(): UseProfileReturn {
  const { user, getUserData, isLoading: authLoading, error: authError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        await getUserData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading profile data");
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      loadProfileData();
    }
  }, []);

  const refetchProfileData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await getUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error refreshing profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const profileData: ProfileData | null = user
    ? {
        userId: user.userId,
        email: user.email,
        username: user.username,
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
        requiresEmailConfirmation: user.requiresEmailConfirmation,
      }
    : null;

  return {
    profileData,
    isLoading: authLoading || isLoading,
    error: error || (authError ? authError.message : null),
    refetchProfileData,
  };
}
