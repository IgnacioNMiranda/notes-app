import React, { useState } from "react";
import { CreateNoteDTO } from "../../../../../interfaces/create-note.dto";
import { NotificationUtil } from "../../../../../utils/NotificationUtil";
import { Button } from "../../../atoms/Button";
import { Input } from "../../../atoms/Input";
import { Form } from "../../../molecules/Form";
import './NotesForm.css';

const INITIAL_NEW_NOTE_STATE = {
  title: '',
  content: '',
  important: '',
};

const NotesForm = ({ addNewNote }: any) => {
  const [newNote, setNewNote] = useState(INITIAL_NEW_NOTE_STATE);

  const handleInput = ({target}: any) => {
    const attribute: keyof CreateNoteDTO = target.name;
    const note = { ...newNote };
    note[attribute] = target.value;
    setNewNote(note);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const emptyFields = Object.values(newNote).some((value) => value == '');
    if (!emptyFields) {
      const normalizedNote = obtainNormNote();
      const noteWasCreated = await addNewNote(normalizedNote);
      if (noteWasCreated) {
        setNewNote(INITIAL_NEW_NOTE_STATE);
      }
    } else {
      NotificationUtil.createNotification({
        title: 'Error',
        message: `Every field is required.`,
        type: 'danger',
      });
    }
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
    <div className="notesFormWrap">
      <Form onSubmit={handleSubmit} title='New note'>
          <Input type='text' name='title' onChange={handleInput} value={newNote.title} placeholder='Title'/>
          <Input type='text' name='content' onChange={handleInput} value={newNote.content} placeholder='Content'/>

          <div className='radioWrapper'>
            <label>Is it an important note?</label>
            <div>
              <Input type='radio' id='importantFalse' name='important' onChange={handleInput} value='false' labelText='No' checked={newNote.important == 'false'}/>
              <Input type='radio' id='importantTrue' name='important' onChange={handleInput} value='true' labelText='Yes' checked={newNote.important == 'true'}/>
            </div>
          </div>

          <Button text='Add new note' extraClasses='formButton'/>
      </Form>
    </div>
  )
};

export { NotesForm };
