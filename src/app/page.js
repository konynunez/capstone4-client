"use client";
import React from "react";
import Carousel from "./components/Carousel";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to iNote</h1>
      {/* Render the Carousel component */}
      <Carousel />
    </div>
  );
}
