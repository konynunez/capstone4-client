"use client";
import React, { useEffect, useState } from "react";
import AddNote from "./AddNote";
import ShowNotes from "./ShowNote";
import axios from "axios";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes(); // Fetch notes on initial load
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      // Check if notes exist in localStorage
      const cachedNotes = localStorage.getItem("notes");
      if (cachedNotes) {
        setNotes(JSON.parse(cachedNotes)); // Load from cache immediately
      }

      // Fetch latest notes from API (this will update the notes from cache)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`);
      setNotes(response.data);

      // Update the cache in localStorage
      localStorage.setItem("notes", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNoteToAPI = async (note) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`, note);
      const newNotes = [...notes, response.data];
      setNotes(newNotes);

      // Update cache after adding note
      localStorage.setItem("notes", JSON.stringify(newNotes));
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNoteInAPI = async (note) => {
    try {
      setLoading(true);
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${note.id}`, note);
      const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
      setNotes(updatedNotes);

      // Update cache after updating note
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${id}`);
      const remainingNotes = notes.filter((note) => note.id !== id);
      setNotes(remainingNotes);

      // Update cache after deleting note
      localStorage.setItem("notes", JSON.stringify(remainingNotes));
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
      )}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto items-stretch relative">
        <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col note-container mb-6 lg:mb-0">
          <AddNote notes={notes} setNotes={setNotes} addNote={addNoteToAPI} />
        </div>
        <div className="hidden lg:block absolute inset-y-0 left-1/2 h-[90%] my-5 w-[4px] bg-gray-500"></div>
        <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col note-container">
          <ShowNotes notes={notes} deleteNote={deleteNote} updateNote={updateNoteInAPI} />
        </div>
      </div>
    </div>
  );
};

export default Main;
