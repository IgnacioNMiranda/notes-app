import React, { useState } from 'react';
import { IResponseNote } from '../../../../../interfaces/IResponseNote';
import { Button } from '../../../atoms/Button';
import { Note } from '../Note/Note';
import './NotesTable.css';

interface NotesTableProps {
  notes: IResponseNote[];
  deleteNote: (id: any) => () => void;
}

const NotesTable = ({ notes, deleteNote }: NotesTableProps) => {
  const [showImportants, setShowImportants] = useState(false);

  const changeImportantFilter = () => {
    setShowImportants(!showImportants);
  };

  const mappedNotes = notes
    .filter((note: any) => (showImportants ? note.important : true))
    .map((note: any) => (
      <Note
        key={note._id}
        id={note._id}
        title={note.title}
        content={note.content}
        date={note.date}
        important={note.important}
        handleDelete={deleteNote}
      />
    ));

  return (
    <>
      {
        <div className="tableWraper">
          <Button
            extraClasses="showImportantsButton"
            text={showImportants ? 'Show all' : 'Show importants'}
            onClick={changeImportantFilter}
          />
          {mappedNotes.length === 0 ? (
            <p className="noNotes">No hay notas que mostrar.</p>
          ) : (
            <table className="notesTable">
              <thead className="notesHeader">
                <tr>
                  <th colSpan={1}>Title</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Important</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="notesBody">{mappedNotes}</tbody>
            </table>
          )}
        </div>
      }
    </>
  );
};

export { NotesTable };
