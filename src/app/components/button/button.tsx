import React from 'react';
import './style.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
  id?: string;
}

// CREATED A RE-USEABLE COMPONENT BUT THEN LATER ADDED ANTD LIBRARY
export const Button: React.FC<ButtonProps> = ({ onClick, label, id }) => {
  return (
    <button id={id} className="styled-button" onClick={onClick}>
      {label}
    </button>
  );
};
