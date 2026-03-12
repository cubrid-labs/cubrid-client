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

  if (!candidate.ColumnNames || !candidate.ColumnValues) {
    return [];
  }

  return candidate.ColumnValues.map((row) => {
    const mappedRow: QueryResultRow = {};

    candidate.ColumnNames!.forEach((columnName, index) => {
      mappedRow[columnName] = row[index];
    });

    return mappedRow;
  });
}
