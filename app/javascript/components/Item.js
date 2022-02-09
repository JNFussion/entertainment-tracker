import React from "react";
import { Link } from "react-router-dom";

function Item({ type, id, vote_average, poster_path, title, release_date }) {
  return (
    <article key={id} id={id} className="p-4 rounded border shadow-lg">
      <p className="w-min p-2 my-1 rounded font-black shadow-lg bg-yellow-500">
        {vote_average}
      </p>
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
      <button
        type="button"
        className="block ml-auto py-1 px-2 rounded-md shadow border border-black text-white bg-blue-800"
      >
        Monitor
      </button>
    </article>
  );
}

export default Item;
