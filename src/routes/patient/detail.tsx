import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import "@carbon/web-components/es/components/button/index.js";
import { filterPatients, formatSex, formatAge } from "#/features/patientSearch";
import {
  createEpisodeTableRows,
  getEpisodesByHn,
} from "#/features/patientEpisode";
import { Table } from "#/components/Table";
import { EntityCard } from "#/components/EntityCard";
import "#/routes/style/patient.scss";
import { User } from "@carbon/pictograms-react";
import { Add } from "@carbon/icons-react";

export const Route = createFileRoute("/patient/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    hn: String(search.hn ?? "").trim() || undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { hn } = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = filterPatients({ hn });
  const patient = results[0];

  if (!patient) {
    return (
      <cds-tile>
        <br></br>
        <cds-heading>No patient found</cds-heading>
        <br></br>
        <cds-button onClick={() => navigate({ to: "/patient/register" })}>
          Register
          <Add slot="icon" />
        </cds-button>
      </cds-tile>
    );
  }

  const fullName = [patient.name, patient.surname].filter(Boolean).join(" ");

  const fields: { label: string; value: string }[] = [
    { label: "HN", value: patient.hn },
    { label: "Full Name", value: fullName },
    { label: "Date of Birth", value: patient.dob },
    { label: "Age", value: formatAge(patient.dob) },
    { label: "Sex", value: formatSex(patient.sex, true) },
  ];

  return (
    <>
      <cds-heading>Patient Info</cds-heading>
      <br></br>
      <EntityCard icon={<User />} fields={fields} />
      <br></br>
      <Table
        table={{
          headers: ["Episode ID", "Date", "Care Provider", "Status"],
          rows: createEpisodeTableRows(getEpisodesByHn(patient.hn)),
        }}
        title="All Episodes"
        toolbar={{
          actions: (
            <cds-button
              onClick={() =>
                navigate({ to: "/patient/episode/new", search: { hn } })
              }
            >
              New Episode
              <Add slot="icon" />
            </cds-button>
          ),
        }}
      />
    </>
  );
}
