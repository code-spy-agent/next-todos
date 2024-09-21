"use client";

import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const toggleComplete = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  const handleEdit = () => {
    if (isEditing) {
      onUpdate({ ...todo, title: editedTitle });
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 p-3 rounded-lg transition duration-200 hover:bg-gray-200">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="mr-2 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={handleKeyPress}
            className="flex-grow p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            } cursor-pointer`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2 transition duration-200"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none transition duration-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
