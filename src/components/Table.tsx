import React, { type ReactNode } from "react";
import "@carbon/web-components/es/components/data-table/index.js";

type TableCellValue = string | number | ReactNode;

type TableData = {
  headers: TableCellValue[];
  rows: TableCellValue[][];
};

type TableToolbar = {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
};

type TableProps = {
  table: TableData;
  title?: string;
  rowAction?: (row: TableCellValue[]) => ReactNode;
  toolbar?: TableToolbar;
};

export function Table({ table, title, rowAction, toolbar }: TableProps) {
  return (
    <cds-table>
      {title && (
        <cds-table-header-title slot="title">{title}</cds-table-header-title>
      )}
      {toolbar && (
        <cds-table-toolbar slot="toolbar">
          <cds-table-toolbar-content>
            {toolbar.searchPlaceholder !== undefined && (
              <cds-table-toolbar-search
                persistent
                placeholder={toolbar.searchPlaceholder}
                onInput={(e: React.SyntheticEvent<HTMLElement>) =>
                  toolbar.onSearch?.((e.target as HTMLInputElement).value)
                }
              />
            )}
            {toolbar.actions}
          </cds-table-toolbar-content>
        </cds-table-toolbar>
      )}
      <cds-table-head>
        <cds-table-header-row>
          {table.headers.map((header, index) => (
            <cds-table-header-cell key={`${String(header)}-${index}`}>
              {header}
            </cds-table-header-cell>
          ))}
          {rowAction && <cds-table-header-cell />}
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        {table.rows.map((row, rowIndex) => (
          <cds-table-row key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <cds-table-cell key={`cell-${rowIndex}-${cellIndex}`}>
                {cell}
              </cds-table-cell>
            ))}
            {rowAction && (
              <cds-table-cell key={`action-${rowIndex}`}>
                {rowAction(row)}
              </cds-table-cell>
            )}
          </cds-table-row>
        ))}
      </cds-table-body>
    </cds-table>
  );
}
