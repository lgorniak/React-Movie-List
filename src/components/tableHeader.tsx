import React, { ReactElement } from "react";
import { Column } from "../types/Column";
import { Sort } from "../types/Sort";

interface Props<Y> {
  columns: Column<Y>[];
  setSortColumn: Sort;
  handleSort: (sort: Sort) => void;
}

export default function TableHeader<Y>(props: Props<Y>): ReactElement {
  const { columns, setSortColumn, handleSort } = props;

  const raiseSort = (path: string): void => {
    const sortColumn = { ...setSortColumn };

    if (sortColumn.path === path) {
      sortColumn.order === "asc"
        ? (sortColumn.order = "desc")
        : (sortColumn.order = "asc");
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    handleSort(sortColumn);
  };

  const renderSortIcon = (column: Column<Y>) => {
    if (column.path !== setSortColumn.path) return null;
    if (setSortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => column.path && raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
