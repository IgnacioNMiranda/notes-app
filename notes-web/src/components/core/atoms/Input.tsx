import React from 'react';
import './Input.css';

const classesByInputType = {
  radio: 'radioInput',
  text: 'genericInput',
  email: 'genericInput',
  password: 'genericInput',
};

interface InputProps {
  type?: 'radio' | 'text' | 'email' | 'password';
  id?: string | undefined;
  name: string;
  onChange: ({ target: { name, value } }: any) => void;
  value: any;
  labelText?: string;
  placeholder?: string;
  checked?: boolean;
}

const Input = ({
  type = 'text',
  id = undefined,
  name,
  labelText = '',
  placeholder = '',
  onChange,
  value,
  checked = false,
}: InputProps) => {
  const classes = 'inputWrap'.concat(` ${classesByInputType[type]}`);

  let label = null;
  if (type === 'radio') {
    label = <label htmlFor={id}>{labelText}</label>;
  }

  return (
    <div className={classes}>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        checked={checked}
      />
      {label}
    </div>
  );
};

export { Input };
