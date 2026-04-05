import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/grid/index.js";
import { filterPatients, formatSex } from "#/features/patientSearch";
import "../style/patient.scss";

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
        <p className="patient-results__empty">Patient not found.</p>
      </cds-tile>
    );
  }

  const fullName = [patient.name, patient.surname]
    .filter(Boolean)
    .join(" ");

  const fields: { label: string; value: string }[] = [
    { label: "HN", value: patient.hn },
    { label: "Full name", value: fullName },
    { label: "Sex", value: formatSex(patient.sex, true) },
    { label: "Date of birth", value: patient.dob },
  ];

  return (
    <cds-tile>
      <div className="patient-detail__grid">
        {fields.map(({ label, value }) => (
          <div key={label} className="patient-detail__field">
            <p className="patient-detail__label">{label}</p>
            <p className="patient-detail__value">{value}</p>
          </div>
        ))}
      </div>
    </cds-tile>
  );
}
