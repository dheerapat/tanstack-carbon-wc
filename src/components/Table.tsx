import type { ReactNode } from "react";

type TableCellValue = string | number;

type TableData = {
  headers: TableCellValue[];
  rows: TableCellValue[][];
};

type TableProps = {
  table: TableData;
  /** Optional: render an action cell for each row. Receives the row values. */
  rowAction?: (row: TableCellValue[]) => ReactNode;
};

export function Table({ table, rowAction }: TableProps) {
  return (
    <cds-table>
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
