import React from "react";
import { NoteService } from '../../../services/note.service';
import './Note.css';

interface NoteProps {
  id: string,
  title: string,
  content: string,
  date: Date,
  important: boolean,
  handleDeleteAction: (id: any) => () => void,
}

const Note = ({id, title, content, date, important, handleDeleteAction}: NoteProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{content}</td>
      <td>{date.toISOString()}</td>
      <td>{important ? 'true' : 'false'}</td>
      <td><button className='deleteNote' onClick={handleDeleteAction(id)}>X</button></td>
    </tr>
  )
};

export { Note };
