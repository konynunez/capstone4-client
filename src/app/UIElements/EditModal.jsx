"use client"; 
import React, { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditModal = ({ show, note, handleClose, editNote }) => {
  const [date, setDate] = useState(note?.date || "");
  const [category, setCategory] = useState(note?.category || "");
  const [description, setDescription] = useState(note?.description || "");

  useEffect(() => {
    if (note) {
      setDate(note.date);
      setCategory(note.category);
      setDescription(note.description);
    }
  }, [note]);

  const handleUpdateNote = () => {
    const updatedNote = {
      id: note.id,
      date,
      category,
      description,
    };
    console.log("Updating Note:", updatedNote); // Debugging
    editNote(updatedNote); // Call the edit function
    handleClose(); // Close the modal
  };

  if (!show) return null; // Conditional rendering to prevent rendering when modal is not shown

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-zinc-700">Edit Note</h3>
          <button className="text-zinc-500 hover:text-zinc-700" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <form>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded"
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-zinc-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-zinc-500 text-white py-2 px-4 rounded"
              onClick={handleUpdateNote} // Handle note update
            >
              <FaSave className="inline mr-2" /> Save Changes
            </button>
            <button
              type="button"
              className="bg-zinc-300 text-zinc-700 py-2 px-4 rounded"
              onClick={handleClose}
            >
              <FaTimes className="inline mr-2" /> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
