/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.css';
import { getKanjiData } from '../../../api/detail';

function MainPage() {
  const { id } = useParams();
  const [kanji, setKanji] = useState([]);
  try {
    useEffect(() => {
      getKanjiData({ 
        kanji_id: id,
      }).then((res) => {
        setKanji(res.data);
        console.log(res.data)
      }).catch((error) => console.log(error.response.request.response))
    }, [])
  }
  catch (e) { console.error(e) }
  return (
    <div className='main-container'>
      <div className='main-content'>
      </div>
    </div>
    )
} 
export default MainPage