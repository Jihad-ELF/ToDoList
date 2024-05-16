import React, { useState, useEffect } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import { FaCheck, FaClipboardList } from "react-icons/fa";
import { Button } from './components/Button';

const completedTaskStyle = 'line-through text-gray-500'; // Style for completed tasks

export type Todo = {
    id: number,
    icon: JSX.Element,
    description: string,
    completed: boolean
}

type Status = 'all' | 'pending' | 'completed'; // Union type for filter status

function TodoList(): JSX.Element {
    const [todos, setTodos] = useState<Todo[]>([]); // State for todos
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [showFilterDropdown, setShowFilterDropdown] = useState(false); // State for filter dropdown visibility
    const [filterStatus, setFilterStatus] = useState<Status>('all'); // State for filter status

    useEffect(() => {
        fetchTodos(); // Fetch todos when component mounts
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('/todos'); // Fetch todos from server
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json(); // Parse response JSON
            setTodos(data); // Update todos state
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (newTodo: Todo) => {
        try {
            const response = await fetch('/todos', { // Send POST request to add new todo
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            fetchTodos(); // Fetch updated todos
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleTaskClick = async (id: number) => {
        const updatedTodos = todos.map(todo => // Update completion status of todo locally
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos); // Update todos state
    };

    const handleFilter = (status: Status) => {
        setFilterStatus(status); // Update filter status
        setShowFilterDropdown(false); // Hide filter dropdown
    };

    const filteredTodos = filterStatus === 'completed' ? todos.filter(todo => todo.completed) :
        filterStatus === 'pending' ? todos.filter(todo => !todo.completed) :
            todos; // Filter todos based on status

    return (
        <div id='App' className="relative h-screen w-screen bg-black text-white overflow-auto" >
            <div className='relative bg-yellow-500 pt-3 pb-20 px-6'>
                <h1 className='flex justify-center font-bold text-3xl'>TO DO LIST</h1>
            </div>
            <div className="overflow-y-auto max-h-80vh absolute top-0 left-0 translate-x-1/2 bg-black py-4 mt-32 w-1/2 rounded-xl shadow-md shadow-yellow-100">
                <div className='sticky top-0 z-50 bg-black py-2 inset-x-0 '>
                    <div className='flex justify-end pr-4 mb-4 text-xl'>
                        <Button type='filtering' size='lg' onClick={() => setShowFilterDropdown(!showFilterDropdown)} >
                            <IoFilterSharp onClick={() => setShowFilterDropdown(!showFilterDropdown)} />
                            {showFilterDropdown && (
                                <div className="absolute right-0 mt-10 w-40 text-black text-sm bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                                    <ul>
                                        <li className="cursor-pointer py-2 px-4 hover:bg-gray-500 rounded-lg" onClick={() => handleFilter('all')}>All</li>
                                        <li className="cursor-pointer py-2 px-4 hover:bg-gray-500 rounded-lg" onClick={() => handleFilter('completed')}>Completed</li>
                                        <li className="cursor-pointer py-2 px-4 hover:bg-gray-500 rounded-lg" onClick={() => handleFilter('pending')}>Pending</li>
                                    </ul>
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
                <div className="todos  ">
                    {!filteredTodos.length ? (
                        <div className='flex flex-col justify-center items-center text-white '>
                            <div className='text-2xl mb-8 mt-16'><FaClipboardList /></div>
                            <div className='text-xl font-bold'>No Tasks</div>
                            <div className='text-sm font-light'>There are no upcoming tasks</div>
                        </div>
                    ) : (
                        <ul className="todos ml-2">
                            {filteredTodos.map((todo) => (
                                <li key={todo.id} onClick={() => handleTaskClick(todo.id)} className={`cursor-pointer flex flex-row items-center justify-center mb-2 border-b border-solid-bold pb-2 ${todo.completed ? completedTaskStyle : ''} flex flex-row items-center justify-center mb-2 border-b border-solid-bold pb-2`}>
                                    {todo.icon}
                                    <div className={`break-all ml-2 ${todo.completed ? completedTaskStyle : ''}`} onClick={() => handleTaskClick(todo.id)}>{todo.description}</div>
                                    <div className="relative ml-auto mt-2 flex justify-center items-center mr-9">
                                        <div className="absolute inset-x-0 mb-1 mr-4 w-6 h-6 rounded-full bg-white bg-opacity-15 flex items-center justify-center"> </div>
                                        {todo.completed && <FaCheck className="absolute inset-x-0 m-auto ml-1 mr-4 flex justify-center items-center text-green-600" />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 flex justify-center font-bold '>
                <Button type='adding' onClick={() => setShowModal(true)}>+</Button>
            </div>
        </div>
    );
}

export default TodoList;
