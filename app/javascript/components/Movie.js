import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import { pretty, UserContext } from "./App";
import Item from "./Item";
import StateDropdown from "./StateDropdown";

function Movie(props) {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState();
  const [refresher, setRefresher] = useState();
  const [monitoring, setMonitoring] = useState();
  const currentUser = useContext(UserContext);

  const bordersColors = {
    NotWatched: "border border-gray-300",
    plan_to_watch: "border border-blue-500",
    watched: "border border-green-500",
    abandoned: "border border-red-500",
  };

  useEffect(() => {
    fetch(`/api/tmdb/show/movie/${params.id}`).then((response) =>
      response.json().then((data) => setMovie(data))
    );
    fetch(`/api/tmdb/cast/movie/${params.id}`).then((response) =>
      response.json().then((data) => setCast(data))
    );
    fetch(`/api/tmdb/similar/movie/${params.id}`).then((response) =>
      response.json().then((data) => setSimilar(data))
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/monitoring/movies/${params.id}?uid=${currentUser.uid}`).then(
        (response) => response.json().then((data) => setMonitoring(data))
      );
    }
    return () => {};
  }, [currentUser, refresher]);

  if (movie) {
    return (
      <article className="my-20">
        <div className="max-w-7xl mx-auto shadow-lg p-4">
          <header className="flex justify-between my-2">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            <div className="flex items-center gap-4">
              {monitoring && (
                <StateDropdown
                  id={monitoring.imdb_id}
                  state={monitoring.state}
                  setter={setRefresher}
                />
              )}
              <p>{movie.status}</p>
            </div>
          </header>

          <section className="flex gap-10">
            <div className="relative">
              <div className="w-64">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                  className=""
                />
              </div>
              <p className="absolute right-2 top-2 w-min p-2 my-1 rounded font-black shadow-lg bg-yellow-500">
                {movie.vote_average}
              </p>
            </div>
            <div className="my-4">
              <ul>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">IMDB</span>
                  <span>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      className="underline text-yellow-900"
                    >
                      {movie.imdb_id}
                    </a>
                  </span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="pb-4 text-gray-600 bg-blue-50">
                    Homepage
                  </span>
                  <span>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      className="underline text-yellow-900"
                    >
                      {movie.homepage}
                    </a>
                  </span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">
                    Original Title
                  </span>
                  <span className="text-lg font-medium">
                    {movie.original_title}
                  </span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Release date</span>
                  <span>{movie.release_date}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Country</span>
                  <span>{movie.production_countries[0].name}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Runtime</span>
                  <span>{movie.runtime} min</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Genres</span>
                  <div className="flex flex-wrap gap-4">
                    {movie.genres.map((g) => (
                      <span>{g.name}</span>
                    ))}
                  </div>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="py-4 text-gray-600 bg-blue-50">Cast</span>
                  <div className="divide-x-2 py-4">
                    {cast.map((c, index) => {
                      if (index > 10) {
                        return;
                      }
                      return <span className="px-2">{c.name}</span>;
                    })}
                  </div>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="py-4 text-gray-600 bg-blue-50">
                    Overview
                  </span>
                  <span className="py-4">{movie.overview}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="max-w-7xl grid mx-auto my-4">
          {monitoring && (
            <section
              className={` shadow-lg p-4 ${bordersColors[monitoring.state]}`}
            >
              <h3 className="mb-4 font-bold text-lg">State</h3>
              <div className="flex items-center justify-around">
                <p className="flex gap-4">
                  <span className="font-medium">Date:</span>
                  <span>
                    {format(new Date(`${monitoring.updated_at}`), "dd/MMM/yy")}
                  </span>
                </p>
                <p className="text-xl capitalize">{pretty(monitoring.state)}</p>
              </div>
            </section>
          )}

          <section className="shadow-lg p-4">
            <h3 className="font-bold text-lg">Similar</h3>
            <div id="similar-container" className="grid grid-layout gap-4">
              {similar &&
                similar.map(
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
                )}
            </div>
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="h-screen grid place-content-center">
      <p className="text-xl font-bold">Loading...</p>
    </article>
  );
}

export default Movie;
