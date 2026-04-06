import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/grid/index.js";
import "@carbon/web-components/es/components/stack/index.js";
import { filterPatients, formatSex } from "#/features/patientSearch";
import "#/routes/style/patient.scss";
import { User } from "@carbon/pictograms-react";

export const Route = createFileRoute("/patient/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    hn: String(search.hn ?? "").trim() || undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { hn } = Route.useSearch();
  const results = filterPatients({ hn });
  const patient = results[0];

  if (!patient) {
    return (
      <cds-tile>
        <cds-grid condensed>
          <p className="patient-results__empty">Patient not found.</p>
        </cds-grid>
      </cds-tile>
    );
  }

  const fullName = [patient.name, patient.surname].filter(Boolean).join(" ");

  const fields: { label: string; value: string }[] = [
    { label: "HN", value: patient.hn },
    { label: "Full Name", value: fullName },
    { label: "Sex", value: formatSex(patient.sex, true) },
    { label: "Date of Birth", value: patient.dob },
  ];

  return (
    <cds-tile>
      <cds-grid narrow="">
        <cds-column lg="4">
          <User />
        </cds-column>
        {fields.map(({ label, value }) => (
          <cds-column lg="3">
            <cds-stack>
              <p className="patient-detail__label">{label}</p>
              <p className="patient-detail__value">{value}</p>
            </cds-stack>
          </cds-column>
        ))}
      </cds-grid>
    </cds-tile>
  );
}
