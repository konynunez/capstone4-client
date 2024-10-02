"use client";

import { useState, useEffect } from "react";
import { Expand } from "@theme-toggles/react";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkTheme(prefersDark);
  }, []);

  // Apply/remove the 'dark' class on the <html> element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <nav className="bg-gray-800 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Panoramix Notebook</h1>
      <div>
        {/* Dark mode toggle */}
        <Expand toggled={isDarkTheme} toggle={setIsDarkTheme} />
      </div>
    </nav>
  );
};

export default Navbar;
