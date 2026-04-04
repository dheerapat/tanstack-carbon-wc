import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/date-picker/index.d.ts";
import { Table } from "#/components/Table";

const appointmentTable = {
  headers: ["HN", "Name", "Phone", "Care Provider", "Episode ID", "Status"],
  rows: [
    [
      "HN-100421",
      "Somchai Srisuk",
      "081-234-5678",
      "Dr. Apinya Wongkul",
      "EP-2024-0088",
      "Active",
    ],
    [
      "HN-100388",
      "Nanthipha Charoenwong",
      "089-456-7890",
      "Dr. Teerawat Boonchu",
      "EP-2024-0091",
      "Scheduled",
    ],
    [
      "HN-100295",
      "Prasert Limthong",
      "062-789-0123",
      "Dr. Apinya Wongkul",
      "EP-2024-0075",
      "Completed",
    ],
    [
      "HN-100512",
      "Kanjana Phetcharoen",
      "092-345-6789",
      "Dr. Siriporn Nakorn",
      "EP-2024-0102",
      "Pending",
    ],
    [
      "HN-100340",
      "Wichai Duangrat",
      "064-901-2345",
      "Dr. Teerawat Boonchu",
      "EP-2024-0083",
      "Cancelled",
    ],
    [
      "HN-100467",
      "Malee Thongsuk",
      "098-567-8901",
      "Dr. Siriporn Nakorn",
      "EP-2024-0096",
      "Scheduled",
    ],
    [
      "HN-100399",
      "Thanakorn Ruangrit",
      "085-012-3456",
      "Dr. Apinya Wongkul",
      "EP-2024-0079",
      "Active",
    ],
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
