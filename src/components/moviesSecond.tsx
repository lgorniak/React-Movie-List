import React, { ReactElement, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { Movie } from "../types/Movie";
import { Genre } from "../types/Genre";
import MovieTable from "./moviesTable";
import _, { filter } from "lodash";
import { Sort } from "../types/Sort";

interface Props {
  movie: Movie;
  genre: Genre;
  sort: Sort;
}


export default function MovieSecond(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>(getMovies());
  const [genres, setGenres] = useState<Genre[]>([
    { _id: "", name: "All Genres" },
    ...getGenres(),
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>();
  const [sortColumn, setSortColumn] = useState<Sort>({
    path: "title",
    order: "asc",
  });

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const pageMovies: Movie[] = paginate(sorted, currentPage, pageSize);

  const handleDelete = (movie: Movie): void => {
    const notDeletedMovies = movies.filter((m: Movie) => m._id !== movie._id);
    setMovies(notDeletedMovies);
  };

  const handleSort = (sort: Sort): void => {
    setSortColumn(sort);
  };

  const handleGenreSelect = (genre: Genre): void => {
    setCurrentPage(1);
    setSelectedGenre(genre);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          selectedItem={selectedGenre}
          items={genres}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {movies.length} movies in the database.</p>
        <MovieTable
          pageMovies={pageMovies}
          setSortColumn={sortColumn}
          handleDelete={handleDelete}
          handleSort={handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
