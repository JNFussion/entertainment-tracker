import React, { useEffect, useState } from "react";
import {
  MdLocalMovies,
  MdMenu,
  MdOutlineChevronLeft,
  MdRemoveRedEye,
  MdSearch,
  MdTrendingUp,
  MdTv,
} from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import NavListItem from "./NavListItem";
import "../../assets/stylesheets/Navbar.css";
import AvatarBtn from "./AvatarBtn";
import { Link } from "react-router-dom";

function Navbar({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <nav
        className={`${
          isOpen ? "open-v" : "close-v"
        } fixed top-0 h-screen w-60 p-4 border-r text-white bg-gray-800 transition-transform duration-300 ease-in`}
      >
        <section>
          <button
            type="button"
            className=" block p-1 ml-auto rounded-full hover:bg-gray-600"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            {isOpen ? <MdOutlineChevronLeft /> : ""}
          </button>

          <h2 className="my-4 font-bold text-xl">Entertaiment tracker</h2>
        </section>
        <ul>
          {[
            [
              "Movies",
              <MdLocalMovies />,
              [
                ["Monitoring", <MdRemoveRedEye />, "/movies/monitoring"],
                ["Stats", <ImStatsBars />, "/movies/stats"],
              ],
            ],
            [
              "Tv Shows",
              <MdTv />,
              [
                ["Monitoring", <MdRemoveRedEye />, "/tv-shows/monitoring"],
                ["Stats", <ImStatsBars />, "/tv-shows/stats"],
              ],
            ],
            [
              "Games",
              <FaGamepad />,
              [
                ["Monitoring", <MdRemoveRedEye />, "/games/monitoring"],
                ["Stats", <ImStatsBars />, "/games/stats"],
              ],
            ],
          ].map(([text, icon, subList]) => (
            <NavListItem text={text} icon={icon} subList={subList} />
          ))}
        </ul>
        <div className="my-4 border" />
        <ul>
          {[
            [
              "Movies",
              <MdLocalMovies />,
              [
                ["Popular", <MdTrendingUp />, "/movies/popular"],
                ["find", <MdSearch />, "/movies/find"],
              ],
            ],
            [
              "Tv Shows",
              <MdTv />,
              [
                ["Popular", <MdTrendingUp />, "/tv-shows/popular"],
                ["find", <MdSearch />, "/tv-shows/find"],
              ],
            ],
            [
              "Games",
              <FaGamepad />,
              [
                ["Popular", <MdTrendingUp />, "/games/popular"],
                ["find", <MdSearch />, "/games/find"],
              ],
            ],
          ].map(([text, icon, subList]) => (
            <NavListItem text={text} icon={icon} subList={subList} />
          ))}
        </ul>
      </nav>
    );
  }
  return (
    <nav className="open-h fixed top-0 w-full flex gap-4 p-4 text-white bg-gray-800 transition-all duration-300 ease-in">
      <button
        type="button"
        className="text-lg p-1 rounded hover:bg-gray-600"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <MdMenu />
      </button>
      <h2 className="text-bold text-xl">Entertainment tracker</h2>
      <div className="ml-auto">
        {currentUser ? (
          <AvatarBtn currentUser={currentUser} />
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-2 rounded hover:bg-gray-700">
              Login
            </Link>
            <Link to="/sign-up" className="px-2 rounded hover:bg-gray-700">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
