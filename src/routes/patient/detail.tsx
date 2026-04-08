import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import "@carbon/web-components/es/components/button/index.js";
import { filterPatients, formatSex, formatAge } from "#/features/patientSearch";
import {
  createEpisodeTableRows,
  getEpisodesByHn,
  getEpisodeRowActions,
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

  const episodes = getEpisodesByHn(patient.hn);
  const statusMap = new Map(episodes.map((ep) => [ep.id, ep.status]));

  return (
    <>
      <cds-heading>Patient Info</cds-heading>
      <br></br>
      <EntityCard icon={<User />} fields={fields} />
      <br></br>
      <Table
        table={{
          headers: ["Episode ID", "Date", "Care Provider", "Status"],
          rows: createEpisodeTableRows(episodes),
        }}
        title="All Episodes"
        rowAction={(row) => {
          const episodeId = String(row[0]);
          const status = statusMap.get(episodeId);
          if (!status) return null;
          const actions = getEpisodeRowActions(status);
          if (!actions) return null;
          return (
            <span
              style={{
                display: "inline-flex",
                gap: "var(--cds-spacing-03)",
              }}
            >
              {actions.map(({ label, Icon }) => (
                <cds-button
                  key={label}
                  kind="ghost"
                  tooltip-text={label}
                  tooltip-position="right"
                  tooltip-alignment="center"
                >
                  <Icon slot="icon" />
                </cds-button>
              ))}
            </span>
          );
        }}
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
