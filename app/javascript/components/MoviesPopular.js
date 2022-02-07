import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/layout.css";
import MovieItem from "./MovieItem";

function MoviesPopular(params) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/tmdb/popular").then((response) =>
      response.json().then((data) => setMovies(data))
    );
    return () => {};
  }, []);

  return (
    <article className="my-20">
      <div className="max-w-7xl mx-auto">
        <header>
          <h2 className="font-bold text-4xl">Popular</h2>
        </header>
        <div className="grid grid-layout gap-10 my-10">
          {movies.map(
            ({ id, title, release_date, vote_average, poster_path }) => (
              <MovieItem
                id={id}
                title={title}
                release_date={release_date}
                vote_average={vote_average}
                poster_path={poster_path}
              />
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default MoviesPopular;
