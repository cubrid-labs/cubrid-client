import type { QueryResultRow } from "../types/result.js";

interface ColumnResultShape {
  ColumnNames?: string[];
  ColumnValues?: unknown[][];
}

export function mapResult(result: unknown): QueryResultRow[] {
  if (Array.isArray(result)) {
    return result as QueryResultRow[];
  }

  if (!result || typeof result !== "object") {
    return [];
  }

  const candidate = result as ColumnResultShape;
  const { ColumnNames: columnNames, ColumnValues: columnValues } = candidate;

  if (!columnNames || !columnValues) {
    return [];
  }

  return columnValues.map((row) => {
    const mappedRow: QueryResultRow = {};

    columnNames.forEach((columnName, index) => {
      mappedRow[columnName] = row[index];
    });

    return mappedRow;
  });
}
