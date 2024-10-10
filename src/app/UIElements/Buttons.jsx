"use client";
import React from "react";

const Buttons = ({ text, onClick, type = "button", className = "", ariaLabel = text, color = "bg-zinc-400" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 m-2 w-full ${color} text-white rounded-lg shadow hover:bg-opacity-80 transition ${className}`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};

export default Buttons;
