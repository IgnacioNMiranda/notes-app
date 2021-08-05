import React from "react";
import './NotesForm.css';

const NotesForm = ({addNewNote, handleInput, newNote}: any) => {
  return (
    <div className="notesFormWrap">
      <h3 className="headerFormTitle">New note</h3>
      <form onSubmit={addNewNote}>
        <div className="formInput textInput">
          <input type="text" name='title' onChange={handleInput} value={newNote.title} placeholder="Title"/>
        </div>
        <div className="formInput textInput">
          <input type="text" name='content' onChange={handleInput} value={newNote.content} placeholder='Content'/>
        </div>
        <div className='formInput radioInput'>
          <label>Is it an important note?</label>
          <div id='important' className='radioOptions'>
            <input type="radio" id='importantFalse' name='important' value='false' onChange={handleInput} checked={newNote.important == 'false'}/>
            <label htmlFor="importantFalse">No</label>
            <input type="radio" id='importantTrue' name='important' value='true' onChange={handleInput} checked={newNote.important == 'true'}/>
            <label htmlFor="importantTrue">Yes</label>
          </div>
        </div>
        <button>Add new note</button>
      </form>
    </div>
  )
};

export { NotesForm };
