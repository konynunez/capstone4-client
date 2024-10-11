"use client";
import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { MdWbSunny, MdNightsStay } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkTheme(prefersDark);
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <nav className="bg-black text-white shadow-md p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link href="/" className="flex items-center text-green-500 hover:text-green-400">
          <FaBook className="mr-2 text-green-500 text-2xl sm:text-3xl" />
          <h1 className="text-lg sm:text-xl font-bold text-green-500">iNote</h1>
        </Link>
      </div>
      <div>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="text-2xl sm:text-3xl"
          aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkTheme ? <MdNightsStay /> : <MdWbSunny />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
