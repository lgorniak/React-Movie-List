import { ReactElement } from "react";

type Content<Y> = { _id: string } & Y;

export interface Column<Y> {
  path?: string;
  label?: string;
  key?: string;
  content?: (item: Content<Y>) => ReactElement;
}
