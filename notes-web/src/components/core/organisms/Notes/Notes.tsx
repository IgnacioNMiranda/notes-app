import React, { useEffect, useState } from 'react';
import { NotesTable } from './NotesTable/NotesTable';
import { NotesForm } from './NotesForm/NotesForm';
import { IResponseNote } from '../../../../interfaces/IResponseNote';
import { NoteService } from '../../../../services/note.service';
import { NotificationUtil } from '../../../../utils/NotificationUtil';

import './Notes.css';

const INITIAL_NOTES_STATE: IResponseNote[] = [];

const Notes = ({ authToken }: any) => {
  const [notes, setNotes] = useState(INITIAL_NOTES_STATE);

  useEffect(() => {
    const getNotes = async () => {
      const fetchNotes = await NoteService.findByUserId(authToken);
      setNotes(fetchNotes);
    }
    getNotes();
  }, []);

  const addNewNote = async (note: IResponseNote) => {
    try {
      const newNote = await NoteService.create(note, authToken);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      NotificationUtil.createNotification({
        title: 'Success',
        message: 'Note has been added successfully.',
        type: 'success',
      });
      return true;
    } catch (error) {
      NotificationUtil.createNotification({
        title: 'Error',
        message: error?.response?.data?.message || 'Unexpected error',
        type: 'danger',
      })
      return false;
    }
  };

  const deleteNote = (id: any) => {
    const handleDeleteNoteClick = async () => {
      try {
        await NoteService.deleteById(id, authToken);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        NotificationUtil.createNotification({
          title: 'Success',
          message: `Note has been removed successfully.`,
          type: 'success',
        });
      } catch (error) {
        NotificationUtil.createNotification({
          title: 'Error',
          message: `${error?.response?.data?.message}` || 'Unexpected error',
          type: 'danger',
        });
      }
    };
    return handleDeleteNoteClick;
  };

  return (
    <div className="notes">
      <NotesForm addNewNote={addNewNote}/>
      <NotesTable notes={notes} deleteNote={deleteNote}/>
    </div>
  )
};

export { Notes };
