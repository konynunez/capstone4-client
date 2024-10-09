"use client";
import React from "react";

const Buttons = ({ text, onClick, type = "button", className = "", ariaLabel = text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 m-2 w-full bg-zinc-400 text-white rounded-lg shadow hover:bg-zinc-500 transition ${className}`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};

export default Buttons;
