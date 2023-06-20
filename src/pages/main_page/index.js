/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.css';
import VocabulariesList from './cards';
import test from '../../icon/test.png';
import exam from '../../icon/exam.png';
import Quiz from '../../pages/quiz';

function MainPage() {
  return (
    <div className='main-container'>
      <div className='left-sidebar'>
        <div className='imp-links'>
          <a href='/'><img src={exam}/>Kiểm tra năng lực</a>
          <a href='/'><img src={test}  />Thi thử</a>
        </div>
      </div>
      <div className='main-content'>
        <VocabulariesList className='list-card'/>
      </div>
      
      
      <div className='right-sidebar'>
      {localStorage['user-info']?<Quiz></Quiz>:<div></div>}
      </div>
    </div>
    )
} 
export default MainPage