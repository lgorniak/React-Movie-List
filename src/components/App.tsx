import React, {ReactElement} from 'react';
import Movies from "./movies";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import MovieSecond from "./moviesSecond";


export default function App(): ReactElement {
  return (
    <div>
      <MovieSecond />
    </div>
  );
}
