import React, { ReactElement } from "react";
import { Genre } from "../types/Genre";

interface Props {
  items: Genre[];
  textProperty?: string;
  valueProperty?: string;
  onItemSelect: (item: Genre) => void;
  selectedItem: Genre | undefined;
}

const ListGroup = (props: Props): ReactElement => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty || ListGroup.defaultProps.textProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty || ListGroup.defaultProps.valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
