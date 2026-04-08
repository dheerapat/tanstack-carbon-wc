import { createFileRoute, useRouter } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import "@carbon/web-components/es/components/link/index.js";
import { Launch } from "@carbon/icons-react";
import { User } from "@carbon/pictograms-react";
import {
  filterPatients,
  formatSex,
  formatAge,
} from "#/features/patientSearch";
import { getEpisodeById } from "#/features/patientEpisode";
import {
  getEncountersByEpisodeId,
  createEncounterTableRows,
} from "#/features/encounter";
import { Table } from "#/components/Table";
import { EntityCard } from "#/components/EntityCard";
import "#/routes/style/patient.scss";

export const Route = createFileRoute("/episode/$episodeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { episodeId } = Route.useParams();
  const router = useRouter();
  const result = getEpisodeById(episodeId);

  if (!result) {
    return (
      <cds-tile>
        <br></br>
        <cds-heading>Episode not found</cds-heading>
      </cds-tile>
    );
  }

  const { episode, hn } = result;
  const patients = filterPatients({ hn });
  const patient = patients[0];

  const fullName = patient
    ? [patient.name, patient.surname].filter(Boolean).join(" ")
    : "-";

  const fields: { label: string; value: string }[] = [
    { label: "HN", value: hn },
    { label: "Full Name", value: fullName },
    ...(patient
      ? [
          { label: "Date of Birth", value: patient.dob },
          { label: "Age", value: formatAge(patient.dob) },
          { label: "Sex", value: formatSex(patient.sex, true) },
        ]
      : []),
    { label: "Episode ID", value: episode.id },
  ];

  const encounters = getEncountersByEpisodeId(episodeId);
  const encounterRows = createEncounterTableRows(encounters);

  return (
    <>
      <cds-heading>Episode Info</cds-heading>
      <br></br>
      <EntityCard icon={<User />} fields={fields} />
      <br></br>
      <Table
        table={{
          headers: ["Encounter ID", "Created By", "Created Date/Time"],
          rows: encounterRows,
        }}
        title="Encounters"
        rowAction={(row) => {
          const encounterId = String(row[0]);
          const href = router.buildLocation({
            to: "/encounter/$encounterId",
            params: { encounterId },
          }).href;
          return (
            <cds-link href={href}>
              View <Launch slot="icon" />
            </cds-link>
          );
        }}
      />
    </>
  );
}
