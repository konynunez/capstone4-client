"use client";
import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import EditModal from "../UIElements/EditModal";
import ViewModal from "../UIElements/ViewModal";
import DeleteModal from "../UIElements/DeleteModal";

const ShowNotes = ({ notes, deleteNote, updateNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [sortCriteria, setSortCriteria] = useState("date");

  const handleView = (note) => {
    setSelectedNote(note);
    setShowViewModal(true);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDelete = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Sort notes based on criteria
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortCriteria === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === "month") {
      return new Date(a.date).getMonth() - new Date(b.date).getMonth();
    } else if (sortCriteria === "year") {
      return new Date(a.date).getFullYear() - new Date(b.date).getFullYear();
    }
    return 0;
  });

  // Handle Delete action with loading
  const handleDeleteNote = async (id) => {
    try {
      setLoading(true); // Start loading
      await deleteNote(id); // Call delete function
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false); // Stop loading
      setShowDeleteModal(false); // Close modal after deleting
    }
  };

  // Handle Update action with loading
  const handleUpdateNote = async (note) => {
    try {
      setLoading(true); // Start loading
      await updateNote(note); // Call update function
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false); // Stop loading
      setShowEditModal(false); // Close modal after updating
    }
  };

  return (
    <div className="flex flex-col h-full p-4 note-container w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">ALL NOTES</h2>
      <div className="flex justify-end mb-4">
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="p-2 bg-zinc-200 text-zinc-900 rounded border border-zinc-400"
        >
          <option value="date">Sort by Date</option>
          <option value="month">Sort by Month</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>
      <div className="overflow-auto h-56">
        {sortedNotes.length > 0 ? (
          <div className="space-y-4">
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                className="flex flex-col sm:flex-row justify-between items-center p-4 bg-zinc-100 rounded-md shadow"
              >
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <p><strong>Category:</strong> {note.category}</p>
                  <p><strong>Date:</strong> {new Date(note.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {note.description}</p>
                </div>
                <div className="flex space-x-4 w-full sm:w-auto justify-around sm:justify-start">
                  <FaEye className="text-blue-500 cursor-pointer" onClick={() => handleView(note)} />
                  <FaPen className="text-yellow-500 cursor-pointer" onClick={() => handleEdit(note)} />
                  <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(note)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-center">No notes available.</p>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-xl">Processing...</p>
        </div>
      )}

      {showViewModal && (
        <ViewModal
          show={showViewModal}
          note={selectedNote}
          handleClose={() => setShowViewModal(false)}
        />
      )}
      {showEditModal && (
        <EditModal
          show={showEditModal}
          note={selectedNote}
          handleClose={() => setShowEditModal(false)}
          editNote={handleUpdateNote} 
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          handleDelete={() => handleDeleteNote(selectedNote.id)} 
          handleClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ShowNotes;
