import React from 'react';

const AddTodo = ({ handleChange, handleKeyDown, ...props }) => {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus={true}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default AddTodo;
