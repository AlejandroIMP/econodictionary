import { useNavigate, useSearchParams } from "react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "~/features/auth/hooks";
import { use, useEffect, useState } from "react";


export default function SignOut() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, navigate, loading]);

  const signOut = async () => {
    try {
      await logout();
      setLoading(false);
      navigate("/");
      }
     catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
      signOut();
  }, []);


  return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg">
        <div className="text-center">
          <Loader2 className="mx-auto mb-6 h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Sign Out</h2>
          <p className="text-center text-zinc-700 dark:text-zinc-300">Please wait while we sign you out.</p>
        </div>
      </div>
  );
}