import React from "react";
import './Form.css';

export const Form = ({ children, onSubmit, title }: any) => {
  return (
    <>
      <h3 className="formTitle">{title}</h3>
      <form onSubmit={onSubmit}>
        { children }
      </form>
    </>
  )
};
