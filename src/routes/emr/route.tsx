import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/emr")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
