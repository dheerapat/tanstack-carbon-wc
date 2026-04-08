import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { Table } from "#/components/Table";
import {
  getAllEpisodes,
  APPOINTMENT_HEADERS,
  createAppointmentTableRows,
  filterEpisodes,
  getEpisodeRowActions,
} from "#/features/patientEpisode";

export const Route = createFileRoute("/appointment/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const filtered = filterEpisodes(getAllEpisodes(), query);
  const statusMap = new Map(filtered.map((ep) => [ep.id, ep.status]));

  const appointmentTable = {
    headers: APPOINTMENT_HEADERS,
    rows: createAppointmentTableRows(filtered),
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
        rowAction={(row) => {
          const episodeId = String(row[4]);
          const status = statusMap.get(episodeId);
          if (!status) return null;
          const actions = getEpisodeRowActions(status, episodeId);
          if (!actions) return null;
          return (
            <span
              style={{
                display: "inline-flex",
                gap: "var(--cds-spacing-03)",
              }}
            >
              {actions.map(({ label, Icon, navigateTo }) => (
                <cds-button
                  key={label}
                  kind="ghost"
                  tooltip-text={label}
                  tooltip-position="right"
                  tooltip-alignment="center"
                  onClick={() => {
                    if (navigateTo) navigate(navigateTo);
                  }}
                >
                  <Icon slot="icon" />
                </cds-button>
              ))}
            </span>
          );
        }}
      />
    </>
  );
}
