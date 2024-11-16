import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import other components
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
