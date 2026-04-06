export type Patient = {
  hn: string;
  name: string;
  surname: string;
  sex: string;
  phoneNumber: string;
  idPassport: string;
  dob: string;
};

export type PatientSearchParams = {
  hn?: string;
  name?: string;
  surname?: string;
  sex?: string;
  phoneNumber?: string;
  idPassport?: string;
  dob?: string;
};

export const patients: Patient[] = [
  {
    hn: "HN-100421",
    name: "Somchai",
    surname: "Srisuk",
    sex: "male",
    phoneNumber: "081-234-5678",
    idPassport: "1103702450012",
    dob: "04/01/1988",
  },
  {
    hn: "HN-100388",
    name: "Nanthipha",
    surname: "Charoenwong",
    sex: "female",
    phoneNumber: "089-456-7890",
    idPassport: "AB1234567",
    dob: "12/08/1992",
  },
  {
    hn: "HN-100295",
    name: "Prasert",
    surname: "Limthong",
    sex: "male",
    phoneNumber: "062-789-0123",
    idPassport: "1109901134567",
    dob: "23/11/1979",
  },
  {
    hn: "HN-100512",
    name: "Kanjana",
    surname: "Phetcharoen",
    sex: "female",
    phoneNumber: "092-345-6789",
    idPassport: "N99887766",
    dob: "18/03/1985",
  },
];

function normalizeValue(value: unknown) {
  return String(value ?? "").trim();
}

export function normalizePatientSearch(
  search: Record<string, unknown>,
): PatientSearchParams {
  const normalizedSearch = {
    hn: normalizeValue(search.hn) || undefined,
    name: normalizeValue(search.name) || undefined,
    surname: normalizeValue(search.surname) || undefined,
    sex: normalizeValue(search.sex).toLowerCase() || undefined,
    phoneNumber: normalizeValue(search.phoneNumber) || undefined,
    idPassport: normalizeValue(search.idPassport) || undefined,
    dob: normalizeValue(search.dob) || undefined,
  };

  if (
    normalizedSearch.sex !== undefined &&
    normalizedSearch.sex !== "male" &&
    normalizedSearch.sex !== "female"
  ) {
    normalizedSearch.sex = undefined;
  }

  return normalizedSearch;
}

export function hasPatientSearch(search: PatientSearchParams) {
  return Object.values(search).some(Boolean);
}

export function filterPatients(search: PatientSearchParams) {
  if (!hasPatientSearch(search)) {
    return [];
  }

  return patients.filter((patient) => {
    const patientData = {
      hn: patient.hn.toLowerCase(),
      name: patient.name.toLowerCase(),
      surname: patient.surname.toLowerCase(),
      sex: patient.sex.toLowerCase(),
      phoneNumber: patient.phoneNumber.toLowerCase(),
      idPassport: patient.idPassport.toLowerCase(),
      dob: patient.dob.toLowerCase(),
    };

    return (
      (!search.hn || patientData.hn.includes(search.hn.toLowerCase())) &&
      (!search.name || patientData.name.includes(search.name.toLowerCase())) &&
      (!search.surname ||
        patientData.surname.includes(search.surname.toLowerCase())) &&
      (!search.sex || patientData.sex === search.sex) &&
      (!search.phoneNumber ||
        patientData.phoneNumber.includes(search.phoneNumber.toLowerCase())) &&
      (!search.idPassport ||
        patientData.idPassport.includes(search.idPassport.toLowerCase())) &&
      (!search.dob || patientData.dob.includes(search.dob.toLowerCase()))
    );
  });
}

function generateHN(): string {
  const max = patients.reduce((acc, p) => {
    const num = parseInt(p.hn.replace("HN-", ""), 10);
    return isNaN(num) ? acc : Math.max(acc, num);
  }, 0);
  return `HN-${max + 1}`;
}

// TODO: replace with real API call — HN will be assigned by the backend
export function registerPatient(data: Omit<Patient, "hn">): Patient {
  const patient: Patient = { hn: generateHN(), ...data };
  patients.push(patient);
  return patient;
}

export function formatSex(sex: string, short = false): string {
  if (sex === "male") return short ? "M" : "Male";
  if (sex === "female") return short ? "F" : "Female";
  return sex;
}

export function createPatientTableRows(results: Patient[]) {
  return results.map((patient) => [
    patient.hn,
    patient.name,
    patient.surname,
    formatSex(patient.sex),
    patient.phoneNumber,
    patient.idPassport,
    patient.dob,
  ]);
}
