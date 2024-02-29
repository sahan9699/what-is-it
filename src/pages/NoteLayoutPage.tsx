import React from 'react'
import { useParams, Navigate, Outlet } from 'react-router-dom';
import { noteWithTags } from './NoteListPage';

const NoteLayoutPage = ({notes} : {notes: noteWithTags[]}) => {
    const { id } = useParams();
    const selectedNote = notes.find((note) => note.id == id);
  
    if (!selectedNote) return <Navigate to="/" replace />;

  return <Outlet context={selectedNote} />
}

export default NoteLayoutPage