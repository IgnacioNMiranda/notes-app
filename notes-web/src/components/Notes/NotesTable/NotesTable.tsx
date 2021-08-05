import React from "react";
import IResponseGetNote from "../../../interfaces/IResponseGetNote";
import { Note } from '../Note/Note';
import './NotesTable.css';

interface NotesTableProps {
  notes: IResponseGetNote[],
  showImportants: boolean,
  handleClick: () => void,
  handleDeleteAction: (id: any) => () => void,
}

const NotesTable = ({ notes, showImportants, handleClick, handleDeleteAction}: NotesTableProps) => {
  const mappedNotes = notes
    .filter((note: any) => showImportants ? note.important : true)
    .map(
      (note: any) => <Note key={note._id} id={note._id} title={note.title} content={note.content} date={note.date} important={note.important} handleDeleteAction={handleDeleteAction}/>
    );

  return (
    <>
    {
      <div className='tableWraper'>
        <button className='showImportantsButton' onClick={handleClick}>{showImportants ? 'Show all': 'Show importants'}</button>
        {
          mappedNotes.length === 0
          ? <p className='noNotes'>No hay notas que mostrar.</p>
          : <table className="notesTable">
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
        }
      </div>
    }
    </>
  );
};

export {  NotesTable };
