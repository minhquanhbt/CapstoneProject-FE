import React from 'react';
// import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from '../pages/main_page';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
  )
}

export default App;