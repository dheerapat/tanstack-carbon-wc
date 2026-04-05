import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import "@carbon/web-components/es/components/button/index.d.ts";
import "@carbon/web-components/es/components/date-picker/index.d.ts";
import "@carbon/web-components/es/components/form/index.d.ts";
import "@carbon/web-components/es/components/text-input/index.d.ts";
import "@carbon/web-components/es/components/radio-button/index.d.ts";
import "@carbon/web-components/es/components/grid/index.d.ts";
import { normalizePatientSearch } from "#/features/patientSearch";
import "../style/patient.scss";

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
      <cds-form
        className="patient-form"
        id="patient-search-form"
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") handleSearch();
        }}
      >
        <cds-grid>
          <cds-column lg="8">
            <cds-text-input
              ref={hnRef}
              label="HN"
              name="hn"
              placeholder="HN"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              ref={nameRef}
              label="Name"
              name="name"
              placeholder="Name"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              ref={surnameRef}
              label="Surname"
              name="surname"
              placeholder="Surname"
            ></cds-text-input>
            <br></br>
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
          </cds-column>

          <cds-column lg="8">
            <cds-text-input
              ref={phoneRef}
              className="patient-form__field"
              label="Phone number"
              name="phoneNumber"
              placeholder="Phone number"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              ref={idPassportRef}
              className="patient-form__field"
              label="ID/Passport"
              name="idPassport"
              placeholder="ID/Passport"
            ></cds-text-input>
            <br></br>
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
          </cds-column>
        </cds-grid>

        <cds-button-set>
          <cds-button kind="secondary" onClick={handleReset}>
            Clear
          </cds-button>
          <cds-button kind="primary" onClick={handleSearch}>
            Search
          </cds-button>
        </cds-button-set>
      </cds-form>
    </>
  );
}
