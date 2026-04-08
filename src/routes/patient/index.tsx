import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/form/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/radio-button/index.js";
import "@carbon/web-components/es/components/grid/index.js";
import "@carbon/web-components/es/components/layer/index.js";
import { normalizePatientSearch } from "#/features/patientSearch";
import "#/routes/style/patient.scss";

type InputEl = HTMLElement & { value?: string };

export const Route = createFileRoute("/patient/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const hnRef = useRef<InputEl>(null);
  const nameRef = useRef<InputEl>(null);
  const surnameRef = useRef<InputEl>(null);
  const phoneRef = useRef<InputEl>(null);
  const idPassportRef = useRef<InputEl>(null);
  const dobRef = useRef<InputEl>(null);
  const sexGroupRef = useRef<InputEl>(null);

  function getVal(ref: React.RefObject<InputEl | null>) {
    return String(ref.current?.value ?? "").trim();
  }

  function handleSearch() {
    const search = normalizePatientSearch({
      hn: getVal(hnRef),
      name: getVal(nameRef),
      surname: getVal(surnameRef),
      sex: getVal(sexGroupRef),
      phoneNumber: getVal(phoneRef),
      idPassport: getVal(idPassportRef),
      dob: getVal(dobRef),
    });

    navigate({
      to: "/patient/result",
      search,
    });
  }

  function handleReset() {
    const refs = [
      hnRef,
      nameRef,
      surnameRef,
      phoneRef,
      idPassportRef,
      dobRef,
      sexGroupRef,
    ];

    refs.forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  }

  return (
    <>
      <cds-heading>Patient Search</cds-heading>
      <br></br>
      <div className="patient-form">
        <cds-form
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSearch();
          }}
        >
          <cds-layer level="1">
          <cds-grid>
            <cds-column lg="8">
              <cds-stack gap="3">
                <cds-text-input
                  ref={hnRef}
                  label="HN"
                  name="hn"
                  placeholder="HN"
                ></cds-text-input>
                <cds-text-input
                  ref={nameRef}
                  label="Name"
                  name="name"
                  placeholder="Name"
                ></cds-text-input>
                <cds-text-input
                  ref={surnameRef}
                  label="Surname"
                  name="surname"
                  placeholder="Surname"
                ></cds-text-input>
                <cds-radio-button-group
                  ref={sexGroupRef}
                  legend-text="Sex"
                  name="sex"
                  orientation="horizontal"
                  label-position="right"
                >
                  <cds-radio-button
                    label-text="Male"
                    value="male"
                  ></cds-radio-button>
                  <cds-radio-button
                    label-text="Female"
                    value="female"
                  ></cds-radio-button>
                </cds-radio-button-group>
              </cds-stack>
            </cds-column>

            <cds-column lg="8">
              <cds-stack gap="3">
                <cds-text-input
                  ref={phoneRef}
                  className="patient-form__field"
                  label="Phone number"
                  name="phoneNumber"
                  placeholder="Phone number"
                ></cds-text-input>
                <cds-text-input
                  ref={idPassportRef}
                  className="patient-form__field"
                  label="ID/Passport"
                  name="idPassport"
                  placeholder="ID/Passport"
                ></cds-text-input>
                <cds-date-picker allow-input="true" date-format="d/m/Y">
                  <cds-date-picker-input
                    ref={dobRef}
                    kind="single"
                    label-text="DOB"
                    name="dob"
                    placeholder="DD/MM/YYYY"
                    size="md"
                  ></cds-date-picker-input>
                </cds-date-picker>
              </cds-stack>
            </cds-column>
          </cds-grid>
          </cds-layer>
          <cds-button-set>
            <cds-button kind="secondary" onClick={handleReset}>
              Clear
            </cds-button>
            <cds-button kind="primary" onClick={handleSearch}>
              Search
            </cds-button>
          </cds-button-set>
        </cds-form>
      </div>
    </>
  );
}
