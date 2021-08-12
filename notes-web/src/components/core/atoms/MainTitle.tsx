import React from 'react';
import './MainTitle.css';

export const MainTitle = ({ extraClasses, text }: any) => {
  const classes = 'mainTitle '.concat(extraClasses);
  return <h1 className={classes}>{text}</h1>;
};
