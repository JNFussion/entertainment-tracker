import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import { pretty, UserContext } from "./App";
import StateDropdown from "./StateDropdown";

function TV(props) {
  const params = useParams();
  const [tv, setTV] = useState();
  const [cast, setCast] = useState([]);
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
    fetch(`/api/tmdb/show/tv/${params.id}`).then((response) =>
      response.json().then((data) => setTV(data))
    );
    fetch(`/api/tmdb/cast/tv/${params.id}`).then((response) =>
      response.json().then((data) => setCast(data))
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/monitoring/tv/${params.id}?uid=${currentUser.uid}`).then(
        (response) => response.json().then((data) => setMonitoring(data))
      );
    }
    return () => {};
  }, [currentUser, refresher]);

  if (tv && monitoring) {
    return (
      <article className="my-20">
        <div className="max-w-7xl mx-auto shadow-lg p-4">
          <header className="flex justify-between my-2">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold">{tv.name}</h2>

              <p className="w-min p-2 my-1 rounded font-black shadow-lg bg-yellow-500">
                {tv.vote_average}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {monitoring && (
                <StateDropdown
                  id={monitoring.tmdb_id}
                  state={monitoring.state}
                  setter={setRefresher}
                />
              )}
              <p>{tv.status}</p>
            </div>
          </header>

          <section className="flex gap-10">
            <div className="relative">
              <div className="w-64">
                <img
                  src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                  alt=""
                  className=""
                />
              </div>
            </div>
            <div className="my-4">
              <ul>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="pb-4 text-gray-600 bg-blue-50">
                    Homepage
                  </span>
                  <span>
                    <a
                      href={tv.homepage}
                      target="_blank"
                      className="underline text-yellow-900"
                    >
                      {tv.homepage}
                    </a>
                  </span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">
                    Original Title
                  </span>
                  <span className="text-lg font-medium">
                    {tv.original_name}
                  </span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Episodes</span>
                  <span>{tv.number_of_episodes}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Seasons</span>
                  <span>{tv.number_of_seasons}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Release date</span>
                  <span>{tv.first_air_date}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Country</span>
                  <span>{tv.production_countries[0].name}</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Runtime</span>
                  <span>{tv.episode_run_time[0]} min per episode</span>
                </li>
                <li className="grid grid-cols-1-9 gap-12">
                  <span className="text-gray-600 bg-blue-50">Genres</span>
                  <div className="flex flex-wrap gap-4">
                    {tv.genres.map((g) => (
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
                  <span className="py-4">{tv.overview}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
        {monitoring && (
          <section
            className={`max-w-7xl grid mx-auto my-4 p-4 rounded shadow-lg ${
              bordersColors[monitoring.state]
            }`}
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
      </article>
    );
  }

  return (
    <article className="h-screen grid place-content-center">
      <p className="text-xl font-bold">Loading...</p>
    </article>
  );
}

export default TV;
