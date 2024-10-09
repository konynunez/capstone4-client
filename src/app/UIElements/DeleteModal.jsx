"use client";
import React, { useEffect } from 'react';

const DeleteModal = ({ show, handleDelete, id, handleClose }) => {
  // Close modal when the Escape key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [show, handleClose]);

  // Close modal when clicking on the overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick} // Close modal on overlay click
      role="dialog" // Accessibility improvement
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="text-zinc-500 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        {/* Modal Content */}
        <div className="text-center my-4">
          <p id="delete-modal-description" className="text-lg text-zinc-700">
            Are you sure you want to delete this note?
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
