import React from 'react';
// import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from '../pages/main_page';
import Login from '../pages/login';
import Register from '../pages/register';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  )
}

export default App;