import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/stylesheets/layout.css";
import Item from "./Item";

function getMedia(url, setter) {
  fetch(url).then((response) => response.json().then((data) => setter(data)));
}

function Popular() {
  const [media, setMedia] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.type === "movies") {
      getMedia("/api/tmdb/movie/popular", setMedia);
    } else {
      getMedia("/api/tmdb/tv/popular", setMedia);
    }

    return () => {};
  }, [params.type]);

  return (
    <article className="my-20">
      <div className="max-w-7xl mx-auto">
        <header>
          <h2 className="font-bold text-4xl">Popular</h2>
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

export default Popular;
