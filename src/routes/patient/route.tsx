import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patient")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
