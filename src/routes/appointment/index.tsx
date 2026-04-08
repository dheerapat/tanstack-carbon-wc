import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { Table } from "#/components/Table";
import {
  getAllEpisodes,
  APPOINTMENT_HEADERS,
  createAppointmentTableRows,
  filterEpisodes,
} from "#/features/patientEpisode";

export const Route = createFileRoute("/appointment/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [query, setQuery] = useState("");

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const appointmentTable = {
    headers: APPOINTMENT_HEADERS,
    rows: createAppointmentTableRows(filterEpisodes(getAllEpisodes(), query)),
  };

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
      <Table
        table={appointmentTable}
        title="Appointment"
        toolbar={{
          searchPlaceholder: "Search appointments",
          onSearch: setQuery,
        }}
      />
    </>
  );
}
