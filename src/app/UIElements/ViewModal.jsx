"use client";
import React from 'react';

const ViewModal = ({ show, note, handleClose }) => {
  if (!show || !note) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-700">Category: {note.category}</h2>
          <button
            className="text-zinc-500 hover:text-zinc-700"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <p className="text-zinc-700">{note.description || 'No description available.'}</p>
        </div>

        <div className="flex justify-between items-center border-t pt-4 border-zinc-300">
          <p className="text-sm text-zinc-500">{new Date(note.date).toLocaleDateString()}</p>
          <button
            className="bg-zinc-300 text-zinc-700 py-2 px-4 rounded hover:bg-zinc-400"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;