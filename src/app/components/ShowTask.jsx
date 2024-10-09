"use client";
import React, { useState, useMemo } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import EditModal from "../UIElements/EditModal";
import ViewModal from "../UIElements/ViewModal";
import DeleteModal from "../UIElements/DeleteModal";

const ShowTask = ({ notes, deleteNote, editNote }) => {
  const [sortOrder, setSortOrder] = useState("date");
  const [selectedNote, setSelectedNote] = useState(null); // Track the selected note for modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sortedNotesByOrder = useMemo(() => {
    if (sortOrder === "year") {
      return [...notes].sort((a, b) => new Date(a.date).getFullYear() - new Date(b.date).getFullYear());
    } else if (sortOrder === "month") {
      return [...notes].sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth());
    } else {
      return [...notes].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }, [notes, sortOrder]);

  const handleView = (note) => {
    setSelectedNote(note); // Set the note to view
    setShowViewModal(true); // Show the view modal
  };

  const handleEdit = (note) => {
    setSelectedNote(note); // Set the note to edit
    setShowEditModal(true); // Show the edit modal
  };

  const handleDelete = (note) => {
    setSelectedNote(note); // Set the note to delete
    setShowDeleteModal(true); // Show the delete modal
  };

  return (
    <div className="flex flex-col justify-start h-full">
      <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
        ALL NOTES
      </h2>

      {/* Sort dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 bg-zinc-200 text-zinc-900 rounded border border-zinc-400"
        >
          <option value="date">Sort by Date</option>
          <option value="month">Sort by Month</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      {/* Display Notes */}
      <div className="flex-1 overflow-auto">
        {sortedNotesByOrder.length > 0 ? (
          <div className="space-y-4">
            {sortedNotesByOrder.map((note) => (
              <div
                key={note.id}
                className="flex justify-between items-center p-4 bg-zinc-100 rounded-md"
              >
                <div>
                  <p className="text-zinc-700">
                    <strong>Category:</strong> {note.category}
                  </p>
                  <p className="text-zinc-700">
                    <strong>Date:</strong> {new Date(note.date).toLocaleDateString()}
                  </p>
                  <p className="text-zinc-700">
                    <strong>Description:</strong> {note.description}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <FaEye
                    className="text-zinc-500 cursor-pointer"
                    onClick={() => handleView(note)}
                  />
                  <FaPen
                    className="text-zinc-500 cursor-pointer"
                    onClick={() => handleEdit(note)}
                  />
                  <FaTrash
                    className="text-zinc-500 cursor-pointer"
                    onClick={() => handleDelete(note)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-center">No notes available.</p>
        )}
      </div>

      {/* View Modal */}
      {showViewModal && (
        <ViewModal
          show={showViewModal}
          note={selectedNote}
          handleClose={() => setShowViewModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditModal
          show={showEditModal}
          note={selectedNote}
          handleClose={() => setShowEditModal(false)}
          editNote={editNote}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          note={selectedNote}
          handleClose={() => setShowDeleteModal(false)}
          deleteNote={() => {
            deleteNote(selectedNote.id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ShowTask;
