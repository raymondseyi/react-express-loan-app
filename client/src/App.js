import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/signup'  element={<Signup/>}/>
      <Route path='/signin'  element={<Signin/>}/>
      <Route path='/dashboard'  element={<Dashboard/>}/>
    </Routes>
    </>
  );
}

export default App;
