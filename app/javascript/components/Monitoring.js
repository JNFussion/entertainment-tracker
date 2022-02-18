import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import { UserContext } from "./App";
import Item from "./Item";

function getMonitoring(url, setter) {
  fetch(url).then((response) => response.json().then((data) => setter(data)));
}

function findState(monitoring, id) {
  const target = monitoring.find((m) => m.tmdb_id == id);
  return target.state;
}

function Monitoring() {
  const [monitoring, setMonitoring] = useState([]);
  const [media, setMedia] = useState([]);
  const [refresher, setRefresher] = useState();

  const currentUser = useContext(UserContext);
  const params = useParams();
  useEffect(() => {
    if (currentUser !== null) {
      if (params.type === "movies") {
        getMonitoring(
          `/api/monitoring/movies?uid=${currentUser.uid}`,
          setMonitoring
        );
      } else {
        getMonitoring(
          `/api/monitoring/tv?uid=${currentUser.uid}`,
          setMonitoring
        );
      }
    }

    return () => {};
  }, [currentUser, refresher]);

  useEffect(() => {
    if (monitoring.length !== 0) {
      const dataList = [];
      let url = "";
      monitoring.forEach(({ tmdb_id }) => {
        if (params.type === "movies") {
          url = `/api/tmdb/show/movie/${tmdb_id}`;
        } else {
          url = `/api/tmdb/show/tv/${tmdb_id}`;
        }
        fetch(url).then((response) =>
          response
            .json()
            .then((data) => dataList.push(data))
            .then(() => setMedia(dataList))
        );
      });
    }
    return () => {};
  }, [monitoring]);

  return (
    <article className="my-20">
      <div className="max-w-7xl mx-auto">
        <header>
          <h2 className="font-bold text-4xl">Monitoring</h2>
        </header>
        <div className="grid grid-layout gap-10 my-10">
          {media.length === 0 ? (
            <p className="font-medium">Nothing here.</p>
          ) : params.type === "movies" ? (
            media.map(
              ({ id, title, release_date, vote_average, poster_path }) => (
                <Item
                  type="movies"
                  id={id}
                  title={title}
                  release_date={release_date}
                  vote_average={vote_average}
                  poster_path={poster_path}
                  state={findState(monitoring, id)}
                  setter={setRefresher}
                />
              )
            )
          ) : (
            media.map(
              ({ id, name, first_air_date, vote_average, poster_path }) => (
                <Item
                  type="tv"
                  id={id}
                  title={name}
                  release_date={first_air_date}
                  vote_average={vote_average}
                  poster_path={poster_path}
                  state={findState(monitoring, id)}
                  setter={setRefresher}
                />
              )
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default Monitoring;
