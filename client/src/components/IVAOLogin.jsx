import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IVAOLogin = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pilotData, setPilotData] = useState(null);
  const [token, setToken] = useState(null);

  const API_BASE_URL = 'http://localhost:3300';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/connect`);
      window.location.href = response.data;
    } catch (err) {
      setError('Failed to initialize login. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCallback = async (code) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/callback?code=${code}`);
      setToken(response.data.token);
      setPilotData(response.data.pilotSummary);
      localStorage.setItem('ivaoToken', response.data.token.access_token);
      window.history.replaceState({}, document.title, window.location.pathname);
      onLoginSuccess();
    } catch (err) {
      setError('Failed to complete authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <h1 style={{ 
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          IVAO Authentication
        </h1>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ color: 'red', padding: '20px' }}>
            {error}
            <button 
              onClick={() => setError(null)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              Try Again
            </button>
          </div>
        ) : pilotData ? (
          <div>
            <div style={{ 
              backgroundColor: '#f0f9ff', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontWeight: '500', marginBottom: '8px' }}>
                Authentication Successful
              </h3>
              <p style={{ color: '#4b5563', fontSize: '14px' }}>
                Token Type: {token.token_type}<br />
                Expires In: {token.expires_in} seconds
              </p>
            </div>
            
            <div style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px', 
              padding: '16px'
            }}>
              <h3 style={{ fontWeight: '500', marginBottom: '8px' }}>
                Pilot Summary
              </h3>
              <pre style={{ 
                backgroundColor: '#f9fafb', 
                padding: '8px', 
                borderRadius: '4px',
                fontSize: '14px',
                overflow: 'auto'
              }}>
                {JSON.stringify(pilotData, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ marginBottom: '16px' }}>Click below to authenticate with IVAO</p>
            <button
              onClick={handleLogin}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Connect to IVAO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IVAOLogin;