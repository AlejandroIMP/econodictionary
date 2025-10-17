import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Economic dictionary" },
    { name: "description", content: "Learn more about the Economic dictionary!" },
  ];
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}