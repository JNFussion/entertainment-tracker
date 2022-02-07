import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import MovieItem from "./MovieItem";

function MoviesFind(params) {
  const [movies, setMovies] = useState([]);
  const [inputMovie, setInputMovie] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/api/tmdb/find?term=${inputMovie}`).then((response) =>
      response.json().then((data) => setMovies(data))
    );

    setInputMovie("");
  }

  return (
    <article className="my-20">
      <div className="max-w-7xl mx-auto">
        <header>
          <h2 className="font-bold text-4xl">Find</h2>
          <form
            action=""
            className="w-max mx-auto flex"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="rounded-l outline-none border-blue-800 shadow bg-gray-100"
              placeholder="The Godfather"
              onChange={(e) => setInputMovie(e.target.value)}
              value={inputMovie}
            />
            <button
              type="submit"
              className="rounded-r text-3xl px-2 text-white bg-blue-800 transition-all duration-200 ease-in-out hover:text-gray-300 hover:bg-blue-900"
            >
              <MdSearch />
            </button>
          </form>
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

export default MoviesFind;
