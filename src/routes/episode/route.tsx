import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/episode")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
