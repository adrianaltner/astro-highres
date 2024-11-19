import type React from "react";
import { useState, useEffect, useCallback } from "react";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsVisible(true);
    }
  };

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".menu") &&
        !target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  ); // Add isOpen as a dependency to ensure it updates correctly

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.addEventListener("click", handleOutsideClick);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.removeEventListener("click", handleOutsideClick);
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleOutsideClick]); // Include handleOutsideClick in dependencies

  return (
    <div>
      <button
        type="button" // Explicitly set the type
        onClick={handleClick}
        className="menu-button fixed bottom-3 w-20 h-20 right-3 text-xl bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition z-50 md:hidden"
      >
        Menu
      </button>
      {isVisible && (
        <ul
          className={`fixed text-center menu z-50 md:hidden transition-opacity duration-300 w-[100px] bottom-[100px] right-[50px] ${isOpen ? "animate-fade-in opacity-100" : "animate-fade-out opacity-0"}`}
        >
          <li className="mb-2 bg-red-600 p-2 rounded-3xl shadow-md text-zinc-50">
            <a href="/" className="block hover:underline">
              Home
            </a>
          </li>
          <li className="mb-2 bg-red-600 p-2 rounded-3xl shadow-md text-zinc-50">
            <a href="/footage" className="block hover:underline">
              Footage
            </a>
          </li>
          <li className="mb-2 bg-red-600 p-2 rounded-3xl shadow-md text-zinc-50">
            <a href="/journeys" className="block hover:underline">
              Journeys
            </a>
          </li>
          <li className="mb-2 bg-red-600 p-2 rounded-3xl shadow-md text-zinc-50">
            <a href="/about" className="block hover:underline">
              About
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MenuButton;
