import React, { Component, ReactElement } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { Movie } from "../types/Movie";
import { Genre } from "../types/Genre";

interface State {
  movies: Movie[];
  genres: Genre[];
  currentPage: number;
  pageSize: number;
  selectedGenre?: Genre;
}

class Movies extends Component<Record<string, never>, State> {
  state: State = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount(): void {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleGenreSelect = (genre: Genre): void => {
    this.setState({ selectedGenre: genre });
  };

  handleDelete = (movie: Movie): void => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page: number): void => {
    this.setState({ currentPage: page });
  };

  render(): ReactElement {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, selectedGenre, movies } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const filtered = selectedGenre
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

    const pageMovies: Movie[] = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={this.state.selectedGenre}
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
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
                      onClick={() => this.handleDelete(movie)}
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
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
