import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import Item from "./Item";

function Find() {
  const [media, setMedia] = useState([]);
  const [inputMovie, setInputMovie] = useState("");
  const params = useParams();

  function handleSubmit(e) {
    const url =
      params.type === "movies"
        ? `/api/tmdb/movie/find?term=${inputMovie}`
        : `/api/tmdb/tv/find?term=${inputMovie}`;
    e.preventDefault();

    fetch(url).then((response) =>
      response.json().then((data) => setMedia(data))
    );

    setInputMovie("");
  }

  useEffect(() => {
    setMedia([]);
    return () => {};
  }, [params.type]);

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
              placeholder={
                params.type === "movies" ? "The Godfather" : "Breaking Bad"
              }
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
          {params.type === "movies"
            ? media.map(
                ({ id, title, release_date, vote_average, poster_path }) => (
                  <Item
                    type="movies"
                    id={id}
                    title={title}
                    release_date={release_date}
                    vote_average={vote_average}
                    poster_path={poster_path}
                  />
                )
              )
            : media.map(
                ({ id, name, first_air_date, vote_average, poster_path }) => (
                  <Item
                    type="tv"
                    id={id}
                    title={name}
                    release_date={first_air_date}
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

export default Find;
