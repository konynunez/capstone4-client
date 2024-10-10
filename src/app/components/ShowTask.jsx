"use client";
import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import EditModal from "../UIElements/EditModal";
import ViewModal from "../UIElements/ViewModal";
import DeleteModal from "../UIElements/DeleteModal";

const ShowTasks = ({ notes, deleteNote, editNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sorting criteria

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
    // You can implement sorting logic here if necessary
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-3xl font-bold mb-4">ALL NOTES</h2>
      <div className="flex justify-end mb-4">
        <select
          value={sortCriteria}
          onChange={handleSortChange} // Add onChange handler
          className="p-2 bg-zinc-200 text-zinc-900 rounded border border-zinc-400"
        >
          <option value="date">Sort by Date</option>
          <option value="month">Sort by Month</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
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
          editNote={editNote} // Ensure the editNote function is correctly passed
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
