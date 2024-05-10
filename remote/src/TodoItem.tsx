
import React from 'react';

export interface TodoItemProps  {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTodo: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
   
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <div className='todotask'><input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {todo.text} </div>
    </li>
   
  );
};

export default TodoItem;
