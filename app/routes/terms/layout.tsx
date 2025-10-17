import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Economic dictionary" },
    { name: "description", content: "Welcome to the Economic dictionary!" },
  ];
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}