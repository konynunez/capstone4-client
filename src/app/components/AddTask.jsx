"use client";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ModalForm from "../UIElements/ModalForm";
import axios from "axios";

const AddTask = ({ notes = [], setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is enabled
  const [currentNote, setCurrentNote] = useState(null); // Hold the current note being edited

  // Show modal for adding or editing a note
  const handleShowModal = (note = null) => {
    if (note) {
      setIsEditing(true);
      setCurrentNote(note); // Set note to be edited
    } else {
      setIsEditing(false);
      setCurrentNote(null); // Clear for new note
    }
    setShowModal(true);
  };

  // Hide modal
  const handleHideModal = () => {
    setShowModal(false);
    setCurrentNote(null); // Reset the note after modal closes
  };

  // Add new note via API
  const addNote = async (note) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        note
      );
      setNotes((prevNotes) => [...prevNotes, response.data]); // Update state with the newly added note
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Update note via API
  const updateNote = async (note) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${note.id}`,
        note
      );
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? response.data : n))
      );
      setShowModal(false); // Close modal after updating
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note via API
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="flex flex-col justify-start h-full">
      {/* NOTE MAKER header */}
      <div className="flex items-center justify-start mb-6">
        <h3 className="text-3xl font-semibold text-zinc-900 underline underline-offset-4 decoration-green-600">
          NOTE MAKER
        </h3>
        <FaPlusCircle
          className="text-green-700 cursor-pointer hover:text-green-800 transition-transform transform hover:scale-105 ml-4"
          size={30}
          onClick={() => handleShowModal()} // Show modal for adding new note
        />
      </div>

      {/* FEATURES section */}
      <div className="mb-6">
        <h6 className="text-lg font-semibold text-zinc-600 text-center">
          FEATURES
        </h6>
        <div className="grid grid-cols-2 gap-4 mt-4 justify-center">
          {/* Create Note Button */}
          <button
            className="w-full p-6 text-lg bg-zinc-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors mt-2 mb-2"
            onClick={() => handleShowModal()} // Open modal for new note
          >
            Create Notes
          </button>

          {/* Read Notes Button */}
          <button
            className="w-full p-6 text-lg bg-zinc-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-2 mb-2"
          >
            Read Notes
          </button>

          {/* Update Note Button */}
          <button
            className="w-full p-6 text-lg bg-zinc-500 text-white rounded-lg shadow-md hover:bg-yellow-500 transition-colors mt-2 mb-2"
            onClick={() => notes.length > 0 && handleShowModal(notes[0])} // Open modal to edit first note for demonstration
          >
            Update Notes
          </button>

          {/* Delete Note Button */}
          <button
            className="w-full p-6 text-lg bg-zinc-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors mt-2 mb-2"
            onClick={() => notes.length > 0 && deleteNote(notes[0].id)} // Delete first note for demonstration
          >
            Delete Notes
          </button>
        </div>
      </div>

      {/* Display Notes */}
      <div className="flex-1 overflow-auto">
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="p-4 bg-zinc-100 rounded-md">
                <p className="text-zinc-700">{note.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-center">No notes available.</p>
        )}
      </div>

      {/* Modal for adding or editing notes */}
      {showModal && (
        <ModalForm
          show={showModal}
          handleClose={handleHideModal}
          addNote={isEditing ? updateNote : addNote} // Add or Edit based on modal state
          currentNote={currentNote} // Send current note if in editing mode
        />
      )}
    </div>
  );
};

export default AddTask;
