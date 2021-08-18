import React from 'react';
import './Note.css';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  date: Date;
  important: boolean;
  handleDelete: (id: any) => () => void;
}

const Note = ({ id, title, content, date, important, handleDelete }: NoteProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{content}</td>
      <td>{date.toISOString()}</td>
      <td>{important ? 'true' : 'false'}</td>
      <td>
        <button className="deleteNote" onClick={handleDelete(id)}>
          &times;
        </button>
      </td>
    </tr>
  );
};

export { Note };
