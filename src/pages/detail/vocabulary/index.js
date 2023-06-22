/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.css';
import ExpandingCards from './kanji-card';
import { getVocabularyData } from '../../../api/detail';

function VocabularyDetail() {
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState([]);
  try {
    useEffect(() => {
        getVocabularyData({ 
        vocabulary_id: id,
      }).then((res) => {
        setVocabulary(res.data);
      }).catch((error) => console.log(error.response.request.response))
    }, [])
  }
  catch (e) { console.error(e) }

  const Mean = [];
  if (vocabulary.meaning_vietnamese != undefined) {
    vocabulary.meaning_vietnamese.forEach((meaning) => {
        Mean.push(
            <p className='meaning-item detail'>{meaning.meaning+' '}</p>
        )
        if (meaning.example_vietnamese != undefined) {
            meaning.example_vietnamese.forEach((example)=>{
                Mean.push(
                <div className='example'>
                    <p className='title-example'>Ex:</p>
                    <p className='example-japanese detail'>{example.japanese_example}</p>
                    <p className='example-vietnamese detail'>{example.vietnamese_example}</p>
                </div>
                )
            })
        }
    })
  }
  let hanviet = '';
  if (vocabulary.kanjis != undefined) {
    vocabulary.word.split('').forEach((character) => {
        vocabulary.kanjis.forEach((kanji)=>{
            if(character == kanji.character){     
                hanviet = hanviet+kanji.group+' '
            }
        })
    })
  }

  const content = () =>{
    if ((vocabulary !== null)) {
      return(
        <div className='main-content'>
          <div style={{ width: '100%', float: 'left', marginLeft: '20px' }}>
              <div style={{ width: '75%' }}>
                  <h2>{vocabulary.word}</h2>
                  <table>
                      <tr>
                          <th colspan="2">
                              <b>JLPT : N{vocabulary.level}</b>
                          </th>
                      </tr>
                      <tr className='pronounce'>
                          <th>Cách đọc:</th>
                          <td className='detail'>{hanviet} - {vocabulary.pronounce}</td>
                      </tr>
                      <tr>
                          <th className='meaning'>Nghĩa:</th>
                          <td>{Mean}</td>
                      </tr>
                  </table>
              </div>
          </div>
        </div>
      )
    }
  }

    let kanji;
    if (vocabulary.kanjis !== undefined) {
        kanji = (
            <ExpandingCards data={vocabulary.kanjis}></ExpandingCards>
        )
    }

  return (
    <div className='main-container'>
    <div className='left'>
        {kanji}
    </div>
    <div className='main'>
        {content()}
    </div>
    <div className='right'>
    </div>
    </div>
  )
} 
export default VocabularyDetail