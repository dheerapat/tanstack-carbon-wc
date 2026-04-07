export type EpisodeStatus = "scheduled" | "arrived" | "discharged";

export type Episode = {
  id: string;
  date: string;
  time?: string;
  status: EpisodeStatus;
  careProvider: string;
  note?: string;
};

export const CARE_PROVIDERS = [
  "Dr. Wanchai Sombat",
  "Dr. Pimchanok Ruangrit",
  "Dr. Thanakorn Yodrak",
] as const;

const episodesByHn: Record<string, Episode[]> = {
  "HN-100421": [
    {
      id: "EP-2024-001",
      date: "12/01/2024",
      status: "discharged",
      careProvider: "Dr. Wanchai Sombat",
    },
    {
      id: "EP-2024-045",
      date: "08/06/2024",
      status: "discharged",
      careProvider: "Dr. Pimchanok Ruangrit",
    },
    {
      id: "EP-2025-012",
      date: "03/02/2025",
      status: "arrived",
      careProvider: "Dr. Wanchai Sombat",
    },
  ],
  "HN-100388": [
    {
      id: "EP-2023-089",
      date: "20/09/2023",
      status: "discharged",
      careProvider: "Dr. Thanakorn Yodrak",
    },
    {
      id: "EP-2025-031",
      date: "15/04/2025",
      status: "scheduled",
      careProvider: "Dr. Pimchanok Ruangrit",
    },
  ],
  "HN-100295": [
    {
      id: "EP-2022-114",
      date: "05/11/2022",
      status: "discharged",
      careProvider: "Dr. Wanchai Sombat",
    },
    {
      id: "EP-2024-078",
      date: "27/08/2024",
      status: "discharged",
      careProvider: "Dr. Thanakorn Yodrak",
    },
    {
      id: "EP-2024-102",
      date: "14/11/2024",
      status: "discharged",
      careProvider: "Dr. Thanakorn Yodrak",
    },
    {
      id: "EP-2025-055",
      date: "22/05/2025",
      status: "scheduled",
      careProvider: "Dr. Wanchai Sombat",
    },
  ],
  "HN-100512": [
    {
      id: "EP-2024-033",
      date: "18/04/2024",
      status: "discharged",
      careProvider: "Dr. Pimchanok Ruangrit",
    },
    {
      id: "EP-2025-008",
      date: "10/01/2025",
      status: "arrived",
      careProvider: "Dr. Thanakorn Yodrak",
    },
  ],
};

export function getEpisodesByHn(hn: string): Episode[] {
  return episodesByHn[hn] ?? [];
}

export function formatStatus(status: EpisodeStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function parseDate(date: string): number {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export function createEpisodeTableRows(
  episodes: Episode[],
): (string | number)[][] {
  const sorted = [...episodes].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );
  return sorted.map((episode) => [
    episode.id,
    episode.date,
    formatStatus(episode.status),
    episode.careProvider,
  ]);
}

let episodeCounter = 200;

export function addEpisode(
  hn: string,
  fields: { date: string; time: string; careProvider: string; note: string },
): Episode {
  const year = fields.date.split("/")[2] ?? new Date().getFullYear();
  const id = `EP-${year}-${String(++episodeCounter).padStart(3, "0")}`;
  const episode: Episode = {
    id,
    date: fields.date,
    time: fields.time,
    status: "scheduled",
    careProvider: fields.careProvider,
    note: fields.note || undefined,
  };
  if (!episodesByHn[hn]) episodesByHn[hn] = [];
  episodesByHn[hn].push(episode);
  return episode;
}
