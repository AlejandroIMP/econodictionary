import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}