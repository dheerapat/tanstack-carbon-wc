import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/date-picker/index.d.ts";
import { Table } from "#/components/Table";

const appointmentTable = {
  headers: ["Name", "Rule", "Status", "Other", "Example"],
  rows: [
    ["Load Balancer 1", "Round robin", "Starting", "Test", 22],
    ["Load Balancer 2", "DNS delegation", "Active", "Test", 22],
    ["Load Balancer 3", "Round robin", "Disabled", "Test", 22],
    ["Load Balancer 4", "Round robin", "Disabled", "Test", 22],
    ["Load Balancer 5", "Round robin", "Disabled", "Test", 22],
    ["Load Balancer 6", "Round robin", "Disabled", "Test", 22],
    ["Load Balancer 7", "Round robin", "Disabled", "Test", 22],
  ],
};

export const Route = createFileRoute("/appointment")({
  component: RouteComponent,
});

function RouteComponent() {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <>
      <cds-date-picker
        allow-input="true"
        close-on-select="true"
        date-format="d/m/Y"
      >
        <cds-date-picker-input
          label-text="Date"
          kind="single"
          placeholder="dd/mm/yyyy"
          size="md"
          value={formattedToday}
        ></cds-date-picker-input>
      </cds-date-picker>
      <br></br>
      <Table table={appointmentTable} />
    </>
  );
}
