export type Patient = {
  hn: string;
  name: string;
  middleName: string;
  surname: string;
  sex: string;
  phoneNumber: string;
  idPassport: string;
  nationality: string;
  dob: string;
};

export type PatientSearchParams = {
  hn?: string;
  name?: string;
  middleName?: string;
  surname?: string;
  sex?: string;
  phoneNumber?: string;
  idPassport?: string;
  nationality?: string;
  dob?: string;
};

export const patients: Patient[] = [
  {
    hn: "HN-100421",
    name: "Somchai",
    middleName: "",
    surname: "Srisuk",
    sex: "male",
    phoneNumber: "081-234-5678",
    idPassport: "1103702450012",
    nationality: "Thai",
    dob: "04/01/1988",
  },
  {
    hn: "HN-100388",
    name: "Nanthipha",
    middleName: "",
    surname: "Charoenwong",
    sex: "female",
    phoneNumber: "089-456-7890",
    idPassport: "AB1234567",
    nationality: "Thai",
    dob: "12/08/1992",
  },
  {
    hn: "HN-100295",
    name: "Prasert",
    middleName: "",
    surname: "Limthong",
    sex: "male",
    phoneNumber: "062-789-0123",
    idPassport: "1109901134567",
    nationality: "Thai",
    dob: "23/11/1979",
  },
  {
    hn: "HN-100512",
    name: "Kanjana",
    middleName: "Suda",
    surname: "Phetcharoen",
    sex: "female",
    phoneNumber: "092-345-6789",
    idPassport: "N99887766",
    nationality: "Thai",
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
    middleName: normalizeValue(search.middleName) || undefined,
    surname: normalizeValue(search.surname) || undefined,
    sex: normalizeValue(search.sex).toLowerCase() || undefined,
    phoneNumber: normalizeValue(search.phoneNumber) || undefined,
    idPassport: normalizeValue(search.idPassport) || undefined,
    nationality: normalizeValue(search.nationality) || undefined,
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
      middleName: patient.middleName.toLowerCase(),
      surname: patient.surname.toLowerCase(),
      sex: patient.sex.toLowerCase(),
      phoneNumber: patient.phoneNumber.toLowerCase(),
      idPassport: patient.idPassport.toLowerCase(),
      nationality: patient.nationality.toLowerCase(),
      dob: patient.dob.toLowerCase(),
    };

    return (
      (!search.hn || patientData.hn.includes(search.hn.toLowerCase())) &&
      (!search.name || patientData.name.includes(search.name.toLowerCase())) &&
      (!search.middleName ||
        patientData.middleName.includes(search.middleName.toLowerCase())) &&
      (!search.surname ||
        patientData.surname.includes(search.surname.toLowerCase())) &&
      (!search.sex || patientData.sex === search.sex) &&
      (!search.phoneNumber ||
        patientData.phoneNumber.includes(search.phoneNumber.toLowerCase())) &&
      (!search.idPassport ||
        patientData.idPassport.includes(search.idPassport.toLowerCase())) &&
      (!search.nationality ||
        patientData.nationality.includes(search.nationality.toLowerCase())) &&
      (!search.dob || patientData.dob.includes(search.dob.toLowerCase()))
    );
  });
}

export function createPatientTableRows(results: Patient[]) {
  return results.map((patient) => [
    patient.hn,
    patient.name,
    patient.middleName || "-",
    patient.surname,
    patient.sex,
    patient.phoneNumber,
    patient.idPassport,
    patient.nationality,
    patient.dob,
  ]);
}
