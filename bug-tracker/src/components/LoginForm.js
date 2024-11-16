import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on each login attempt

    // Mock credentials
    const mockCredentials = {
      username: 'admin',
      password: 'password',
    };

    // Example of calling an API to authenticate (this can be a fetch or axios call to your backend)
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const data = await response.json();

    // Mock validation (you can replace this with your real API response logic)
    if (username === mockCredentials.username && password === mockCredentials.password) {
      localStorage.setItem('user', JSON.stringify({ username })); // Save user data in local storage
      navigate('/dashboard'); // Navigate to the dashboard page after successful login
    } else {
      setError('Invalid credentials'); // Show error if credentials do not match
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Bug Tracker Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log In
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Use the following credentials to log in:</p>
        <p><strong>Username:</strong> admin</p>
        <p><strong>Password:</strong> password</p>
      </div>
    </div>
  );
}
