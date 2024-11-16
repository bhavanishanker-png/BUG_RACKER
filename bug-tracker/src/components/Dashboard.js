import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const priorityOrder = ['High', 'Medium', 'Low'];
    const statusOrder = ['To Do', 'In Progress', 'Done'];
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

    const filteredTasks = tasks
        .filter(task =>
            (filter === '' || task.priority.toLowerCase() === filter.toLowerCase() || task.status.toLowerCase() === filter.toLowerCase()) &&
            (task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search))
        )
        .sort((a, b) => {
            if (sort === 'priority') return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
            if (sort === 'status') return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <ToastContainer />
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <h1 className="text-xl font-bold text-indigo-600 flex items-center">Bug Tracker</h1>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md">

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search tasks..."
                    />
                    <div className="flex space-x-4">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Filter by</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                            <option value="to do">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Sort by</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                        </select>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Create Task
                        </button>
                    </div>
                </div>

                {showForm && (
                    <TaskForm
                        taskToEdit={editingTask}
                        onSubmit={editingTask ? handleEditTask : handleCreateTask}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingTask(null);
                        }}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold text-indigo-600">{task.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                            <p className="mt-2 text-sm">
                                <span className="font-semibold">Assigned to:</span> {task.assignee}
                            </p>
                            <p className="mt-1 text-sm">
                                <span className="font-semibold">Date:</span> {task.date}
                            </p>
                            <p className="mt-1 text-sm">
                                <span className="font-semibold">Time Spent:</span> {task.timeSpent} minutes
                            </p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => {
                                        setEditingTask(task);
                                        setShowForm(true);
                                    }}
                                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
