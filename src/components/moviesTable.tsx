import React, { ReactElement } from "react";
import { Movie } from "../types/Movie";
import { Sort } from "../types/Sort";
import TableBody from "./tableBody";
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
    {
      key: "delete",
      content: function deleteButton(movie: Movie) {
        return (
          <button
            onClick={() => handleDelete(movie)}
            className="btn btn-danger btn-small"
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        handleSort={handleSort}
        setSortColumn={setSortColumn}
      />
      <TableBody<Movie>
        data={pageMovies}
        handleDelete={handleDelete}
        columns={columns}
      />
    </table>
    
  );
}
