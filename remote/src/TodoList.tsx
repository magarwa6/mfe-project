
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: todos.length + 1,
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleFilterChange = (newFilter:any) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div className="inputWrapper">
      <input
        type="text"
        placeholder="Add Todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className='button' onClick={addTodo}>Add</button>
</div>
      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('active')}>Active</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
      <ul>
      {filteredTodos && filteredTodos.length > 0 ? filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      )) : <div className='info'> No Todo found!!! </div>}
        
      </ul>
    </div>
  );
};

export default TodoList;
