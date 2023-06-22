/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.css';
import { getKanjiData } from '../../../api/detail';

function KanjiDetail() {
  const { id } = useParams();
  const [kanji, setKanji] = useState([]);
  try {
    useEffect(() => {
      getKanjiData({ 
        kanji_id: id,
      }).then((res) => {
        setKanji(res.data);
      }).catch((error) => console.log(error.response.request.response))
    }, [])
  }
  catch (e) { console.error(e) }

  const onyomi = [];
  const kunyomi = [];
  if (kanji.pronounces != undefined) {
    kanji.pronounces.forEach((pronounce) => {
      if (pronounce.Type =='Onyomi'){
        onyomi.push(
          <p className='onyomi-item'>{pronounce.Katakana+' '}</p>
        )
      }
      if (pronounce.Type =='Kunyomi'){
        kunyomi.push(
          <p className='kunyomi-item'>{pronounce.Hiragana+' '}</p>
        )
      }
    })
  }

  const example = [];
  if (kanji.vocabularies != undefined) {
    console.log(kanji)
    kanji.vocabularies.forEach((vocabulary) => {
      example.push(
      <a className='vocabulary' href={"/detail/vocabulary/"+vocabulary.id}><p className='vocabulary-item'>{vocabulary.word+' '}</p></a>
    )
    console.log(vocabulary)
    })
  }

  const content = () =>{
    if ((kanji !== null)&&(kanji.group !== undefined)) {
      return(
        <div>
          <div style={{ width: '40%', float: 'left', textAlign: 'right' }}>  
            <div className='character-card'>
                {kanji.character}
            </div>
          </div>
          <div style={{ width: '57%', float: 'left', marginLeft: '20px' }}>
              <div style={{ width: '75%' }}>
                  <h2>{kanji.character} - {kanji.group.toUpperCase()}</h2>
                  <table>
                      <tr>
                          <th colspan="2">
                              <b>JLPT : N{kanji.level}</b>
                          </th>
                      </tr>
                      <tr className='kunyomi pronounce'>
                          <th>Kunyomi:</th>
                          <td>{kunyomi}</td>
                      </tr>
                      <tr className='onyomi pronounce'>
                          <th>Onyomi:</th>
                          <td>{onyomi}</td>
                      </tr>
                      <tr>
                          <th>Nghĩa:</th>
                          <td>{kanji.meaning}</td>
                      </tr>
                      <tr>
                          <th>Ví dụ:</th>
                          <td>{example}</td>
                      </tr>
                  </table>
              </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div> 
      {content()}
    </div>
  )
} 
export default KanjiDetail