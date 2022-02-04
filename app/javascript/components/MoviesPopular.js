import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/layout.css";

function MoviesPopular(params) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/tmdb/popular").then((response) =>
      response.json().then((data) => setMovies(data))
    );
    return () => {};
  }, []);

  console.log(movies);

  return (
    <article className="my-20">
      <div className="max-w-7xl mx-auto">
        <header>
          <h2 className="font-bold text-4xl">Popular</h2>
        </header>
        <div className="grid grid-layout gap-10 my-10">
          {movies.map(
            ({ id, title, release_date, vote_average, poster_path }) => (
              <article
                key={id}
                id={id}
                className="p-4 rounded border shadow-lg"
              >
                <p className="w-min p-2 my-1 rounded font-black shadow-lg bg-yellow-500">
                  {vote_average}
                </p>
                <div className="py-1 border-t border-b">
                  <Link to={`/movies/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      alt=""
                      className="w-48 mx-auto"
                    />
                  </Link>
                </div>
                <Link to={`/movies/${id}`} className="p-2">
                  <h3 className="font-bold underline">{title}</h3>
                  <p>{release_date}</p>
                </Link>
                <button
                  type="button"
                  className="block ml-auto py-1 px-2 rounded-md shadow border border-black text-white bg-blue-800"
                >
                  Monitor
                </button>
              </article>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default MoviesPopular;
