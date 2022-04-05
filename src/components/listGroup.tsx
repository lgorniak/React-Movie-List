import React, { ReactElement } from "react";
import { Genre } from "../types/Genre";

interface Props {
  items: Genre[];
  textProperty?: string;
  valueProperty?: string;
  onItemSelect: (item: Genre) => void;
  selectedItem: Genre | undefined;
}

export default function ListGroup(props: Props): ReactElement {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item._id}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};


