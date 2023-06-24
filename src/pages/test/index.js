/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getTest, sendTestResult } from '../../api/test';
import { Card, notification } from 'antd';
const { Meta } = Card;
function Test() {

  const [test, setTest] = useState();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState([]);
  const maxlenght = 30;

  useEffect(() => {
    async function fetchData() {
      if(localStorage['user-info']!=null){
        await getTest().then((res) => {
          setTest(res);
        })
        .catch((error) => console.log(error))
      }
      else{
          window.location.href = '/';
      }
    }
    fetchData();
  }, [])

  const handleAnswerButtonClick = async (answerOption) => {
    let currentAnswer = [...answer];
    currentAnswer[current] = [test[current].question, answerOption];
    setAnswer(currentAnswer)
    console.log(answer);
    if(current === Object.keys(test).length-1){
      openNotification('Bạn đã hoàn thành tất cả câu hỏi, bạn có muốn kết thúc bài kiểm tra ?')
    }
    else{
      setCurrent(current+1);
    }
  };

  
  const openNotification= (message) => {
    notification.success({
      message: message,
      duration: 3,
    })
  }

  const handlePreviousButtonClick = async () => {
    if(current === 0){
      openNotification('Bạn đã Lùi đến câu hỏi đầu tiên')
    }
    else{
      setCurrent(current-1);
    }
  };

  const handleNextButtonClick = async () => {
    if(current === Object.keys(test).length-1){
      openNotification('Bạn đã hoàn thành tất cả câu hỏi, bạn có muốn kết thúc bài kiểm tra ?')
    }
    else{
      setCurrent(current+1);
    }
  };

  const handleFinish = async () => {
    console.log('finish');
  };

  const testCard =[];
  if(test!=null){
    if(test!=undefined){
      testCard.push(
        <div>
          <Card
            hoverable
            style={{ width: "100%" , float:'left',marginRight:'5%',marginBottom:'50px'}}
            cover={
              <div className='card' 
                style={{fontSize: "50px", backgroundColor: "#e16162", textAlign: "center"}}>
                {test[current].question}
              </div>
            }
          >
          <Meta className="title" 
          title={(current+1)+'/'+Object.keys(test).length+': Hãy chọn cách phát âm đúng:'}/>
            <div className='answer-section'>
                {test[current].option.map((option) => (
                    <button className={"answer-button "+((answer[current]?(answer[current][1]===option ? 'choosen' : ''):''))} 
                        onClick={() => handleAnswerButtonClick(option)}>
                      {option}
                    </button>
                ))}
            </div>
            <div className='change-section'>
              <button className="previous-button" onClick={() => handlePreviousButtonClick()}>Câu hỏi trước đó</button>
              <button className="next-button" onClick={() => handleNextButtonClick()}>Câu hỏi tiếp theo</button>
            </div>
            <div className='finish-section'>
              <button className="finish-button" onClick={() => handleFinish()}>Kết thúc</button>
            </div>
          </Card>
        </div>
      )
    }
  }
  return (
    <div className='main-container'>
      <div className='left-sidebar'>
      </div>
      <div className='main-content'>
        <div className='test'>
          {testCard}
        </div>
      </div>
      <div className='right-sidebar'>
      </div>
    </div>
    )
} 
export default Test