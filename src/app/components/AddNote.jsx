"use client";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ModalForm from "../UIElements/ModalForm";
import Buttons from "../UIElements/Buttons";
import axios from "axios";

const AddNote = ({ notes, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleShowModal = (note = null) => {
    setIsEditing(!!note);
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setCurrentNote(null);
  };

  const fetchNotes = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNoteToAPI = async (note) => {
    try {
      setLoading(true); 
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`, note);
      await fetchNotes();
      handleHideModal(); 
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false); 
    }
  };

  const updateNoteInAPI = async (note) => {
    try {
      setLoading(true); 
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${note.id}`, note);
      await fetchNotes();
      handleHideModal(); 
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col h-auto p-4 rounded-lg bg-white w-full max-w-3xl mx-auto sm:p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 underline underline-offset-4 decoration-emerald-500">
          NOTE MAKER
        </h3>
        <FaPlusCircle
          className="text-emerald-600 cursor-pointer hover:text-emerald-800 transition-transform transform hover:scale-105"
          size={40}  
          onClick={() => handleShowModal()}
        />
      </div>
      <h6 className="text-md sm:text-lg font-semibold text-zinc-600 text-center mb-6">FEATURES</h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Buttons
          text="Create Note"
          onClick={() => handleShowModal()}
          className="bg-emerald-500 hover:bg-emerald-600"
        />
        <Buttons
          text="Read Notes"
          onClick={() => fetchNotes()} 
          className="bg-blue-500 hover:bg-blue-600"
        />
        <Buttons
          text="Update Note"
          onClick={() => isEditing && currentNote && handleShowModal(currentNote)}
          className="bg-yellow-500 hover:bg-yellow-600"
        />
        <Buttons
          text="Delete Note"
          onClick={() => currentNote && setNotes(notes.filter((n) => n.id !== currentNote.id))}
          className="bg-red-500 hover:bg-red-600"
        />
      </div>
      {showModal && (
        <ModalForm
          show={showModal}
          handleClose={handleHideModal}
          addNote={isEditing ? updateNoteInAPI : addNoteToAPI}
          currentNote={currentNote}
        />
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-green-500 text-xl">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNote;
