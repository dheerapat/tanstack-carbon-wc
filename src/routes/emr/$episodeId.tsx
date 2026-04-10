import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@carbon/web-components/es/components/tree-view/index.js";
import "@carbon/web-components/es/components/tile/index.js";
import "@carbon/web-components/es/components/heading/index.js";
import { User } from "@carbon/pictograms-react";
import { getEpisodeById } from "#/features/patientEpisode";
import { filterPatients, formatSex, formatAge } from "#/features/patientSearch";
import {
  getEmrDataByEpisodeId,
  EMR_SECTIONS,
  createOrderTableRows,
  createObservationTableRows,
  createClinicalNoteTableRows,
  createTreatmentPlanTableRows,
  normalizeEmrSearch,
  type EmrSection,
} from "#/features/emr";
import { EntityCard } from "#/components/EntityCard";
import { Table } from "#/components/Table";
import "#/routes/style/emr.scss";

export const Route = createFileRoute("/emr/$episodeId")({
  validateSearch: normalizeEmrSearch,
  component: RouteComponent,
});

function RouteComponent() {
  const { episodeId } = Route.useParams();
  const { section } = Route.useSearch();
  const router = useRouter();
  const treeViewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!treeViewRef.current) return;
    treeViewRef.current.querySelectorAll("cds-tree-node").forEach((node) => {
      const href = (node as HTMLElement & { href?: string }).href;
      if (href) node.setAttribute("href", href);
    });
  }, [episodeId]);

  const result = getEpisodeById(episodeId);

  if (!result) {
    return (
      <cds-tile>
        <br></br>
        <cds-heading>Episode not found</cds-heading>
      </cds-tile>
    );
  }

  const { episode, hn } = result;
  const patients = filterPatients({ hn });
  const patient = patients[0];
  const fullName = patient
    ? [patient.name, patient.surname].filter(Boolean).join(" ")
    : "-";

  const fields: { label: string; value: string }[] = [
    { label: "HN", value: hn },
    { label: "Full Name", value: fullName },
    ...(patient
      ? [
          { label: "Date of Birth", value: patient.dob },
          { label: "Age", value: formatAge(patient.dob) },
          { label: "Sex", value: formatSex(patient.sex, true) },
        ]
      : []),
    { label: "Episode ID", value: episode.id },
  ];

  const emrData = getEmrDataByEpisodeId(episodeId);

  function sectionHref(s: EmrSection) {
    return router.buildLocation({
      to: "/emr/$episodeId",
      params: { episodeId },
      search: { section: s },
    }).href;
  }

  function renderContent() {
    if (!section || !emrData) {
      return (
        <div className="emr-layout__placeholder">
          <p>Select an item from the menu to view details</p>
        </div>
      );
    }

    const config = EMR_SECTIONS.find((s) => s.section === section)!;

    switch (section) {
      case "orders":
        return (
          <Table
            table={{
              headers: config.headers,
              rows: createOrderTableRows(emrData.orders),
            }}
            title="Orders"
          />
        );
      case "observations":
        return (
          <Table
            table={{
              headers: config.headers,
              rows: createObservationTableRows(emrData.observations),
            }}
            title="Observations"
          />
        );
      case "clinicalNotes":
        return (
          <Table
            table={{
              headers: config.headers,
              rows: createClinicalNoteTableRows(emrData.clinicalNotes),
            }}
            title="Clinical Notes"
          />
        );
      case "treatmentPlans":
        return (
          <Table
            table={{
              headers: config.headers,
              rows: createTreatmentPlanTableRows(emrData.treatmentPlans),
            }}
            title="Treatment Plans"
          />
        );
    }
  }

  return (
    <>
      <cds-heading>Electronic Medical Record</cds-heading>
      <br></br>
      <EntityCard icon={<User />} fields={fields} />
      <div className="emr-layout">
        <cds-tree-view ref={treeViewRef} label="Menu" links>
          {EMR_SECTIONS.map((s) => (
            <cds-tree-node
              key={s.section}
              label={s.label}
              href={sectionHref(s.section)}
              selected={s.section === section || undefined}
              active={s.section === section || undefined}
            ></cds-tree-node>
          ))}
        </cds-tree-view>
        <div className="emr-layout__content">{renderContent()}</div>
      </div>
    </>
  );
}
