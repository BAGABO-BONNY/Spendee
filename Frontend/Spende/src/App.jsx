import React from 'react'
import { BrowserRouter as Router , Routes, Route, Link, redirect, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/signUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';

const App = () => {
  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<Root />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
const Root = () => {
  //check if token is present in local storage
  const isAuthenticated = localStorage.getItem("token");
  //redirect to dashboard if token is present else redirect to login
  return isAuthenticated ?(
   < Navigate to="/dashboard" />
  ):(
    < Navigate to="/login" />
  );
};