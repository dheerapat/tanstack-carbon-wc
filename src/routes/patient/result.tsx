import { createFileRoute, useRouter } from "@tanstack/react-router";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/link/index.js";
import { Table } from "#/components/Table";
import {
  createPatientTableRows,
  filterPatients,
  hasPatientSearch,
  normalizePatientSearch,
} from "#/features/patientSearch";
import "../style/patient.scss";

export const Route = createFileRoute("/patient/result")({
  validateSearch: normalizePatientSearch,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const results = filterPatients(search);
  const hasSearch = hasPatientSearch(search);
  const router = useRouter();

  const patientTable = {
    headers: [
      "HN",
      "Name",
      "Middle name",
      "Surname",
      "Sex",
      "Phone number",
      "ID/Passport",
      "Nationality",
      "DOB",
    ],
    rows: createPatientTableRows([...results]),
  };

  return (
    <>
      {!hasSearch ? (
        <p className="patient-results__empty">No search criteria provided.</p>
      ) : results.length > 0 ? (
        <Table
          table={patientTable}
          rowAction={(row) => {
            const href = router.buildLocation({
              to: "/patient/detail",
              search: { hn: String(row[0]) },
            }).href;
            return <cds-link href={href}>View</cds-link>;
          }}
        />
      ) : (
        <p className="patient-results__empty">No patients found.</p>
      )}
    </>
  );
}
