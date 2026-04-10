export type EmrSection =
  | "orders"
  | "observations"
  | "clinicalNotes"
  | "treatmentPlans";

export type Order = {
  id: string;
  name: string;
  type: string;
  orderedBy: string;
  date: string;
  status: string;
};

export type Observation = {
  id: string;
  type: string;
  value: string;
  unit: string;
  performedBy: string;
  date: string;
};

export type ClinicalNote = {
  id: string;
  author: string;
  role: string;
  date: string;
  summary: string;
};

export type TreatmentPlan = {
  id: string;
  planName: string;
  createdBy: string;
  date: string;
  status: string;
};

export type EmrData = {
  orders: Order[];
  observations: Observation[];
  clinicalNotes: ClinicalNote[];
  treatmentPlans: TreatmentPlan[];
};

export type EmrSectionConfig = {
  section: EmrSection;
  label: string;
  headers: string[];
};

export const EMR_SECTIONS: EmrSectionConfig[] = [
  {
    section: "orders",
    label: "Orders",
    headers: ["Order ID", "Order Name", "Type", "Ordered By", "Date", "Status"],
  },
  {
    section: "observations",
    label: "Observations",
    headers: ["Observation ID", "Type", "Value", "Unit", "Performed By", "Date"],
  },
  {
    section: "clinicalNotes",
    label: "Clinical Notes",
    headers: ["Note ID", "Author", "Role", "Date", "Summary"],
  },
  {
    section: "treatmentPlans",
    label: "Treatment Plans",
    headers: ["Plan ID", "Plan Name", "Created By", "Date", "Status"],
  },
];

const emrByEpisodeId: Record<string, EmrData> = {
  "EP-2024-001": {
    orders: [
      {
        id: "ORD-00101",
        name: "Complete Blood Count (CBC)",
        type: "Laboratory",
        orderedBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 08:45",
        status: "Completed",
      },
      {
        id: "ORD-00102",
        name: "Chest X-Ray",
        type: "Radiology",
        orderedBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 09:00",
        status: "Completed",
      },
      {
        id: "ORD-00103",
        name: "Urinalysis",
        type: "Laboratory",
        orderedBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 10:30",
        status: "Pending",
      },
      {
        id: "ORD-00104",
        name: "Paracetamol 500mg",
        type: "Medication",
        orderedBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 10:45",
        status: "Completed",
      },
    ],
    observations: [
      {
        id: "OBS-00101",
        type: "Blood Pressure",
        value: "130/85",
        unit: "mmHg",
        performedBy: "Nurse Anong",
        date: "12/01/2024 08:30",
      },
      {
        id: "OBS-00102",
        type: "Heart Rate",
        value: "78",
        unit: "bpm",
        performedBy: "Nurse Anong",
        date: "12/01/2024 08:30",
      },
      {
        id: "OBS-00103",
        type: "Temperature",
        value: "37.2",
        unit: "°C",
        performedBy: "Nurse Anong",
        date: "12/01/2024 08:30",
      },
      {
        id: "OBS-00104",
        type: "Respiratory Rate",
        value: "18",
        unit: "breaths/min",
        performedBy: "Nurse Ploy",
        date: "12/01/2024 14:00",
      },
    ],
    clinicalNotes: [
      {
        id: "CN-00101",
        author: "Nurse Anong",
        role: "Nurse",
        date: "12/01/2024 08:30",
        summary: "Patient admitted with complaint of persistent cough and mild fever for 3 days. Vital signs taken and recorded.",
      },
      {
        id: "CN-00102",
        author: "Dr. Wanchai Sombat",
        role: "Physician",
        date: "12/01/2024 10:15",
        summary: "Initial assessment complete. Ordered CBC and Chest X-Ray to rule out pneumonia. Patient reports no allergies.",
      },
      {
        id: "CN-00103",
        author: "Nurse Ploy",
        role: "Nurse",
        date: "12/01/2024 14:00",
        summary: "CBC results received — WBC slightly elevated. Paracetamol administered for fever. Patient resting comfortably.",
      },
    ],
    treatmentPlans: [
      {
        id: "TP-00101",
        planName: "Respiratory Infection Treatment",
        createdBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 10:30",
        status: "Active",
      },
      {
        id: "TP-00102",
        planName: "Discharge Follow-up",
        createdBy: "Dr. Wanchai Sombat",
        date: "12/01/2024 16:00",
        status: "Planned",
      },
    ],
  },
  "EP-2024-078": {
    orders: [
      {
        id: "ORD-07801",
        name: "Fasting Blood Sugar",
        type: "Laboratory",
        orderedBy: "Dr. Thanakorn Yodrak",
        date: "27/08/2024 08:15",
        status: "Completed",
      },
      {
        id: "ORD-07802",
        name: "HbA1c",
        type: "Laboratory",
        orderedBy: "Dr. Thanakorn Yodrak",
        date: "27/08/2024 08:15",
        status: "Completed",
      },
      {
        id: "ORD-07803",
        name: "Metformin 500mg",
        type: "Medication",
        orderedBy: "Dr. Thanakorn Yodrak",
        date: "27/08/2024 10:00",
        status: "Completed",
      },
    ],
    observations: [
      {
        id: "OBS-07801",
        type: "Blood Pressure",
        value: "140/90",
        unit: "mmHg",
        performedBy: "Nurse Anong",
        date: "27/08/2024 08:00",
      },
      {
        id: "OBS-07802",
        type: "Blood Glucose (Fasting)",
        value: "145",
        unit: "mg/dL",
        performedBy: "Nurse Anong",
        date: "27/08/2024 08:30",
      },
      {
        id: "OBS-07803",
        type: "BMI",
        value: "27.3",
        unit: "kg/m²",
        performedBy: "Nurse Anong",
        date: "27/08/2024 08:00",
      },
    ],
    clinicalNotes: [
      {
        id: "CN-07801",
        author: "Dr. Thanakorn Yodrak",
        role: "Physician",
        date: "27/08/2024 08:00",
        summary: "Follow-up visit for Type 2 Diabetes management. Patient reports increased thirst and occasional blurred vision.",
      },
      {
        id: "CN-07802",
        author: "Nurse Anong",
        role: "Nurse",
        date: "27/08/2024 13:20",
        summary: "Patient educated on dietary modifications and glucose monitoring. Medication adherence discussed. Follow-up scheduled in 4 weeks.",
      },
    ],
    treatmentPlans: [
      {
        id: "TP-07801",
        planName: "Diabetes Management Plan",
        createdBy: "Dr. Thanakorn Yodrak",
        date: "27/08/2024 10:00",
        status: "Active",
      },
    ],
  },
};

export function getEmrDataByEpisodeId(episodeId: string): EmrData | undefined {
  return emrByEpisodeId[episodeId];
}

export function createOrderTableRows(orders: Order[]): string[][] {
  return orders.map((o) => [o.id, o.name, o.type, o.orderedBy, o.date, o.status]);
}

export function createObservationTableRows(observations: Observation[]): string[][] {
  return observations.map((o) => [
    o.id,
    o.type,
    o.value,
    o.unit,
    o.performedBy,
    o.date,
  ]);
}

export function createClinicalNoteTableRows(notes: ClinicalNote[]): string[][] {
  return notes.map((n) => [n.id, n.author, n.role, n.date, n.summary]);
}

export function createTreatmentPlanTableRows(plans: TreatmentPlan[]): string[][] {
  return plans.map((p) => [p.id, p.planName, p.createdBy, p.date, p.status]);
}

export function normalizeEmrSearch(
  search: Record<string, unknown>,
): { section?: EmrSection } {
  const raw = String(search.section ?? "").trim();
  if (!raw) return {};
  const valid: EmrSection[] = [
    "orders",
    "observations",
    "clinicalNotes",
    "treatmentPlans",
  ];
  return valid.includes(raw as EmrSection)
    ? { section: raw as EmrSection }
    : {};
}
