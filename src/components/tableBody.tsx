import { get } from "lodash";
import React, { ReactElement } from "react";
import { Column } from "../types/Column";

interface Prop<Y> {
  data: Y[];
  handleDelete: (movie: Y) => void;
  columns: Column<Y>[];
}

export default function TableBody<Y extends { _id: string }>(
  props: Prop<Y>
): ReactElement {
  const { data, columns } = props;

  const renderCell = (item: Y, column: Column<Y>) => {
    if (column.content) {
      return column.content(item);
    }
    return get(item, column.path || "");
  };

  const returnKey = (item: Y, column: Column<Y>) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item: Y) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={returnKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
