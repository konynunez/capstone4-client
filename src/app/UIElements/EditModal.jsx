import React, { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditModal = ({ show, note, handleClose, editNote }) => {
  const [date, setDate] = useState(note?.date || "");
  const [category, setCategory] = useState(note?.category || "");
  const [description, setDescription] = useState(note?.description || "");

  // Synchronize the modal fields when the note prop changes
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
    editNote(updatedNote); // Call the editNote function from props
    handleClose(); // Close the modal after saving
  };

  if (!show) return null;

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
          <div className="mb-4">
            <label className="block text-zinc-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-zinc-500 text-white py-2 px-4 rounded" onClick={handleUpdateNote}>
              <FaSave className="inline mr-2" /> Save Changes
            </button>
            <button className="bg-zinc-300 text-zinc-700 py-2 px-4 rounded" onClick={handleClose}>
              <FaTimes className="inline mr-2" /> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
