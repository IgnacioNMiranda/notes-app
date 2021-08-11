import React from "react";
import './NoteImage.css';
import note from '../../../resources/svg/note.svg';

export const NoteImage = ({ width = null }: any) => {
  return (
    <img src={note} alt="Note image" width={ width || '200px' }/>
  )
};
