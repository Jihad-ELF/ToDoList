import React,{useState} from 'react';
import './AddTaskModal.css';
import { MdOutlineCategory } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";//work icon
import { FaBookOpen } from "react-icons/fa";//study icon
import { IoMdBicycle } from "react-icons/io";//sport icon
import { MdTextsms } from "react-icons/md";//social icon
import { GiMeditation } from "react-icons/gi";//meditation
import { GiWhiteBook } from "react-icons/gi";//book icon
import { Button } from './components/Button';
import {Todo} from './TodoList';

//tailwindcss style classes
const hoverStyle= 'hover:bg-white hover:text-violet-600 rounded-xl px-2 m-2'; 
const iconCategoryStyle='bg-purple-500 text-gray-900 rounded text-lg mt-3 mb-3 p-0.5' ;
const iconTaskStyle='bg-purple-500 text-gray-900 rounded text-lg mt-3 mb-3 p-0.5';
// Types for the props of the AddTaskModal component
interface AddTaskModalProps {
    onClose: () => void; // Assuming onClose is a function with no arguments
    onAddTask: (task: Todo) => void;
  }

// Define functional component AddTaskModal with props isOpen, onClose, and message
export default function AddTaskModal({onClose,onAddTask}:AddTaskModalProps){
    
    // State to keep track of the selected category
    const [selectedCategory, setSelectedCategory] = useState<number|null>(null);
    const [taskName,setTaskName]=useState('');
    //  category data
    const categories= [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Study' },
        { id: 3, name: 'Sport' },
        { id: 4, name: 'Social' },
        { id: 5, name: 'Meditation' },
        { id: 6, name: 'Books' }
        ];
    const handleAddTask= async ()=>{
        if(selectedCategory!==null && taskName.trim() !== ''){
            // Initialize taskIcon to null
            let taskIcon: React.ReactElement | undefined
            // Determine the icon based on the selected category
            switch(selectedCategory){
                case 1:
                    taskIcon= <MdWorkOutline className={iconTaskStyle}/>//work icon
                    break;
                case 2:
                    taskIcon= <FaBookOpen className={iconTaskStyle}/>//study icon
                    break;
                case 3:
                    taskIcon= <IoMdBicycle className={iconTaskStyle}/>//sport icon
                    break;
                case 4:
                    taskIcon= <MdTextsms className={iconTaskStyle}/>//social icon
                    break;
                case 5:
                    taskIcon= <GiMeditation className={iconTaskStyle}/>//meditation icon
                    break;
                case 6:
                    taskIcon= <GiWhiteBook className={iconTaskStyle}/>//book icon
                    break;
                default:
                    taskIcon = undefined
                    break;
            }
            //make a post request to add the new task
            const response=await fetch('/todos', {
                method:'POST',
                body: JSON.stringify({
                    name:taskIcon,
                    description: taskName,
                    completed: false
                })
            })
            // Check if the request was successful
            if (response.ok) {
                await response.json(); // Parse the response data

                // Check if the taskIcon is not null before adding it to todos
                if(taskIcon){
                    // Add the new task to the todos list with the concatenated icon and task description
                    onAddTask({id:categories[selectedCategory-1].id ,icon: taskIcon, description: taskName, completed:false });
                    // Reset input and selected category
                    setTaskName('');
                    setSelectedCategory(null);
                    // Close the modal
                    onClose();
                }
            }
    };
    //function to handle input focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.removeAttribute('placeholder'); // Remove placeholder text when input is focused
    }
    // Function to handle category click events
    const handleCategoryClick = (id:number) => {
        setSelectedCategory(id); // Update the selected category
    };
    //function to handle the styling of the clicked category
    const styleClickedCategory = (id:number) => {
        // Check if the category is selected
        return selectedCategory === id ? 'bg-white text-violet-600 rounded-xl px-2' : ''; // Applied style for selected category       
    };

    
    return(
        <div className= 'fixed top-0 left-0 flex items-start justify-center w-full h-full bg-black bg-opacity-100'>
            <div>
                <h2 className='my-3'>Add New Task</h2>
                <input
                    className='border-yellow-500 rounded text-white px-6 py-2 border-2 bg-transparent '
                    type='text'
                    onFocus={handleFocus}
                    value={taskName}
                    onChange={(e)=>setTaskName(e.target.value)}
                    placeholder='Enter a task name'
                />
                {/* Category selection */}
                <div className='mt-10 ml-5 flex items-center '>
                    <MdOutlineCategory className='text-xl text-yellow-500'/>
                    <div>Select a Category :</div>
                </div>
                {/* Category selection */}
                <div className='cursor-pointer'>
                    {/* Render each category */}
                    {categories.map((category) => (
                        <div
                            key={category.id} // Unique key for each category
                            className={`flex items-center ${hoverStyle} ${styleClickedCategory(category.id)}`} // Apply hover style dynamically
                            onClick={() => handleCategoryClick(category.id)} // Handle click event for category
                        >
                            {/* Category icon */}
                            {category.id === 1 && <MdWorkOutline className={iconCategoryStyle}/>}
                            {category.id === 2 && <FaBookOpen  className={iconCategoryStyle} />}
                            {category.id === 3 && <IoMdBicycle  className={iconCategoryStyle} />}
                            {category.id === 4 && <MdTextsms  className={iconCategoryStyle}/>}
                            {category.id === 5 && <GiMeditation  className={iconCategoryStyle}/>}
                            {category.id === 6 && <GiWhiteBook  className={iconCategoryStyle} />}
                            {/* Category name */}
                            <span className='pl-3'>{category.name}</span>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center my-10 font-bold '>
                    <div>
                        <Button type='canceling' onClick={onClose} size='lg'>Cancel</Button>
                    </div>
                    <div>
                        <Button type='confirming' onClick={handleAddTask} size='lg'>Confirm</Button>
                    </div>
                </div>
            </div>
        </div>
       
    );
}}