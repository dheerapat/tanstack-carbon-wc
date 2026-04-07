import { type ReactNode } from "react";
import {
  type CarbonIconType,
  PendingFilled,
  Misuse,
  CheckmarkFilled,
  TimeFilled,
} from "@carbon/icons-react";

export type AppointmentStatus =
  | "Scheduled"
  | "Pending"
  | "Cancelled"
  | "Discharged";

export type Appointment = {
  hn: string;
  name: string;
  phone: string;
  careProvider: string;
  episodeId: string;
  status: AppointmentStatus;
};

export const appointments: Appointment[] = [
  {
    hn: "HN-100421",
    name: "Somchai Srisuk",
    phone: "081-234-5678",
    careProvider: "Dr. Apinya Wongkul",
    episodeId: "EP-2024-0088",
    status: "Discharged",
  },
  {
    hn: "HN-100388",
    name: "Nanthipha Charoenwong",
    phone: "089-456-7890",
    careProvider: "Dr. Teerawat Boonchu",
    episodeId: "EP-2024-0091",
    status: "Scheduled",
  },
  {
    hn: "HN-100295",
    name: "Prasert Limthong",
    phone: "062-789-0123",
    careProvider: "Dr. Apinya Wongkul",
    episodeId: "EP-2024-0075",
    status: "Discharged",
  },
  {
    hn: "HN-100512",
    name: "Kanjana Phetcharoen",
    phone: "092-345-6789",
    careProvider: "Dr. Siriporn Nakorn",
    episodeId: "EP-2024-0102",
    status: "Pending",
  },
  {
    hn: "HN-100340",
    name: "Wichai Duangrat",
    phone: "064-901-2345",
    careProvider: "Dr. Teerawat Boonchu",
    episodeId: "EP-2024-0083",
    status: "Cancelled",
  },
  {
    hn: "HN-100467",
    name: "Malee Thongsuk",
    phone: "098-567-8901",
    careProvider: "Dr. Siriporn Nakorn",
    episodeId: "EP-2024-0096",
    status: "Scheduled",
  },
  {
    hn: "HN-100399",
    name: "Thanakorn Ruangrit",
    phone: "085-012-3456",
    careProvider: "Dr. Apinya Wongkul",
    episodeId: "EP-2024-0079",
    status: "Discharged",
  },
];

export const APPOINTMENT_HEADERS = [
  "HN",
  "Name",
  "Phone",
  "Care Provider",
  "Episode ID",
  "Status",
];

const STATUS_CONFIG: Record<
  AppointmentStatus,
  { Icon: CarbonIconType; color: string; label: string }
> = {
  Scheduled: {
    Icon: TimeFilled,
    color: "var(--cds-support-warning)",
    label: "Scheduled",
  },
  Pending: {
    Icon: PendingFilled,
    color: "var(--cds-support-warning)",
    label: "Pending",
  },
  Cancelled: {
    Icon: Misuse,
    color: "var(--cds-support-error)",
    label: "Cancelled",
  },
  Discharged: {
    Icon: CheckmarkFilled,
    color: "var(--cds-support-success)",
    label: "Discharged",
  },
};

export function formatAppointmentStatus(status: AppointmentStatus): ReactNode {
  const { Icon, color, label } = STATUS_CONFIG[status];
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

export function filterAppointments(
  data: Appointment[],
  query: string,
): Appointment[] {
  const q = query.trim().toLowerCase();
  if (!q) return data;
  return data.filter((a) =>
    [a.hn, a.name, a.phone, a.careProvider, a.episodeId, a.status].some(
      (field) => field.toLowerCase().includes(q),
    ),
  );
}

export function createAppointmentTableRows(
  data: Appointment[],
): (string | ReactNode)[][] {
  return data.map((a) => [
    a.hn,
    a.name,
    a.phone,
    a.careProvider,
    a.episodeId,
    formatAppointmentStatus(a.status),
  ]);
}
