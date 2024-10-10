"use client"; // If using Next.js
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/contacts", data); // Adjust the endpoint based on your backend
      alert("Your message has been sent successfully!");
      console.log("Response:", response.data); // Log the response for debugging
    } catch (error) {
      console.error("Error sending contact data:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-6 mb-8">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 w-full max-w-lg"
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
          className="border-b border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email", { required: "Email is required" })}
          className="border-b border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Your phone"
          {...register("phone")}
          className="border-b border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />

        <label htmlFor="details">Message</label>
        <textarea
          id="details"
          placeholder="Leave your message here..."
          {...register("details")}
          rows={3}
          className="border border-gray-400 focus:outline-none focus:ring focus:ring-green-500 w-full"
        />

        <input
          type="submit"
          value="Send Request"
          className="mt-8 py-2 px-4 bg-green-500 text-white cursor-pointer rounded"
        />
      </form>
    </div>
  );
}
