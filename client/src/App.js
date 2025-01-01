import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IVAOLogin from './components/IVAOLogin.jsx';


const MainApp = () => {
  return (
    <div>
      <h1>Welcome to IVAO ATC Booking</h1>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ivaoToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <IVAOLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/api/auth/callback" element={<IVAOLogin onLoginSuccess={() => setIsAuthenticated(true)} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;