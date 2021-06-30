import _ from "lodash";
import { Movie } from "../types/Movie";

export function paginate(
  items: Movie[],
  pageNumber: number,
  pageSize: number
): Movie[] {
  const startIndex = (pageNumber - 1) * pageSize;

  //convert array to lodash wrapper so chaining is available
  return _(items).slice(startIndex).take(pageSize).value();
}
