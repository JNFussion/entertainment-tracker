import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AvatarBtn({ currentUser }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function signOutUser() {
    signOut(getAuth());
    navigate("/");
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center gap-4 rounded-full"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShow((prevState) => !prevState)}
        >
          {currentUser.photoURL ? (
            <span>
              <img
                src={currentUser.photoURL}
                alt=""
                className="rounded-full w-5"
              />
            </span>
          ) : (
            <span className="text-xl">
              <FaRegUserCircle />
            </span>
          )}
          <span>{currentUser.displayName}</span>
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
              type="button"
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
              onClick={signOutUser}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarBtn;
