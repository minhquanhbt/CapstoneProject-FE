/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getExam, sendExamResult } from '../../api/test';
import { Card, notification, Select } from 'antd';
import Timer from './timer';
const { Meta } = Card;
function Test() {

  const [test, setTest] = useState();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [point, setPoint] = useState(0);
  const [percent, setPercent] = useState(0);
  const [level, setLevel] = useState(3);
  const [ChooseLvl, setChooseLvl] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState([]);

  async function fetchData() {
    if(localStorage['user-info']!=null){
      await getExam(level).then((res) => {
        setTest(res);
      })
      .catch((error) => console.log(error))
    }
    else{
        window.location.href = '/';
    }
  }

  useEffect(() => {init()},[test])
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
    setTimeOut(true);
    sendExamResult({
      data:answer
    }).then((res) => {
      setPoint(res.point);
      setResult(res.result);
      var percentage = (res.point/Object.keys(test).length)*100;
      setPercent(percentage.toFixed(2))
    })
    .catch((error) => console.log(error));
    setShowResult(true);
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

  const endButton = [];
  endButton.push(
    <div className='end-section'>
      <button className="restart-button" onClick={() => (window.location.href= "/exam")}>Làm lại</button>
      <button className="finish-button" onClick={() => (window.location.href= "/")}>Quay về trang chủ</button>
    </div>

  )

  const resultForm =[];
  if(result!=null){
    if(result!=undefined){
      resultForm.push(
        <h3>Điểm của bạn: <b>{point}/{Object.keys(test).length}{' ('+percent+'%)'}</b></h3>
      )
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

  const handleStart = () =>{
    setChooseLvl(false);
    fetchData();
  }
  const handleChange = (value) => {
    setLevel(value);
  }

  const chooseScreen =[];
  chooseScreen.push(
    <div>
      <h5>Hãy chọn cấp độ mà bạn muốn: </h5>
      <div className='option'>
        <Select
          defaultValue= {3}
          size='large'
          style={{ width: 300 }}
          onChange={handleChange}
          options={[
            { value: 5, label: 'N5' },
            { value: 4, label: 'N4' },
            { value: 3, label: 'N3' },
            { value: 2, label: 'N2'},
            { value: 1, label: 'N1', disabled: true },
          ]}
        />
        <button className="start-button" onClick={() => (handleStart())}>Bắt đầu</button>
      </div>
    </div>
  )

  const timeout = () => {
    setTimeOut(true);
    handleFinish();
    console.log("Time Out!");
  }

  return (
    <div>
      {ChooseLvl?(chooseScreen):(
        <div className='main-container'>
          <div className='left-sidebar'>
            {timeOut?null:<Timer timeout={timeout}/>}
          </div>
          <div className='main-content'>
            <div className='exam'>
              {showResult?resultForm:testCard}
            </div>
          </div>
          <div className='right-sidebar'>
              {showResult?endButton:null}
          </div>
        </div>
      )}
    </div>
    )
} 
export default Test