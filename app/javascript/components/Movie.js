import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";

function Movie(props) {
  const params = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    fetch(`/api/tmdb/show/${params.id}`).then((response) =>
      response.json().then((data) => setMovie(data))
    );
    return () => {};
  }, []);

  console.log(movie);

  if (movie) {
    return (
      <article className="my-20">
        <div className="max-w-7xl mx-auto shadow-lg p-4">
          <header className="flex justify-between my-2">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            <p>{movie.status}</p>
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
                  <div className="flex gap-4">
                    {movie.genres.map((g) => (
                      <span>{g.name}</span>
                    ))}
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
