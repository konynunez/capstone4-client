"use client"; // Ensure this component is treated as a client component
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTask";
import axios from "axios";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchNotes(); // Fetch notes on initial load
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true); // Set loading before fetching
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
      setNotes(response.data); // Update state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const addNoteToAPI = async (note) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, note);
      setNotes((prevNotes) => [...prevNotes, response.data]); // Add new note to state
      fetchNotes(); // Re-fetch notes to show the latest data
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNoteInAPI = async (note) => {
    try {
      setLoading(true);
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${note.id}`, note); // Update note
      fetchNotes(); // Re-fetch notes after update
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`); // Delete note
      fetchNotes(); // Re-fetch notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center relative">
      {loading && (
        <p className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl text-white bg-emerald-500 rounded-lg p-4 shadow-lg">
          Loading...
        </p>
      )} {/* Centered loading message */}
      <div className="flex w-full max-w-5xl h-auto items-stretch relative">
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col note-container">
          <AddTask notes={notes} setNotes={setNotes} addNote={addNoteToAPI} />
        </div>
        <div className="absolute inset-y-0 left-1/2 h-[90%] my-5 w-[4px] bg-gray-500"></div>
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col note-container">
          <ShowTasks notes={notes} deleteNote={deleteNote} updateNote={updateNoteInAPI} />
        </div>
      </div>
    </div>
  );
};

export default Main;
