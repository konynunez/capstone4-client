"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTask";

const Main = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editNote = (note) => {
    const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      {/* Outer Flexbox container to center the content */}
      <div className="flex w-full max-w-5xl h-auto items-stretch relative">
        {/* Vertical line dividing the sections */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] bg-gray-500"></div>

        {/* AddTask section */}
        <div className="w-1/2 p-6 bg-white shadow-md rounded-lg flex flex-col">
          <AddTask notes={notes} addNote={addNote} />
        </div>

        {/* ShowTask section */}
        <div className="w-1/2 p-6 bg-white shadow-md rounded-lg flex flex-col">
          <ShowTasks notes={notes} deleteNote={deleteNote} editNote={editNote} />
        </div>
      </div>
    </div>
  );
};

export default Main;
