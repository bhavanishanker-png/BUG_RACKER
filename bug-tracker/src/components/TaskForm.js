import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, onCancel, taskToEdit }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    assignee: '',
    date: '',
    timeSpent: 0,
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
    
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div>
        <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={task.title}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={task.description}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label htmlFor="priority" className="block font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            id="priority"
            value={task.priority}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="w-1/2 pl-2">
          <label htmlFor="status" className="block font-medium text-gray-700">Status</label>
          <select
            name="status"
            id="status"
            value={task.status}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="assignee" className="block font-medium text-gray-700">Assignee</label>
        <input
          type="text"
          name="assignee"
          id="assignee"
          value={task.assignee}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label htmlFor="date" className="block font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={task.date}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-1/2 pl-2">
          <label htmlFor="timeSpent" className="block font-medium text-gray-700">Time Spent (minutes)</label>
          <input
            type="number"
            name="timeSpent"
            id="timeSpent"
            value={task.timeSpent}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {taskToEdit ? 'Update Task' : 'Create Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
