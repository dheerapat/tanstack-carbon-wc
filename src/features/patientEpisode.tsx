import { type ReactNode } from "react";
import {
  type CarbonIconType,
  CheckmarkFilled,
  TimeFilled,
  PendingFilled,
  Misuse,
  Document,
  Edit,
  Login,
} from "@carbon/icons-react";
import { patients } from "#/features/patientSearch";

export type EpisodeStatus =
  | "scheduled"
  | "pending"
  | "cancelled"
  | "discharged";

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
      careProvider: "Dr. Wanchai Sombat",
      status: "discharged",
    },
    {
      id: "EP-2024-045",
      date: "08/06/2024",
      careProvider: "Dr. Pimchanok Ruangrit",
      status: "pending",
    },
  ],
  "HN-100388": [
    {
      id: "EP-2023-089",
      date: "20/09/2023",
      careProvider: "Dr. Thanakorn Yodrak",
      status: "discharged",
    },
    {
      id: "EP-2025-031",
      date: "15/04/2025",
      careProvider: "Dr. Pimchanok Ruangrit",
      status: "scheduled",
    },
    {
      id: "EP-2025-040",
      date: "20/05/2025",
      careProvider: "Dr. Wanchai Sombat",
      status: "cancelled",
    },
  ],
  "HN-100295": [
    {
      id: "EP-2022-114",
      date: "05/11/2022",
      careProvider: "Dr. Wanchai Sombat",
      status: "discharged",
    },
    {
      id: "EP-2024-078",
      date: "27/08/2024",
      careProvider: "Dr. Thanakorn Yodrak",
      status: "discharged",
    },
    {
      id: "EP-2024-102",
      date: "14/11/2024",
      careProvider: "Dr. Thanakorn Yodrak",
      status: "pending",
    },
    {
      id: "EP-2025-055",
      date: "22/05/2025",
      careProvider: "Dr. Wanchai Sombat",
      status: "scheduled",
    },
  ],
  "HN-100512": [
    {
      id: "EP-2024-033",
      date: "18/04/2024",
      careProvider: "Dr. Pimchanok Ruangrit",
      status: "discharged",
    },
  ],
};

export function getEpisodesByHn(hn: string): Episode[] {
  return episodesByHn[hn] ?? [];
}

export function getEpisodeById(
  id: string,
): { episode: Episode; hn: string } | undefined {
  for (const [hn, episodes] of Object.entries(episodesByHn)) {
    const episode = episodes.find((ep) => ep.id === id);
    if (episode) return { episode, hn };
  }
  return undefined;
}

export function getAllEpisodes(): (Episode & { hn: string })[] {
  const all: (Episode & { hn: string })[] = [];
  for (const [hn, episodes] of Object.entries(episodesByHn)) {
    for (const episode of episodes) {
      all.push({ ...episode, hn });
    }
  }
  return all;
}

const EPISODE_STATUS_CONFIG: Record<
  EpisodeStatus,
  { Icon: CarbonIconType; color: string; label: string }
> = {
  scheduled: {
    Icon: TimeFilled,
    color: "var(--cds-support-warning)",
    label: "Scheduled",
  },
  pending: {
    Icon: PendingFilled,
    color: "var(--cds-support-warning)",
    label: "Pending",
  },
  cancelled: {
    Icon: Misuse,
    color: "var(--cds-support-error)",
    label: "Cancelled",
  },
  discharged: {
    Icon: CheckmarkFilled,
    color: "var(--cds-support-success)",
    label: "Discharged",
  },
};

export function formatEpisodeStatus(status: EpisodeStatus): ReactNode {
  const { Icon, color, label } = EPISODE_STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--cds-spacing-03)",
      }}
    >
      <Icon style={{ fill: color }} />
      {label}
    </span>
  );
}

function parseDate(date: string): number {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export function createEpisodeTableRows(
  episodes: Episode[],
): (string | number | ReactNode)[][] {
  const sorted = [...episodes].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );
  return sorted.map((episode) => [
    episode.id,
    episode.date,
    episode.careProvider,
    formatEpisodeStatus(episode.status),
  ]);
}

export const APPOINTMENT_HEADERS = [
  "HN",
  "Name",
  "Phone",
  "Care Provider",
  "Episode ID",
  "Status",
];

export function filterEpisodes(
  episodes: (Episode & { hn: string })[],
  query: string,
): (Episode & { hn: string })[] {
  const q = query.trim().toLowerCase();
  if (!q) return episodes;
  return episodes.filter((ep) => {
    const patient = patients.find((p) => p.hn === ep.hn);
    const fullName = patient ? `${patient.name} ${patient.surname}` : "";
    return [
      ep.hn,
      fullName,
      patient?.phoneNumber ?? "",
      ep.careProvider,
      ep.id,
      ep.status,
    ].some((field) => field.toLowerCase().includes(q));
  });
}

export function createAppointmentTableRows(
  episodes: (Episode & { hn: string })[],
): (string | ReactNode)[][] {
  const sorted = [...episodes].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );
  return sorted.map((ep) => {
    const patient = patients.find((p) => p.hn === ep.hn);
    const fullName = patient ? `${patient.name} ${patient.surname}` : "";
    return [
      ep.hn,
      fullName,
      patient?.phoneNumber ?? "",
      ep.careProvider,
      ep.id,
      formatEpisodeStatus(ep.status),
    ];
  });
}

export type EpisodeRowAction = {
  label: string;
  Icon: CarbonIconType;
  navigateTo?: { to: "/episode/$episodeId"; params: { episodeId: string } } | { to: "/emr/$episodeId"; params: { episodeId: string } };
};

export function getEpisodeRowActions(
  status: EpisodeStatus,
  episodeId: string,
): EpisodeRowAction[] | null {
  switch (status) {
    case "discharged":
      return [{ label: "View EMR", Icon: Document, navigateTo: { to: "/emr/$episodeId", params: { episodeId } } }];
    case "scheduled":
      return [{ label: "Patient Arrive", Icon: Login }];
    case "pending":
      return [
        {
          label: "Manage Episode",
          Icon: Edit,
          navigateTo: { to: "/episode/$episodeId", params: { episodeId } },
        },
        { label: "View EMR", Icon: Document, navigateTo: { to: "/emr/$episodeId", params: { episodeId } } },
      ];
    case "cancelled":
      return null;
  }
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
