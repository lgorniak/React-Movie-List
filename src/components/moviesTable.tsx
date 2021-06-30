import React, { ReactElement } from "react";
import { Movie } from "../types/Movie";
import { Sort } from "../types/Sort";
import TableHeader from "./tableHeader";

interface Props {
  pageMovies: Movie[];
  setSortColumn: Sort;
  handleDelete: (movie: Movie) => void;
  handleSort: (sort: Sort) => void;
}

export default function MoviesTable(props: Props): ReactElement {
  const { pageMovies, setSortColumn, handleDelete, handleSort } = props;

  const raiseSort = (path: string): void => {
    const sortColumn = { ...setSortColumn };

    console.log(path);
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

  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "delete" },
  ];

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        handleSort={handleSort}
        setSortColumn={setSortColumn}
      />
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
