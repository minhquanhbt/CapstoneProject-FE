import React from 'react';
// import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from '../pages/main_page';
import Login from '../pages/login';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App;