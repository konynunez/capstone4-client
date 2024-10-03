import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically load react-slick only on the client side
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const quotes = [
  {
    id: 1,
    quote: "in iNote you can write, delete, update a note",
    author: "Leave a note",
  },
  {
    id: 2,
    quote: "Welcome - Bienvenidos - 欢迎 - स्वागत हे - herzlich willkommen",
    author: "Everyone",
  },
  {
    id: 3,
    quote: "Leave your comments or questions please",
    author: "Kony Nunez",
  },
  {
    id: 4,
    quote: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    id: 5,
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    id: 6,
    quote: "I think, therefore I am.",
    author: "René Descartes",
  },
  {
    id: 7,
    quote: "Tough times never last but tough people do.",
    author: "Robert H. Schuller",
  },
  {
    id: 8,
    quote: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    id: 9,
    quote: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  {
    id: 10,
    quote: "Tis better to have loved and lost than to have never loved at all.",
    author: "Alfred Lord Tennyson",
  },
  {
    id: 11,
    quote: "Time is money.",
    author: "Benjamin Franklin",
  },
  {
    id: 12,
    quote: "Do not watch the clock. Do what it does. Keep going.",
    author: "Sam Levenson",
  },
];

function Carousel() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This ensures that the component is only rendered on the client
    setIsMounted(true);
  }, []);

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
    // Return null on the server (during SSR)
    return null;
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {quotes.map((quote) => (
          <div key={quote.id} className="quote-slide">
            <h3>{quote.quote}</h3>
            <p>- {quote.author}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
