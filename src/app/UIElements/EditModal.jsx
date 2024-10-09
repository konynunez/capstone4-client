"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa"; // Import icons

const EditModal = ({ show, note, handleClose, editNote }) => {
  // Initialize state with current note values or fallback to prevent errors
  const [date, setDate] = useState(note?.date || "");
  const [category, setCategory] = useState(note?.category || "");
  const [description, setDescription] = useState(note?.description || "");

  // Synchronize state when the note prop changes
  useEffect(() => {
    if (note) {
      setDate(note.date);
      setCategory(note.category);
      setDescription(note.description);
    }
  }, [note]);

  // Function to handle note update
  const handleUpdateNote = () => {
    const updatedNote = {
      id: note.id,
      date,
      category,
      description,
    };
    editNote(updatedNote); // Call the parent function to update the note
    handleClose(); // Close the modal after saving
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="edit-note-modal"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-zinc-700" id="edit-note-modal">
            Edit Note
          </h3>
          <button
            className="text-zinc-500 hover:text-zinc-700 focus:outline-none"
            onClick={handleClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">
          <form>
            {/* Category Input */}
            <div className="mb-4">
              <label htmlFor="formCategory" className="block text-zinc-700">
                Category
              </label>
              <input
                type="text"
                id="formCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>

            {/* Date Input */}
            <div className="mb-4">
              <label htmlFor="formDate" className="block text-zinc-700">
                Date
              </label>
              <input
                type="date"
                id="formDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label htmlFor="formDescription" className="block text-zinc-700">
                Description
              </label>
              <textarea
                id="formDescription"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
            onClick={handleUpdateNote}
          >
            <FaSave className="inline mr-2" /> Save Changes
          </button>
          <button
            className="bg-zinc-300 text-zinc-700 py-2 px-4 rounded hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
            onClick={handleClose}
          >
            <FaTimes className="inline mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;