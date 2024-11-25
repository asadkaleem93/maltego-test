'use client';

import React from 'react';
import './style.css';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
}

export const InputField: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  id,
}) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        id={id}
        className="styled-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Enter text here...'}
      />
    </div>
  );
};
