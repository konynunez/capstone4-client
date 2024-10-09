import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Dynamically load react-slick only on the client side
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function MultiCarousel() {
  const [notes, setNotes] = useState([]); // Server-side data
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fetch data from your backend server
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/notes"); 
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes from server:", error);
      }
    };

    fetchNotes();
    // FetchApiData commented out temporarily to avoid quote issues
    // const fetchApiData = async () => {
    //   try {
    //     const response = await axios.get("https://api.example.com/quotes"); // Replace with a real API endpoint
    //     setApiData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data from API:", error);
    //   }
    // };
    // fetchApiData();
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  if (!isMounted) {
    return null; // Prevent server-side rendering issues
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-5xl font-bold text-emerald-800 dark:text-emerald-200 text-center mb-8">Welcome</h2>

      <Slider {...settings}>
        {/* Static text block */}
        <div className="p-8 bg-emerald-100 dark:bg-emerald-700 rounded-lg shadow-lg text-center">
          <h3 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4"></h3>
          <p className="text-2xl text-emerald-800 dark:text-emerald-300">Bienvenidos - स्वागत हे - 欢迎 - добро пожаловать - </p>
        </div>

        {/* Server-side data */}
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="p-8 bg-emerald-100 dark:bg-emerald-700 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">{note.category}</h3>
              <p className="text-2xl text-emerald-800 dark:text-emerald-300">{note.description}</p>
              <small className="text-emerald-600 dark:text-emerald-400 block mt-4">{note.date}</small>
            </div>
          ))
        ) : (
          <div className="p-8 bg-emerald-100 dark:bg-emerald-700 rounded-lg shadow-lg text-center">
            <p className="text-2xl text-emerald-800 dark:text-emerald-300">No notes available.</p>
          </div>
        )}

        {/* API data (Quotes) is commented out temporarily */}
        {/* {apiData.length > 0 ? (
          apiData.map((item, index) => (
            <div key={index} className="p-8 bg-emerald-100 dark:bg-emerald-700 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Quote of the Day</h3>
              <p className="text-2xl text-emerald-800 dark:text-emerald-300">"{item.quote}"</p>
              <small className="text-emerald-600 dark:text-emerald-400 block mt-4">- {item.author}</small>
            </div>
          ))
        ) : (
          <div className="p-8 bg-emerald-100 dark:bg-emerald-700 rounded-lg shadow-lg text-center">
            <p className="text-2xl text-emerald-800 dark:text-emerald-300">No quotes available.</p>
          </div>
        )} */}
      </Slider>
    </div>
  );
}

export default MultiCarousel;
