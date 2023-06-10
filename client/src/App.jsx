import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import Layout from './Layout';
import {RegisterPage} from './components/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
