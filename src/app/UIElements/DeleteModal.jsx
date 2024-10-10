"use client";
import React from "react";

const DeleteModal = ({ show, handleDelete, handleClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-end">
          <button className="text-zinc-500 hover:text-zinc-700" onClick={handleClose}>
            &times;
          </button>
        </div>
        <p className="text-lg text-center">Are you sure you want to delete this note?</p>
        <div className="flex justify-center mt-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleDelete}>
            Delete
          </button>
          <button className="bg-zinc-300 text-zinc-700 py-2 px-4 rounded" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
