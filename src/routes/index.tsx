import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "@carbon/web-components/es/components/grid/index.js";
import "@carbon/web-components/es/components/tile/index.js";
import { Calendar } from "@carbon/pictograms-react";
import { UserMask } from "@carbon/pictograms-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const navigate = useNavigate();

  return (
    <>
      <cds-grid full-width>
        <cds-column lg="4">
          <cds-clickable-tile onClick={() => navigate({ to: "/appointment" })}>
            <cds-stack gap="10">
              <p>Appointment</p>
              <Calendar />
            </cds-stack>
          </cds-clickable-tile>
        </cds-column>
        <cds-column lg="4">
          <cds-clickable-tile onClick={() => navigate({ to: "/patient" })}>
            <cds-stack gap="10">
              <p>Patient</p>
              <UserMask />
            </cds-stack>
          </cds-clickable-tile>
        </cds-column>
      </cds-grid>
    </>
  );
}
