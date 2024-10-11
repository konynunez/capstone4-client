"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  

const ModalForm = ({ show, handleClose, addNote }) => {
  const [formValues, setFormValues] = useState({ date: '', category: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!formValues.date || !formValues.category || !formValues.description) {
      setError('All fields are required!');
      return;
    }
    setError('');

    addNote({
      id: uuidv4(),  
      ...formValues,
    });

    handleClose();  
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-zinc-700">Add Note</h2>
          <button
            className="text-zinc-500 hover:text-zinc-700"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm" aria-live="assertive">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} aria-describedby={error && "error-message"}>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-zinc-700">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded mb-4 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-zinc-700">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formValues.date}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded mb-4 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-zinc-700">Description</label>
            <textarea
              name="description"
              id="description"
              value={formValues.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-zinc-300 rounded mb-4 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-500 text-white rounded shadow-lg hover:bg-zinc-600 transition duration-300"
            >
              Add Note
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-zinc-300 text-zinc-700 rounded shadow-lg hover:bg-zinc-400 transition duration-300"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
