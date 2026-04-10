import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { getEncounterById } from "#/features/encounter";
import "#/routes/style/patient.scss";

export const Route = createFileRoute("/encounter/$encounterId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { encounterId } = Route.useParams();
  const encounter = getEncounterById(encounterId);

  if (!encounter) {
    return (
      <cds-tile>
        <br></br>
        <cds-heading>Encounter not found</cds-heading>
      </cds-tile>
    );
  }

  return (
    <>
      <cds-heading>Encounter Detail</cds-heading>
      <br></br>
      <cds-tile>
        <cds-stack gap="5">
          <cds-stack gap="2">
            <p className="entity-card__label">Encounter ID</p>
            <p className="entity-card__value">{encounter.id}</p>
          </cds-stack>
          <cds-stack gap="2">
            <p className="entity-card__label">Episode ID</p>
            <p className="entity-card__value">{encounter.episodeId}</p>
          </cds-stack>
          <cds-stack gap="2">
            <p className="entity-card__label">Created By</p>
            <p className="entity-card__value">{encounter.createdBy}</p>
          </cds-stack>
          <cds-stack gap="2">
            <p className="entity-card__label">Created Date/Time</p>
            <p className="entity-card__value">{encounter.createdAt}</p>
          </cds-stack>
        </cds-stack>
      </cds-tile>
    </>
  );
}
