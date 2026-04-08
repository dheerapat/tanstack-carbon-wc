import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/date-picker/index.js";
import "@carbon/web-components/es/components/form/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/radio-button/index.js";
import "@carbon/web-components/es/components/grid/index.js";
import "@carbon/web-components/es/components/layer/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import "@carbon/web-components/es/components/file-uploader/index.js";
import "@carbon/web-components/es/components/stack/index.js";
import { registerPatient } from "#/features/patientSearch";
import "#/routes/style/patient.scss";

type InputEl = HTMLElement & { value?: string };

export const Route = createFileRoute("/patient/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [files, setFiles] = useState<File[]>([]);

  const nameRef = useRef<InputEl>(null);
  const surnameRef = useRef<InputEl>(null);
  const phoneRef = useRef<InputEl>(null);
  const idPassportRef = useRef<InputEl>(null);
  const dobRef = useRef<InputEl>(null);
  const sexGroupRef = useRef<InputEl>(null);
  const dropRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const added: File[] = (e as CustomEvent).detail?.addedFiles ?? [];
      setFiles((prev) => {
        const existing = new Set(prev.map((f) => f.name));
        return [...prev, ...added.filter((f) => !existing.has(f.name))];
      });
    };
    el.addEventListener("cds-file-uploader-drop-container-changed", handler);
    return () =>
      el.removeEventListener(
        "cds-file-uploader-drop-container-changed",
        handler,
      );
  }, []);

  function getVal(ref: React.RefObject<InputEl | null>) {
    return String(ref.current?.value ?? "").trim();
  }

  function handleRegister() {
    const patient = registerPatient({
      name: getVal(nameRef),
      surname: getVal(surnameRef),
      sex: getVal(sexGroupRef),
      phoneNumber: getVal(phoneRef),
      idPassport: getVal(idPassportRef),
      dob: getVal(dobRef),
    });

    navigate({ to: "/patient/detail", search: { hn: patient.hn } });
  }

  function handleCancel() {
    navigate({ to: "/patient" });
  }

  return (
    <>
      <cds-heading>Register Patient</cds-heading>
      <br></br>
      <div className="patient-form">
        <cds-form
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleRegister();
          }}
        >
          <cds-layer level="1">
          <cds-grid>
            <cds-column lg="8">
              <cds-stack gap="5">
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
                <cds-file-uploader
                  label-title="Documents"
                  label-description="Supported file types are .jpg and .png."
                  multiple=""
                >
                  <cds-file-uploader-drop-container
                    ref={dropRef}
                    accept="image/jpeg image/png"
                  >
                    Drag and drop files here or click to upload
                  </cds-file-uploader-drop-container>
                  {files.map((file) => (
                    <cds-file-uploader-item
                      key={file.name}
                      state="edit"
                      ref={(el: HTMLElement | null) => {
                        if (!el) return;
                        el.addEventListener(
                          "cds-file-uploader-item-beingdeleted",
                          () =>
                            setFiles((prev) => prev.filter((f) => f !== file)),
                          { once: true },
                        );
                      }}
                    >
                      {file.name}
                    </cds-file-uploader-item>
                  ))}
                </cds-file-uploader>
              </cds-stack>
            </cds-column>

            <cds-column lg="8">
              <cds-stack gap="5">
                <cds-text-input
                  ref={phoneRef}
                  label="Phone number"
                  name="phoneNumber"
                  placeholder="Phone number"
                ></cds-text-input>
                <cds-text-input
                  ref={idPassportRef}
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
            <cds-button kind="secondary" onClick={handleCancel}>
              Cancel
            </cds-button>
            <cds-button kind="primary" onClick={handleRegister}>
              Register
            </cds-button>
          </cds-button-set>
        </cds-form>
      </div>
    </>
  );
}
