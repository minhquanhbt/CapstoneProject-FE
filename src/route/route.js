import React from 'react';
// import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from '../pages/main_page';
import KanjiDetail from '../pages/detail/kanji';
import VocabularyDetail from '../pages/detail/vocabulary';
import Login from '../pages/login';
import Register from '../pages/register';
import VerifyEmail from '../pages/verify';
import Test from '../pages/test';
import Exam from '../pages/exam';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/detail/kanji/:id" element={<KanjiDetail/>} />
          <Route path="/detail/vocabulary/:id" element={<VocabularyDetail/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/exam" element={<Exam/>} />
        </Routes>
      </Router>
  )
}

export default App;