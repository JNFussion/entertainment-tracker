import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./App";

function StateDropdown({ id, state, setter }) {
  const [show, setShow] = useState();
  const currentUser = useContext(UserContext);
  const params = useParams();

  const stateValues = {
    NotWatched: 0,
    plan_to_watch: 1,
    watched: 2,
    abandoned: 3,
  };

  function update(stateToUpdate) {
    const token = document.getElementsByName("csrf-token")[0].content;
    if (currentUser) {
      let url = "";
      let data;
      if (params.type === "movies") {
        url = `/api/monitoring/movies/${id}?uid=${currentUser.uid}`;
        data = {
          movie: {
            state: stateValues[stateToUpdate],
          },
        };
      } else {
        url = `/api/monitoring/tv/${id}?uid=${currentUser.uid}`;
        data = {
          tv: {
            state: stateValues[stateToUpdate],
          },
        };
      }

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
      }).then(() => {
        setShow((prevState) => !prevState);
        setter((prevState) => !prevState);
      });
    }
  }

  return (
    <div className="relative inline-block my-4 text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShow((prevState) => !prevState)}
        >
          {state}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {show && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              disabled={state === "NotWatched"}
              onClick={() => update("NotWatched")}
            >
              Not Watched
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              disabled={state === "plan_to_watch"}
              onClick={() => update("plan_to_watch")}
            >
              Plan to watch
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              disabled={state === "watched"}
              onClick={() => update("watched")}
            >
              Watched
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              disabled={state === "abandoned"}
              onClick={() => update("abandoned")}
            >
              Abandoned
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StateDropdown;
