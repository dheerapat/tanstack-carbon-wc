import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { Table } from "#/components/Table";
import {
  appointments,
  APPOINTMENT_HEADERS,
  createAppointmentTableRows,
} from "#/features/appointment";

const appointmentTable = {
  headers: APPOINTMENT_HEADERS,
  rows: createAppointmentTableRows(appointments),
};

export const Route = createFileRoute("/appointment/")({
  component: RouteComponent,
});

function RouteComponent() {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <>
      <cds-heading>Appointment</cds-heading>
      <br></br>
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
