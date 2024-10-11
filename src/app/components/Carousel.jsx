"use client"; // Ensures this component is client-side

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Dynamically load react-slick only on the client side
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function MultiCarousel() {
  const [notes, setNotes] = useState([]); // Server-side data
  const [images, setImages] = useState([]); // Unsplash images
  const [isMounted, setIsMounted] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    setIsMounted(true);

    // Fetch data from your backend server (notes)
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notes`);
        setNotes(response.data); // Set the notes data
      } catch (error) {
        console.error("Error fetching notes from server:", error); // Debugging error
      }
    };

    // Fetch Unsplash images directly from Unsplash API
    const fetchImages = async () => {
      const UNSPLASH_API_URL = "https://api.unsplash.com/photos";
      const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

      try {
        const response = await axios.get(UNSPLASH_API_URL, {
          params: { per_page: 10 }, // Fetch 10 images
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };

    fetchNotes();
    fetchImages();
  }, [API_BASE_URL]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, // Display 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }, // Show 2 items for medium screens
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }, // Show 3 items for larger screens
      },
    ],
  };

  if (!isMounted) {
    return null; // Prevent server-side rendering issues
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Notes Carousel with green gradient background */}
      <div
        className="mb-8 rounded-lg p-4"
        style={{
          background: "linear-gradient(135deg, #10B981, #34D399, #047857)", // Green gradient
        }}
      >
        <h3 className="text-2xl font-semibold text-center mb-4 text-white">Notes</h3>
        <Slider {...settings}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="p-4">
                <div className="w-full h-36 bg-white rounded-lg shadow-lg p-4 text-center flex items-center justify-center"> {/* Rectangular box */}
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900 mb-2">{note.category}</h4>
                    <p className="text-sm text-emerald-700">{note.description}</p>
                    <small className="text-emerald-500 mt-2 block">{note.date}</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 bg-blue-100 rounded-lg shadow-lg text-center">
              <p className="text-2xl text-emerald-800">No notes available.</p>
            </div>
          )}
        </Slider>
      </div>

      {/* Unsplash Carousel with purple gradient background */}
      <div
        className="rounded-lg p-4"
        style={{
          background: "linear-gradient(135deg, #6B46C1, #9F7AEA, #D6BCFA)", // Purple gradient
        }}
      >
        <h3 className="text-2xl font-semibold text-center mb-4 text-white">Images from Unsplash</h3>
        <Slider {...settings}>
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="p-4">
                <div className="relative w-full h-36 bg-white rounded-lg shadow-lg overflow-hidden"> {/* Rectangular image box */}
                  <Image
                    src={image.urls.regular}
                    alt={image.alt_description}
                    layout="fill" // Makes the image fill the container
                    objectFit="cover" // Ensures the image covers the container proportionally
                    className="rounded-lg" // Soft corners for the image
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 bg-blue-100 rounded-lg shadow-lg text-center">
              <p className="text-2xl text-emerald-800">No images available.</p>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default MultiCarousel;
