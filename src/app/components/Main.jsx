"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTask";
import axios from "axios";

const Main = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className="flex w-full max-w-5xl h-auto items-stretch relative">
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col">
          <AddTask notes={notes} setNotes={setNotes} />
        </div>
        <div className="absolute inset-y-0 left-1/2 w-[4px] bg-gray-500"></div>
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col">
          <ShowTasks notes={notes} deleteNote={deleteNote} />
        </div>
      </div>
    </div>
  );
};

export default Main;
