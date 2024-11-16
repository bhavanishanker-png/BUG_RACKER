
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bg_img } from '../assets/assets';// Mock data for tasks
const initialTasks = [
    { id: 1, title: 'Fix login bug', description: 'Users unable to log in', priority: 'High', status: 'In Progress', assignee: 'John Doe', date: '2023-05-15', timeSpent: 120 },
    { id: 2, title: 'Implement new feature', description: 'Add dark mode', priority: 'Medium', status: 'To Do', assignee: 'Jane Smith', date: '2023-05-20', timeSpent: 0 },
];

export default function Dashboard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const priorityOrder = ['High', 'Medium', 'Low']; // Custom priority order
    const statusOrder = ['To Do', 'In Progress', 'Done']; // Custom status order
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const filteredTasks = tasks
        .filter(task =>
            (filter === '' || task.priority.toLowerCase() === filter.toLowerCase() || task.status.toLowerCase() === filter.toLowerCase()) &&
            (task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search))
        )
        .sort((a, b) => {
            if (sort === 'priority') {
                return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
            } else if (sort === 'status') {
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
            }
            return 0;
        });

    const handleCreateTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
        setShowForm(false);
        toast.success('Task Created Successfully!');
    };

    const handleEditTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === editingTask.id ? { ...updatedTask, id: task.id } : task));
        setEditingTask(null);
        setShowForm(false);
        toast.success('Task Updated Successfully!');
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.error('Task Deleted!');
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: {bg_img} }}>
            <ToastContainer />
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">Bug Tracker</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"  >
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        {/* Search Input */}
                        <div className="w-full md:w-auto">
                            <label htmlFor="search" className="block md:inline-block mr-2 text-sm font-medium text-gray-700">
                                Search:
                            </label>
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                className="mt-1 block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                placeholder="Search tasks..."
                            />
                        </div>

                        {/* Filter, Sort, and Button */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            {/* Filter Dropdown */}
                            <div className="w-full md:w-auto">
                                <label htmlFor="filter" className="block md:inline-block mr-2 text-sm font-medium text-gray-700">
                                    Filter:
                                </label>
                                <select
                                    id="filter"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="mt-1 block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">All</option>
                                    <option value="high">High Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="low">Low Priority</option>
                                    <option value="to do">To Do</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="w-full md:w-auto">
                                <label htmlFor="sort" className="block md:inline-block mr-2 text-sm font-medium text-gray-700">
                                    Sort by:
                                </label>
                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="mt-1 block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">None</option>
                                    <option value="priority">Priority</option>
                                    <option value="status">Status</option>
                                </select>
                            </div>

                            {/* Create Task Button */}
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>


                    {(showForm || editingTask) && (
                        <div className="mb-4">
                            <TaskForm
                                taskToEdit={editingTask}
                                onSubmit={editingTask ? handleEditTask : handleCreateTask}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingTask(null);
                                }}
                            />
                        </div>
                    )}

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {filteredTasks.map((task) => (
                                <li key={task.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {task.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>Assigned to: {task.assignee}</p>
                                            <p>Date: {task.date}</p>
                                            <p>Time Spent: {task.timeSpent} minutes</p>
                                        </div>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingTask(task);
                                                    setShowForm(true);
                                                }}
                                                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-400 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
