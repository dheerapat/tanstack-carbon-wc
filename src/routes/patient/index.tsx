import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/button/index.d.ts";
import "@carbon/web-components/es/components/date-picker/index.d.ts";
import "@carbon/web-components/es/components/form/index.d.ts";
import "@carbon/web-components/es/components/text-input/index.d.ts";
import "@carbon/web-components/es/components/radio-button/index.d.ts";
import "@carbon/web-components/es/components/grid/index.d.ts";
import { normalizePatientSearch } from "#/features/patientSearch";
import "../style/patient.scss";

export const Route = createFileRoute("/patient/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  function getInputValue(id: string) {
    const element = document.getElementById(id) as
      | (HTMLElement & { value?: string })
      | null;

    return String(element?.value ?? "").trim();
  }

  function getSelectedSex() {
    const maleRadio = document.getElementById("sex-male") as
      | (HTMLElement & { checked?: boolean })
      | null;
    const femaleRadio = document.getElementById("sex-female") as
      | (HTMLElement & { checked?: boolean })
      | null;

    if (maleRadio?.checked) {
      return "male";
    }

    if (femaleRadio?.checked) {
      return "female";
    }

    return "";
  }

  function handleSearch() {
    const search = normalizePatientSearch({
      hn: getInputValue("patient-hn"),
      name: getInputValue("patient-name"),
      middleName: getInputValue("patient-middle-name"),
      surname: getInputValue("patient-surname"),
      sex: getSelectedSex(),
      phoneNumber: getInputValue("patient-phone"),
      idPassport: getInputValue("patient-id-passport"),
      nationality: getInputValue("patient-nationality"),
      dob: getInputValue("patient-dob"),
    });

    navigate({
      to: "/patient/result",
      search,
    });
  }

  function handleReset() {
    const inputIds = [
      "patient-hn",
      "patient-name",
      "patient-middle-name",
      "patient-surname",
      "patient-phone",
      "patient-id-passport",
      "patient-nationality",
      "patient-dob",
    ];

    inputIds.forEach((id) => {
      const element = document.getElementById(id) as
        | (HTMLElement & { value?: string })
        | null;

      if (element) {
        element.value = "";
      }
    });

    const radioIds = ["sex-male", "sex-female"];

    radioIds.forEach((id) => {
      const element = document.getElementById(id) as
        | (HTMLElement & { checked?: boolean })
        | null;

      if (element) {
        element.checked = false;
      }
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
              id="patient-hn"
              label="HN"
              name="hn"
              placeholder="HN"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              id="patient-name"
              label="Name"
              name="name"
              placeholder="Name"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              id="patient-surname"
              label="Surname"
              name="surname"
              placeholder="Surname"
            ></cds-text-input>
            <br></br>
            <cds-radio-button-group
              legend-text="Sex"
              name="sex"
              orientation="horizontal"
            >
              <cds-radio-button
                id="sex-male"
                label-text="Male"
                value="male"
              ></cds-radio-button>
              <cds-radio-button
                id="sex-female"
                label-text="Female"
                value="female"
              ></cds-radio-button>
            </cds-radio-button-group>
          </cds-column>

          <cds-column lg="8">
            <cds-text-input
              className="patient-form__field"
              id="patient-phone"
              label="Phone number"
              name="phoneNumber"
              placeholder="Phone number"
            ></cds-text-input>
            <br></br>
            <cds-text-input
              className="patient-form__field"
              id="patient-id-passport"
              label="ID/Passport"
              name="idPassport"
              placeholder="ID/Passport"
            ></cds-text-input>
            <br></br>
            <cds-date-picker allow-input="true" date-format="d/m/Y">
              <cds-date-picker-input
                id="patient-dob"
                kind="single"
                label-text="DOB"
                name="dob"
                placeholder="dd/mm/yyyy"
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
