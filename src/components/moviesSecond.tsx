import React, { ReactElement, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { Movie } from "../types/Movie";
import { Genre } from "../types/Genre";

interface Props {
  movie: Movie;
  genre: Genre;
}

export default function MovieSecond(): ReactElement {
  console.log("working");
  //this.setState({ movies: getMovies(), genres: getGenres() });
  const [movies, setMovies] = useState<Movie[]>(getMovies());
  const [genres, setGenres] = useState<Genre[]>(getGenres());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>();

  const filtered = selectedGenre
    ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
    : movies;

  const pageMovies: Movie[] = paginate(filtered, currentPage, pageSize);

  const handleDelete = (movie: Movie): void => {
    const notDeletedMovies = movies.filter((m: Movie) => m._id !== movie._id);
    setMovies(notDeletedMovies);
  };

  const handleGenreSelect = (genre: Genre): void => {
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
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pageMovies.map((movie) => (
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
