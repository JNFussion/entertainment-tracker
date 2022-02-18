import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "./App";
import StateDropdown from "./StateDropdown";

function Item({
  type,
  id,
  vote_average,
  poster_path,
  title,
  release_date,
  state,
  setter,
}) {
  const currentUser = useContext(UserContext);
  const location = useLocation();
  const params = useParams();
  const bordersColors = {
    NotWatched: "border border-gray-300",
    plan_to_watch: "border border-blue-500",
    watched: "border border-green-500",
    abandoned: "border border-red-500",
  };

  function setMonitoring() {
    const token = document.getElementsByName("csrf-token")[0].content;
    if (currentUser) {
      let url = "";
      let data;
      if (params.type === "movies") {
        url = "/api/monitoring/movies";
        data = {
          movie: {
            tmdb_id: id,
            monitoring: true,
            state: 0,
            uid: currentUser.uid,
          },
        };
      } else {
        url = "/api/monitoring/tv";
        data = {
          tv: {
            tmdb_id: id,
            monitoring: true,
            state: 0,
            uid: currentUser.uid,
          },
        };
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
      });
    }
  }

  function deleteMonitoring() {
    if (confirm("Are you sure?")) {
      const token = document.getElementsByName("csrf-token")[0].content;
      if (currentUser) {
        let url = "";
        if (params.type === "movies") {
          url = `/api/monitoring/movies/${id}?uid=${currentUser.uid}`;
        } else {
          url = `/api/monitoring/tv/${id}?uid=${currentUser.uid}`;
        }
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token,
          },
        }).then(() => setter((prevState) => !prevState));
      }
    }
  }

  const [mediaItem, setMediaItem] = useState();

  useEffect(() => {
    if (currentUser) {
      let url = "";
      if (params.type === "movies") {
        url = `/api/monitoring/movies/${id}?uid=${currentUser.uid}`;
      } else {
        url = `/api/monitoring/tv/${id}?uid=${currentUser.uid}`;
      }
      fetch(url).then((response) =>
        response.json().then((data) => setMediaItem(data))
      );
    }
    return () => {};
  }, [currentUser]);

  return (
    <article key={id} id={id} className="p-4 rounded border shadow-lg">
      <div className="flex items-center justify-between">
        <p className="w-min p-2 my-1 rounded font-black shadow-lg bg-yellow-500">
          {vote_average}
        </p>
        {location.pathname.startsWith("/monitoring") && (
          <div>
            <button
              className="opacity-50 hover:opacity-100"
              onClick={deleteMonitoring}
            >
              <FaTrashAlt />
            </button>
          </div>
        )}
      </div>
      <div className="py-1 border-t border-b">
        <Link to={`/${type}/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt=""
            className="w-48 mx-auto"
          />
        </Link>
      </div>
      <Link to={`/${type}/${id}`} className="p-2">
        <h3 className="font-bold underline">{title}</h3>
        <p>{release_date}</p>
      </Link>
      {!location.pathname.startsWith("/monitoring") ? (
        !mediaItem && (
          <button
            type="button"
            className="block ml-auto py-1 px-2 rounded-md shadow border border-black text-white bg-blue-800"
            onClick={setMonitoring}
          >
            Monitor
          </button>
        )
      ) : (
        <React.Fragment>
          <StateDropdown id={id} state={state} setter={setter} />
          <div className={bordersColors[state]} />
        </React.Fragment>
      )}
    </article>
  );
}

export default Item;
