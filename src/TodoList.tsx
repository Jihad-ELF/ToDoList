import './App.css';
import { IoFilterSharp } from "react-icons/io5";//filter icon
import { FaCheck } from "react-icons/fa";//check icon
import React, { useState, JSXElementConstructor} from 'react';
import AddTaskModal from './AddTaskModal';
import TodayDate from './lib/getDate';
import { FaClipboardList } from "react-icons/fa";
import { Button } from './components/Button';

const completedTaskStyle = 'line-through text-gray-500'; // Text decoration line-through and color gray
// Define the type for a todo item
export type Todo = {
    id: number,
    name: React.ReactElement<any, string | JSXElementConstructor<any>>,//This indicates that the React element can accept either a string or a JSX element constructor.
    description: string, 
    completed: boolean
}
//keep outside function because it doesn't change(so avoid re-rendering React)
const {month, day, dayName, year } = TodayDate(); // Call the TodayDate function to get date information

type Status = 'all' |'pending'|'completed'

function TodoList(): JSX.Element { // Specify return type as JSX.Element for functional component
    const [todos,setTodos]=useState<Array<Todo>>([]);//initialize state of todos list with Todo type
    const [showModal,setShowModal]=useState(false);// Initialize state for modal visibility
    const [showFilterDropdown, setShowFilterDropdown] = useState(false); // State variable for filter dropdown visibility
    const [filterStatus,setFilterStatus]=useState<Status>('all'); // Initialize state for filter status with union type

    //Handle to add a new task
    const handleAddTask=(task: Todo):void=>{
        setTodos([...todos,{id:todos.length+1,name:task.name, description:task.description, completed:false}]);//add the new task to the todos list
        setShowModal(false);//close modal ater the task is added
    }
    // Handler to toggle the completed status of a task
    const handleTaskClick=(id: number):void=>{
        setTodos(todos.map(todo=>
            todo.id===id ? {...todo,completed:!todo.completed}:todo // Toggle the completed status of the clicked task
        ));
    }
    // Handler to filter todos based on status
    const handleFilter=(status:Status):void=>{
        setFilterStatus(status); // Update the filter status based on user choice
        setShowFilterDropdown(false); // Hide the filter dropdown after selecting an option
    }
    // Filter todos based on the selected filter status
    const filteredTodos=filterStatus==='completed' ? todos.filter(todo=>todo.completed):
                        filterStatus==='pending'?todos.filter(todo=>!todo.completed):
                        todos;// Filter the todos based on the showCompleted state

    return( 
        <div id='App' className="relative h-screen w-screen bg-black text-white overflow-auto" >
            <div className='relative bg-yellow-500 pt-3 pb-20 px-6'>
                <h1 className='flex justify-center font-bold text-3xl'>TO DO LIST</h1>
                <div id='dateInformation' className=' flex justify-between'>
                    <div id='date' className='flex items-center '>
                        <div id='todayDate' className='flex flex-col items-center mr-2 font-bold text-6xl text-'>{day}</div>{/**flex class) to arrange the two columns side by side. */}
                        <div  className='flex flex-col font-semibold'>
                            <div id='month' className='text-xl'>{month}</div>
                            <div className=' text-lg'>{year}</div>
                        </div>
                    </div>
                    <div className='flex items-end text-lg font-semibold'>{dayName}</div>
                </div>
            </div>
            {/**translate is to center the div since it's positioned relatively */}
            <div className="overflow-y-auto max-h-80vh absolute top-0 left-0 translate-x-1/2 bg-black py-4 mt-32 w-1/2 rounded-xl shadow-md shadow-yellow-100">
                {/**the filter icon and the choices inside it */}
                <div className='sticky top-0 z-50 bg-black py-2 inset-x-0 '>{/**z-50 class ensures that the filter bar stays on top of other content*/}
                    <div className='flex justify-end pr-4 mb-4 text-xl'>
                        <Button type='filtering' size='lg' onClick={() => setShowFilterDropdown(!showFilterDropdown)} >
                            <IoFilterSharp onClick={() => setShowFilterDropdown(!showFilterDropdown)}/> {/* Icon for show filter dropdown */}
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
                    {/* Check if todos array is empty */}
                    {!filteredTodos.length ? (
                        <div className='flex flex-col justify-center items-center text-white '>
                            <div className='text-2xl mb-8 mt-16'><FaClipboardList/></div>
                            <div className='text-xl font-bold'>No Tasks</div>
                            <div className='text-sm font-light'>There are no upcoming tasks</div>
                        </div>
                    ):(
                        <ul className="todos ml-2">
                        {filteredTodos.map((todo) => (
                            <li key={todo.id} onClick={() => handleTaskClick(todo.id)} className={`cursor-pointer flex flex-row items-center justify-center mb-2 border-b border-solid-bold pb-2 ${todo.completed ? 'completedTaskStyle' : ''} flex flex-row items-center justify-center mb-2 border-b border-solid-bold pb-2`}>
                                {/* Render the icon here */}
                                {todo.name}
                                {/* Render the task description  */}
                                {/*flex-grow class is applied to the task name div to allow it to grow and occupy the available space within the parent container*/}
                                <div className={`break-all ml-2 ${todo.completed ? completedTaskStyle : ''}`} onClick={() => handleTaskClick(todo.id)}>{todo.description}</div>
                                {/* Render the check icon */}
                                <div className="relative ml-auto mt-2 flex justify-center items-center mr-9">
                                    <div className="absolute inset-x-0 mb-1 mr-4 w-6 h-6 rounded-full bg-white bg-opacity-15 flex items-center justify-center"> </div>
                                    {todo.completed && <FaCheck className="absolute inset-x-0 m-auto ml-1 mr-4 flex justify-center items-center text-green-600"/>}
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                    
                </div>
            </div>

            {/**ADD Button */}
            <div className='fixed bottom-0 left-0 right-0 flex justify-center font-bold '>
                <Button type='adding' onClick={()=>setShowModal(true)}>+</Button>
            </div>
            {showModal &&(
                <AddTaskModal onClose={()=>setShowModal(false)} onAddTask={handleAddTask}/>
            )}
        </div>
    );
}
export default TodoList;