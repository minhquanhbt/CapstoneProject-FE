/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getTest, sendTestResult } from '../../api/test';
import { Card, notification } from 'antd';
const { Meta } = Card;
function Test() {

  const [test, setTest] = useState();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(localStorage['user-info']!=null){
        await getTest().then((res) => {
          setTest(res,()=>{init()});
        })
        .catch((error) => console.log(error))
      }
      else{
          window.location.href = '/';
      }
    }
    fetchData();
  }, [])

  useEffect(() => {init()},[test])

  const handleAnswerButtonClick = async (answerOption) => {
    let currentAnswer = [...answer];
    currentAnswer[current] = [test[current].question, answerOption, test[current].type];
    setAnswer(currentAnswer)
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
    console.log(answer)
    sendTestResult({
      data:answer
    }).then((res) => {
      setResult(res);
      console.log(res);
    })
    .catch((error) => console.log(error));
    setShowResult(true);
  };
  const init = () => {
    if(test!=null){
      if(test!=undefined){
        let tmp = JSON.parse(JSON.stringify(test));
        let question = [];
        for(var i=0; i<Object.keys(tmp).length; i++){
          question.push([tmp[i].question,'?',tmp[i].type]);
        }
        setAnswer(question);
      }
    }
  }
  
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

  const endButton = [];
  endButton.push(
    <div className='end-section'>
      <button className="restart-button" onClick={() => (window.location.href= "/test")}>Làm lại</button>
      <button className="finish-button" onClick={() => (window.location.href= "/")}>Quay về trang chủ</button>
    </div>

  )

  const resultForm =[];
  if(result!=null){
    if(result!=undefined){
      result.forEach((result) => {
        resultForm.push(
          <div className={'single-result '+ (result.result?'true':'false')}>
            <h5>{result.question}</h5>
            <div className='right'>
              <b>Câu trả lời đúng: </b><p>{result.right}</p>
            </div>
            <div className='choice'>
              <b>Câu trả lời đã chọn: </b><p>{result.answer}</p>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <div className='main-container'>
      <div className='left-sidebar'>
      </div>
      <div className='main-content'>
        <div className='test'>
          {showResult?resultForm:testCard}
        </div>
      </div>
      <div className='right-sidebar'>
          {showResult?endButton:null}
      </div>
    </div>
    )
} 
export default Test