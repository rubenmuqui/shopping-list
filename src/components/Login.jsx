import { useState } from 'react';
import { api } from '../services/api';

export function Login({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanName = name.toLowerCase().trim();

    if (!cleanName) {
      setError('Please enter a name.');
      setIsLoading(false);
      return;
    }

    try {
      // Attempt login.
      // USER NOTE: Password '12345678' and suffix '@familia.com' are hardcoded for simplicity.
      await api.login(`${cleanName}@familia.com`, '12345678');
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      // Generic message to handle connection or auth errors
      setError('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#000', color: 'white' }}>
      <h2>Welcome</h2>
      <p style={{color: '#888', marginBottom: '20px'}}>Enter your username</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '300px' }}>
        <input 
          type="text" 
          placeholder="Name (e.g. admin, user...)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={isLoading}
          style={{ padding: '15px', fontSize: '16px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#222', color: 'white', textAlign: 'center' }} 
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '15px', background: 'white', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}>
          {isLoading ? 'Loading...' : 'Enter'}
        </button>
      </form>
      
      {error && <div style={{ color: '#ff6b6b', marginTop: '20px', textAlign: 'center', padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '5px' }}>{error}</div>}
      
      <div style={{marginTop: '40px', fontSize: '12px', color: '#555'}}>
        <p>Config required: Create users in PocketBase with email <code>name@familia.com</code> and pass <code>12345678</code></p>
      </div>
    </div>
  );
}