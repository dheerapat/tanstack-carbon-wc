import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/form/index.js";
import "@carbon/web-components/es/components/radio-button/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/radio-button/index.d.ts";
import "./style/patient.scss";

export const Route = createFileRoute("/patient")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <cds-form className="patient-form" id="patient-search-form">
        <div className="patient-form__grid">
          <div className="patient-form__column">
            <cds-text-input
              className="patient-form__field"
              id="patient-hn"
              label="HN"
              name="hn"
              placeholder="HN"
            ></cds-text-input>

            <cds-text-input
              className="patient-form__field"
              id="patient-name"
              label="Name"
              name="name"
              placeholder="Name"
            ></cds-text-input>

            <cds-text-input
              className="patient-form__field"
              id="patient-middle-name"
              label="Middle name"
              name="middleName"
              placeholder="Middle name"
            ></cds-text-input>

            <cds-text-input
              className="patient-form__field"
              id="patient-surname"
              label="Surname"
              name="surname"
              placeholder="Surname"
            ></cds-text-input>

            <cds-radio-button-group
              className="patient-form__sex"
              legend-text="Sex"
              name="sex"
              orientation="horizontal"
              value="male"
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
          </div>

          <div className="patient-form__column">
            <cds-text-input
              className="patient-form__field"
              id="patient-phone"
              label="Phone number"
              name="phoneNumber"
              placeholder="Phone number"
            ></cds-text-input>

            <cds-text-input
              className="patient-form__field"
              id="patient-id-passport"
              label="ID/Passport"
              name="idPassport"
              placeholder="ID/Passport"
            ></cds-text-input>

            <cds-text-input
              className="patient-form__field"
              id="patient-nationality"
              label="Nationality"
              name="nationality"
              placeholder="Nationality"
            ></cds-text-input>

            <div className="patient-form__field patient-form__date-field">
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
            </div>
          </div>
        </div>

        <div className="patient-form__actions">
          <cds-button kind="primary" type="submit">
            Search
          </cds-button>
          <cds-button kind="secondary" type="reset">
            Clear
          </cds-button>
        </div>
      </cds-form>
    </section>
  );
}
