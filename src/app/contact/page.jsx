"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Logs form data to console
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered H1 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-6 mb-8">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in w-full max-w-lg"
      >
        {/* Name input */}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="your name"
          {...register("name", { required: "Name is required", maxLength: 80 })}
          className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center 
          placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email input */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Enter a valid email",
            },
          })}
          className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center
          placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Phone input */}
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="your phone"
          {...register("phone", {})}
          className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center
          placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
        />

        {/* Message input */}
        <label htmlFor="details">Message</label>
        <textarea
          id="details"
          {...register("details", {})}
          placeholder="Leave your message here..."
          rows={3}
          className="w-full outline-none border-0 p-0 mx-0 focus:ring-0 
          placeholder:text-lg border-b border-gray focus:border-gray bg-transparent "
        />

        {/* Submit button */}
        <input
          type="submit"
          value="Send Request"
          className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 
          sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded
          cursor-pointer bg-green-500 text-white hover:bg-green-700"
        />
      </form>
    </div>
  );
}
