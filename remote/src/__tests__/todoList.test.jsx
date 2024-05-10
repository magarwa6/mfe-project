import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList', () => {
  it.only('renders the input and initial todo list', () => {
    render(<TodoList />);
    
    // Verify that the input element is rendered
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    expect(inputElement).toBeInTheDocument();
    
    // Verify that the initial todo list is empty
    const todoItems = screen.queryAllByRole('checkbox');
    expect(todoItems).toHaveLength(0);
  });

  test('adds a new todo when the input value changes and Enter key is pressed', () => {
    render(<TodoList />);
    
    // Type a new todo in the input
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    fireEvent.change(inputElement, { target: { value: 'New todo item' } });
    
    // Press Enter key to add the new todo
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });
    
    // Verify that the new todo is added to the list
    const todoItems = screen.getAllByRole('checkbox');
    expect(todoItems).toHaveLength(1);
    
    // Verify that the new todo description is correct
    const todoDescription = screen.getByText('New todo item');
    expect(todoDescription).toBeInTheDocument();
  });

  // Write additional test cases for other functionality, such as toggling todo status and filtering todo list
});

