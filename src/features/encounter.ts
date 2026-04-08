export type Encounter = {
  id: string;
  episodeId: string;
  createdBy: string;
  createdAt: string;
};

const encountersByEpisodeId: Record<string, Encounter[]> = {
  "EP-2024-001": [
    {
      id: "ENC-2024-00101",
      episodeId: "EP-2024-001",
      createdBy: "Nurse Anong",
      createdAt: "12/01/2024 08:30",
    },
    {
      id: "ENC-2024-00102",
      episodeId: "EP-2024-001",
      createdBy: "Dr. Wanchai Sombat",
      createdAt: "12/01/2024 10:15",
    },
    {
      id: "ENC-2024-00103",
      episodeId: "EP-2024-001",
      createdBy: "Nurse Ploy",
      createdAt: "12/01/2024 14:00",
    },
  ],
  "EP-2024-045": [
    {
      id: "ENC-2024-04501",
      episodeId: "EP-2024-045",
      createdBy: "Dr. Pimchanok Ruangrit",
      createdAt: "08/06/2024 09:00",
    },
  ],
  "EP-2023-089": [
    {
      id: "ENC-2023-08901",
      episodeId: "EP-2023-089",
      createdBy: "Dr. Thanakorn Yodrak",
      createdAt: "20/09/2023 11:30",
    },
    {
      id: "ENC-2023-08902",
      episodeId: "EP-2023-089",
      createdBy: "Nurse Anong",
      createdAt: "20/09/2023 15:45",
    },
  ],
  "EP-2025-031": [
    {
      id: "ENC-2025-03101",
      episodeId: "EP-2025-031",
      createdBy: "Nurse Ploy",
      createdAt: "15/04/2025 07:45",
    },
  ],
  "EP-2024-078": [
    {
      id: "ENC-2024-07801",
      episodeId: "EP-2024-078",
      createdBy: "Dr. Thanakorn Yodrak",
      createdAt: "27/08/2024 08:00",
    },
    {
      id: "ENC-2024-07802",
      episodeId: "EP-2024-078",
      createdBy: "Nurse Anong",
      createdAt: "27/08/2024 13:20",
    },
  ],
  "EP-2024-102": [
    {
      id: "ENC-2024-10201",
      episodeId: "EP-2024-102",
      createdBy: "System",
      createdAt: "14/11/2024 16:00",
    },
  ],
  "EP-2024-033": [
    {
      id: "ENC-2024-03301",
      episodeId: "EP-2024-033",
      createdBy: "Dr. Pimchanok Ruangrit",
      createdAt: "18/04/2024 09:30",
    },
    {
      id: "ENC-2024-03302",
      episodeId: "EP-2024-033",
      createdBy: "Nurse Ploy",
      createdAt: "18/04/2024 11:00",
    },
  ],
};

export function getEncountersByEpisodeId(episodeId: string): Encounter[] {
  return encountersByEpisodeId[episodeId] ?? [];
}

export function getEncounterById(
  id: string,
): Encounter | undefined {
  for (const encounters of Object.values(encountersByEpisodeId)) {
    const encounter = encounters.find((enc) => enc.id === id);
    if (encounter) return encounter;
  }
  return undefined;
}

export function createEncounterTableRows(
  encounters: Encounter[],
): string[][] {
  return encounters.map((encounter) => [
    encounter.id,
    encounter.createdBy,
    encounter.createdAt,
  ]);
}
