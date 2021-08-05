import React, { useEffect, useState } from 'react';
import { NotesTable } from './NotesTable/NotesTable';
import { NotesForm } from './NotesForm/NotesForm';
import IResponseGetNote from '../../interfaces/IResponseGetNote';
import { NoteService } from '../../services/note.service';
import { CreateNoteDTO } from '../../interfaces/create-note.dto';
import { NotificationUtil } from '../../utils/NotificationUtil';

import './Notes.css';

const INITIAL_NOTES_STATE: IResponseGetNote[] = [];
const INITIAL_NEW_NOTE_STATE = {
  title: '',
  content: '',
  important: '',
};
const INITIAL_MESSAGE_STATE = {
  message: '',
  status: ''
};

const Notes = () => {
  const [notes, setNotes] = useState(INITIAL_NOTES_STATE);
  const [newNote, setNewNote] = useState(INITIAL_NEW_NOTE_STATE);
  const [showImportants, setShowImportants] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const fetchNotes = await NoteService.findAll();
      setNotes(fetchNotes);
    }
    getNotes();
  }, []);

  const handleClick = () => {
    setShowImportants(!showImportants);
  };

  const handleInput = ({target}: any) => {
    const attribute: keyof CreateNoteDTO = target.name;
    const note = { ...newNote };
    note[attribute] = target.value;
    setNewNote(note);
  }

  const addNewNote = async (event: any) => {
    event.preventDefault();
    const emptyFields = Object.values(newNote).some((value) => value == '');
    if (!emptyFields) {
      const normalizedNote = obtainNormNote();
      try {
        const newNote = await NoteService.create(normalizedNote);
        setNotes((prevNotes) => [...prevNotes, newNote]);
        NotificationUtil.createNotification({
          title: 'Success',
          message: 'Note has been added successfully.',
          type: 'success',
        });
        setNewNote(INITIAL_NEW_NOTE_STATE);
      } catch (error) {
        error.response?.status === 400
          ? NotificationUtil.createNotification({
              title: 'Error',
              message: `There's already a note with '${newNote.title}' title.`,
              type: 'danger',
            })
          : NotificationUtil.createNotification({
              title: 'Error',
              message: `It occured an unexpected error.`,
              type: 'danger',
            });
      }
    } else {
      NotificationUtil.createNotification({
        title: 'Error',
        message: `Every field is required.`,
        type: 'danger',
      });
    }
  };

  const handleDeleteAction = (id: any) => {
    const deleteNote = async () => {
      await NoteService.deleteById(id);
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
      NotificationUtil.createNotification({
        title: 'Success',
        message: `Note has been removed successfully.`,
        type: 'success',
      });
    };
    return deleteNote;
  };

  const obtainNormNote = () => {
    const { title, content, important} = newNote;
    const normalizedNote: CreateNoteDTO = {
      title,
      content,
      important: important == 'false' ? false : true,
    };
    return normalizedNote;
  }

  return (
    <div className="notes">
      <NotesForm addNewNote={addNewNote} handleInput={handleInput} newNote={newNote}/>
      <NotesTable notes={notes} showImportants={showImportants} handleClick={handleClick} handleDeleteAction={handleDeleteAction}/>
    </div>
  )
};

export { Notes };
