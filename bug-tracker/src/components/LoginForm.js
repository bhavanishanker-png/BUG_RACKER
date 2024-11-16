import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Adjust the path to your image
import { loginsideimage } from '../assets/assets';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on each login attempt

    // Mock credentials
    const mockCredentials = {
      email: 'admin@gmail.com',
      password: 'password',
    };

    // Mock validation (you can replace this with your real API response logic)
    if (email === mockCredentials.email && password === mockCredentials.password) {
      localStorage.setItem('user', JSON.stringify({ email })); // Save user data in local storage
      navigate('/dashboard'); // Navigate to the dashboard page after successful login
    } else {
      setError('Invalid credentials'); // Show error if credentials do not match
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-5xl">
        {/* Side Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginsideimage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-lg border-r border-gray-300"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b border-gray-300 pb-3">
            Bug Tracker Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Use the following credentials to log in:</p>
            <p>
              <strong>Email:</strong> admin@gmail.com
            </p>
            <p>
              <strong>Password:</strong>password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
