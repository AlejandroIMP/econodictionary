import { useNavigate, useSearchParams } from "react-router";
import { Loader2 } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { useEffect, useState } from "react";


export default function EmailVerification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [params] = useSearchParams();
  const token = params.get("token") || "";

  const API_URL = import.meta.env.VITE_API_URL;

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/confirm-email?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Email verified successfully
        setLoading(false);
        setError(false);
        navigate("/auth/sign-in", { replace: true });
      } else {
        // Handle error response
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);


  if (!token) {
    return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Invalid or Missing Token</h2>
        <p className="text-center text-zinc-700 dark:text-zinc-300">The email verification token is missing or invalid. Please request a new email verification.</p>
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
          >
            Go to home
          </Button>
        </div>
      </div>
    );
  }



  return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg">
        <div className="text-center">
          <Loader2 className="mx-auto mb-6 h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Verifying Your Email...</h2>
          <p className="text-center text-zinc-700 dark:text-zinc-300">Please wait while we verify your email address.</p>
        </div>
      </div>
  );
}