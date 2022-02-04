import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavListItem({ text, icon, subList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <section>
        <h3 className="flex justify-between">
          <div className="flex items-center gap-4 text-xl">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h3>
        <ul className={`${isOpen ? "" : "hidden"} p-4`}>
          {subList.map(([sText, sIcon, sPath]) => (
            <li>
              <Link
                to={sPath}
                className="flex items-center gap-2 p-1 hover:bg-gray-200"
              >
                <span>{sIcon}</span>
                <span>{sText}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </li>
  );
}

export default NavListItem;
