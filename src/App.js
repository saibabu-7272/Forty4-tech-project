import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard/Dashboard';
import UserDetails from './components/UserDetails/UserDetails';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users/:userId" element={<UserDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
