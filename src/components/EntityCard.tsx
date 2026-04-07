import type { ReactNode } from "react";
import "@carbon/web-components/es/components/grid/index.js";
import "@carbon/web-components/es/components/stack/index.js";
import "#/components/styles/EntityCard.scss";

type EntityCardField = {
  label: string;
  value: string;
};

type EntityCardProps = {
  icon: ReactNode;
  fields: EntityCardField[];
};

const TOTAL_COLS = 16;

export function EntityCard({ icon, fields }: EntityCardProps) {
  const n = fields.length;
  const fieldCols = n > 0 ? Math.floor(TOTAL_COLS / (n + 1)) : TOTAL_COLS;
  const iconCols = fieldCols;
  const lastFieldCols = TOTAL_COLS - iconCols - fieldCols * (n - 1);

  return (
    <div className="entity-card">
      <cds-grid align="start" full-width>
        <cds-column lg={String(iconCols)}>{icon}</cds-column>
        {fields.map(({ label, value }, i) => (
          <cds-column
            key={label}
            lg={String(i === n - 1 ? lastFieldCols : fieldCols)}
          >
            <cds-stack>
              <p className="entity-card__label">{label}</p>
              <p className="entity-card__value">{value}</p>
            </cds-stack>
          </cds-column>
        ))}
      </cds-grid>
    </div>
  );
}
