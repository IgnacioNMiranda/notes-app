import React from 'react';
import './Button.css';

export const Button = ({ extraClasses = '', text, onClick = undefined }: any) => {
  const className = 'defaultButton'.concat(` ${extraClasses}`);

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
