'use client';

import { useState, FormEvent } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-center text-gray-600 mb-6">Masuk sebagai administrator sistem </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username Admin</label>
            <div className="flex items-center bg-gray-200 rounded-md">
              <span className="px-3 py-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Masukan Username Admin" 
                className="w-full py-2 px-3 bg-gray-200 rounded-r-md focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center bg-gray-200 rounded-md">
              <span className="px-3 py-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="Masukan Password" 
                className="w-full py-2 px-3 bg-gray-200 rounded-r-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-5 text-sm text-gray-500">
            <a href="#" className="text-gray-500 hover:underline">Lupa Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Masuk Sebagai Admin
          </button>
        </form>
      </div>
    </div>
  );
}