import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/encounter")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
