import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/appointment")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
