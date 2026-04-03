import { createFileRoute } from "@tanstack/react-router";
import "@carbon/web-components/es/components/data-table/index.js";

export const Route = createFileRoute("/appointment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <cds-table locale="en" size="lg">
      <cds-table-head>
        <cds-table-header-row>
          <cds-table-header-cell>Name</cds-table-header-cell>
          <cds-table-header-cell>Rule</cds-table-header-cell>
          <cds-table-header-cell>Status</cds-table-header-cell>
          <cds-table-header-cell>Other</cds-table-header-cell>
          <cds-table-header-cell>Example</cds-table-header-cell>
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        <cds-table-row>
          <cds-table-cell>Load Balancer 1</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Starting</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 2</cds-table-cell>
          <cds-table-cell>DNS delegation</cds-table-cell>
          <cds-table-cell>Active</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 3</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 4</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 5</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 6</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
        <cds-table-row>
          <cds-table-cell>Load Balancer 7</cds-table-cell>
          <cds-table-cell>Round robin</cds-table-cell>
          <cds-table-cell>Disabled</cds-table-cell>
          <cds-table-cell>Test</cds-table-cell>
          <cds-table-cell>22</cds-table-cell>
        </cds-table-row>
      </cds-table-body>
    </cds-table>
  );
}
