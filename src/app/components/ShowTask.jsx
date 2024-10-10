"use client"; // Ensure this component is treated as a client component
import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import EditModal from "../UIElements/EditModal";
import ViewModal from "../UIElements/ViewModal";
import DeleteModal from "../UIElements/DeleteModal";

const ShowTasks = ({ notes, deleteNote, updateNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  return (
    <div className="flex flex-col h-full p-4 note-container">
      <h2 className="text-3xl font-bold mb-4">ALL NOTES</h2>
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
              <div key={note.id} className="flex justify-between items-center p-4 bg-zinc-100 rounded-md shadow">
                <div>
                  <p><strong>Category:</strong> {note.category}</p>
                  <p><strong>Date:</strong> {new Date(note.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {note.description}</p>
                </div>
                <div className="flex space-x-4">
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
          editNote={updateNote} // Pass the update function
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          handleDelete={() => {
            deleteNote(selectedNote.id);
            setShowDeleteModal(false);
          }}
          handleClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ShowTasks;
