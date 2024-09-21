"use client";
import React, { useState, useEffect } from 'react';
import TodoItem from './todoIitem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const res = await fetch(`/api/todos/${updatedTodo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    if (res.ok) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchTodos();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add
          </button>
        </div>
      </form>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Completed
        </button>
      </div>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={() => deleteTodo(todo.id)} />
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-600">
        {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
      </div>
    </div>
  );
};

export default TodoList;
