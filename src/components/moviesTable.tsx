import React, { ReactElement } from "react";
import { Movie } from "../types/Movie";
import { Sort } from "../types/Sort";

interface Props {
  pageMovies: Movie[];
  setSortColumn: Sort;
  handleDelete: (movie: Movie) => void;
  handleSort: (sort: Sort) => void;
}

export default function MoviesTable(props: Props): ReactElement {
  const {
    pageMovies,
    setSortColumn: setSortColumn,
    handleDelete,
    handleSort,
  } = props;

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
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort("title")}>Title</th>
          <th onClick={() => raiseSort("genre.name")}>Genre</th>
          <th onClick={() => raiseSort("numberInStock")}>Stock</th>
          <th onClick={() => raiseSort("dailyRentalRate")}>Rate</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {pageMovies.map((movie: Movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <button
                onClick={() => handleDelete(movie)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
