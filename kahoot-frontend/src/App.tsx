import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import DashBoard from './pages/Home/DashBoard';
import Library from './pages/Home/Library';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/my-library" element={<Library />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
