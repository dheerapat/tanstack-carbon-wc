import { createFileRoute, useRouter } from "@tanstack/react-router";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/link/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { Add, Launch, Return } from "@carbon/icons-react";
import { Table } from "#/components/Table";
import {
  createPatientTableRows,
  filterPatients,
  hasPatientSearch,
  normalizePatientSearch,
} from "#/features/patientSearch";
import "#/routes/style/patient.scss";

export const Route = createFileRoute("/patient/result")({
  validateSearch: normalizePatientSearch,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const results = filterPatients(search);
  const hasSearch = hasPatientSearch(search);
  const router = useRouter();
  const navigate = Route.useNavigate();

  const patientTable = {
    headers: [
      "HN",
      "Name",
      "Surname",
      "Sex",
      "Phone number",
      "ID/Passport",
      "DOB",
    ],
    rows: createPatientTableRows([...results]),
  };

  return (
    <>
      {!hasSearch ? (
        <cds-tile>
          <br></br>
          <cds-heading>No search criteria provided</cds-heading>
          <br></br>
          <cds-link href="/patient">
            Back <Return slot="icon" />
          </cds-link>
        </cds-tile>
      ) : results.length > 0 ? (
        <>
          <Table
            table={patientTable}
            title="Patient Lists"
            rowAction={(row) => {
              const href = router.buildLocation({
                to: "/patient/detail",
                search: { hn: String(row[0]) },
              }).href;
              return (
                <cds-link href={href}>
                  View <Launch slot="icon" />
                </cds-link>
              );
            }}
          />
        </>
      ) : (
        <cds-tile>
          <br></br>
          <cds-heading>No patient found</cds-heading>
          <br></br>
          <cds-button onClick={() => navigate({ to: "/patient/register" })}>
            Register
            <Add slot="icon" />
          </cds-button>
        </cds-tile>
      )}
    </>
  );
}
