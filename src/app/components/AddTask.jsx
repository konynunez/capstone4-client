"use client";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ModalForm from "../UIElements/ModalForm";
import axios from "axios";

const AddTask = ({ notes, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleShowModal = (note = null) => {
    setIsEditing(!!note);
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setCurrentNote(null);
  };

  const addNoteToAPI = async (note) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        note
      );
      setNotes((prevNotes) => [...prevNotes, response.data]);
      handleHideModal();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const updateNoteInAPI = async (note) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${note.id}`, note);
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? note : n))
      );
      handleHideModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-zinc-900 underline underline-offset-4 decoration-emerald-500">
          NOTE MAKER
        </h3>
        <FaPlusCircle
          className="text-emerald-600 cursor-pointer hover:text-emerald-800 transition-transform transform hover:scale-105"
          size={30}
          onClick={() => handleShowModal()}
        />
      </div>
      <h6 className="text-lg font-semibold text-zinc-600 text-center mb-6">FEATURES</h6>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="p-4 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
          onClick={() => handleShowModal()}
        >
          Create Note
        </button>
        <button
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Read Notes
        </button>
        <button
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
          onClick={() => isEditing && currentNote && handleShowModal(currentNote)}
        >
          Update Note
        </button>
        <button
          className="p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          onClick={() => currentNote && setNotes(notes.filter((n) => n.id !== currentNote.id))}
        >
          Delete Note
        </button>
      </div>
      {showModal && (
        <ModalForm
          show={showModal}
          handleClose={handleHideModal}
          addNote={isEditing ? updateNoteInAPI : addNoteToAPI}
          currentNote={currentNote}
        />
      )}
    </div>
  );
};

export default AddTask;
