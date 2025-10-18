import { useNavigate } from "react-router";
import { useAuth } from "~/features/auth/hooks";
import { useProfile } from "~/features/profile/hooks";
import {
  ProfileHeader,
  ProfileContactInfo,
  ProfileActions,
  ProfileLoading,
  ProfileError,
  ProfileLoadingSkeleton,
} from "~/features/profile/components";

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { profileData, isLoading, error, refetchProfileData } = useProfile();

  // Redirigir a sign-in si no está autenticado
  if (!isAuthenticated) {
    navigate("/auth/sign-in", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/sign-in", { replace: true });
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View and manage your account information
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <ProfileLoadingSkeleton />
        ) : error ? (
          <ProfileError error={error} />
        ) : profileData ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <ProfileHeader profileData={profileData} isLoading={isLoading} />

            {/* Contact Information */}
            <ProfileContactInfo profileData={profileData} />

            {/* Actions */}
            <ProfileActions
              profileData={profileData}
              onRefresh={refetchProfileData}
              onLogout={handleLogout}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <ProfileError error="No profile data available" />
        )}
      </div>
    </div>
  );
}