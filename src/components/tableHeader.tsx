import React, { ReactElement } from "react";
import { Column } from "../types/Column";
import { Sort } from "../types/Sort";

interface Props {
  columns: Column[];
  setSortColumn: Sort;
  handleSort: (sort: Sort) => void;
}

export default function TableHeader(props: Props): ReactElement {
  const { columns, setSortColumn, handleSort } = props;

  const raiseSort = (path: string): void => {
    const sortColumn = { ...setSortColumn };

    if (sortColumn.path === path) {
      sortColumn.order === "asc"
        ? (sortColumn.order = "desc")
        : (sortColumn.order = "asc");
    } else {
      sortColumn.order = "asc";
    }
    handleSort(sortColumn);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              key={column.path || column.key}
              onClick={() => column.path && raiseSort(column.path)}
            >
              {column.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
