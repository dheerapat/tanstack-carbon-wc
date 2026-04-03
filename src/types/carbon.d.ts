import type { HTMLAttributes } from "react";

type CarbonEl = HTMLAttributes<HTMLElement> & Record<string, unknown>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cds-header": CarbonEl;
      "cds-header-menu-button": CarbonEl;
      "cds-header-name": CarbonEl;
      "cds-header-nav": CarbonEl;
      "cds-header-nav-item": CarbonEl;
      "cds-header-side-nav-items": CarbonEl;
      "cds-header-menu": CarbonEl;
      "cds-header-menu-item": CarbonEl;
      "cds-side-nav": CarbonEl;
      "cds-side-nav-items": CarbonEl;
      "cds-side-nav-link": CarbonEl;
      "cds-side-nav-menu": CarbonEl;
      "cds-side-nav-menu-item": CarbonEl;
      "cds-table": CarbonEl;
      "cds-table-head": CarbonEl;
      "cds-table-header-row": CarbonEl;
      "cds-table-header-cell": CarbonEl;
      "cds-table-body": CarbonEl;
      "cds-table-row": CarbonEl;
      "cds-table-cell": CarbonEl;
      "cds-date-picker": CarbonEl;
      "cds-date-picker-input": CarbonEl;
    }
  }
}
