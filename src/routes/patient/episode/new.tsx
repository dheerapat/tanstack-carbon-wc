import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/time-picker/index.js";
import "@carbon/web-components/es/components/select/index.js";
import "@carbon/web-components/es/components/textarea/index.js";
import "@carbon/web-components/es/components/form/index.js";
import "@carbon/web-components/es/components/grid/index.js";
import { addEpisode, CARE_PROVIDERS } from "#/features/patientEpisode";
import { filterPatients, formatSex, formatAge } from "#/features/patientSearch";
import { EntityCard } from "#/components/EntityCard";
import { User } from "@carbon/pictograms-react";
import "#/routes/style/patient.scss";

type InputEl = HTMLElement & { value?: string };

const TIME_PATTERN = /^(0[0-9]|1[0-2]):[0-5][0-9]$/;

function isValidTime(val: string): boolean {
  return TIME_PATTERN.test(val);
}

export const Route = createFileRoute("/patient/episode/new")({
  validateSearch: (search: Record<string, unknown>) => ({
    hn: String(search.hn ?? "").trim() || undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { hn } = Route.useSearch();
  const navigate = Route.useNavigate();

  const patient = filterPatients({ hn })[0];

  const dateRef = useRef<InputEl>(null);
  const timeRef = useRef<InputEl>(null);
  const ampmRef = useRef<InputEl>(null);
  const careProviderRef = useRef<InputEl>(null);
  const noteRef = useRef<InputEl>(null);

  const [timeInvalid, setTimeInvalid] = useState(false);

  function getVal(ref: React.RefObject<InputEl | null>) {
    return String(ref.current?.value ?? "").trim();
  }

  function handleSubmit() {
    const rawTime = getVal(timeRef);

    if (rawTime && !isValidTime(rawTime)) {
      setTimeInvalid(true);
      return;
    }
    setTimeInvalid(false);

    const date = getVal(dateRef);
    const ampm = getVal(ampmRef);
    const time = rawTime ? `${rawTime} ${ampm}` : "";
    const careProvider = getVal(careProviderRef);
    const note = getVal(noteRef);

    if (!hn) return;

    addEpisode(hn, { date, time, careProvider, note });
    navigate({ to: "/patient/detail", search: { hn } });
  }

  function handleCancel() {
    navigate({ to: "/patient/detail", search: { hn } });
  }

  const entityCardFields = patient
    ? [
        { label: "HN", value: patient.hn },
        {
          label: "Full Name",
          value: [patient.name, patient.surname].filter(Boolean).join(" "),
        },
        { label: "Date of Birth", value: patient.dob },
        { label: "Age", value: formatAge(patient.dob) },
        { label: "Sex", value: formatSex(patient.sex, true) },
      ]
    : [];

  return (
    <>
      <cds-heading>New Episode</cds-heading>
      <br />
      {patient && <EntityCard icon={<User />} fields={entityCardFields} />}
      <br />
      <div className="patient-form">
        <cds-form
          onKeyDown={(e: React.KeyboardEvent) => {
            if (
              e.key === "Enter" &&
              !(e.target as HTMLElement).closest("cds-textarea")
            )
              handleSubmit();
          }}
        >
          <cds-grid>
            <cds-column lg="8">
              <cds-stack gap="5">
                <cds-select
                  ref={careProviderRef}
                  label-text="Care Provider"
                  name="careProvider"
                >
                  <cds-select-item value="">
                    Select a care provider
                  </cds-select-item>
                  {CARE_PROVIDERS.map((provider) => (
                    <cds-select-item key={provider} value={provider}>
                      {provider}
                    </cds-select-item>
                  ))}
                </cds-select>
                <cds-date-picker allow-input="true" date-format="d/m/Y">
                  <cds-date-picker-input
                    ref={dateRef}
                    kind="single"
                    label-text="Episode Date"
                    name="date"
                    placeholder="DD/MM/YYYY"
                    size="md"
                  ></cds-date-picker-input>
                </cds-date-picker>

                <cds-time-picker
                  ref={timeRef}
                  label-text="Episode Time"
                  placeholder="HH:MM"
                  size="lg"
                  max-length="5"
                  invalid={timeInvalid || undefined}
                  invalid-text="Enter a valid time (00:00 – 12:59)"
                  onInput={() => setTimeInvalid(false)}
                >
                  <cds-time-picker-select
                    ref={ampmRef}
                    default-value="AM"
                    aria-label="Select AM/PM"
                  >
                    <cds-select-item value="AM">AM</cds-select-item>
                    <cds-select-item value="PM">PM</cds-select-item>
                  </cds-time-picker-select>
                </cds-time-picker>
              </cds-stack>
            </cds-column>

            <cds-column lg="8">
              <cds-form-item>
                <cds-textarea
                  ref={noteRef}
                  label="Note"
                  name="note"
                  helper-text="Additional notes for this episode"
                  placeholder=""
                  rows="6"
                  enable-counter=""
                  max-count="500"
                ></cds-textarea>
              </cds-form-item>
            </cds-column>
          </cds-grid>

          <cds-button-set>
            <cds-button kind="secondary" onClick={handleCancel}>
              Cancel
            </cds-button>
            <cds-button kind="primary" onClick={handleSubmit}>
              Save Episode
            </cds-button>
          </cds-button-set>
        </cds-form>
      </div>
    </>
  );
}
