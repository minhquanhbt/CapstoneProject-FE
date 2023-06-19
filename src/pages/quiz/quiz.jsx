/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getQuiz, sendAnswer } from '../../api/main_page';
import { Card, notification } from 'antd';
import right from '../../icon/rightcheck.png';
import wrong from '../../icon/wrongcheck.png';

const { Meta } = Card;

const QuizCard = () => {
    const [option, setOption] = useState([]);
    const [quest, setQuest] = useState('');
    const [type, setType] = useState('');
    const [newTest, setNewtest] = useState(0);
    const [showresult, setShowresult] = useState(false);
    const [result, setResult] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await getQuiz().then((res) => {
                // console.log(res)
                if((!res[0].question)||(res[0].option.length<4)||(!res[0].question)){
                    setNewtest(newTest+1);
                }
                else{
                    setQuest((quest) => res[0].question);
                    setOption((option) => shuffle(res[0].option));
                    setType((type) => res[0].type);
                    localStorage.setItem("quiz-info", JSON.stringify(res[0]));
                }
            })
            .catch((error) => console.log(error))
        }
        if(localStorage['quiz-info']!=null) {
            setQuest((quest) => JSON.parse(localStorage.getItem("quiz-info")).question);
            setOption((option) => JSON.parse(localStorage.getItem("quiz-info")).option);
            setType((type) => JSON.parse(localStorage.getItem("quiz-info")).type);
        }
        else{
            fetchData();
        }

    }, [newTest])

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    const handleAnswerButtonClick = async (answerOption) => {
        // console.log(quest)
        await sendAnswer({
            question: quest,
            answer: answerOption,
            type: type,
        }).then(res => {
            openNotification(res)
        })
        .catch((error) => {
            console.log(error)
            notification.error({
                message: error,
                duration: 3,
            })
        });
    };
    const openNotification = (res) => {
      localStorage.removeItem("quiz-info");
      setNewtest(newTest+1);
      setShowresult(true);
      setResult(res.data)
    }
    
    const resultCard = (result) => {
        if(result){
            return (
                <Card
                    hoverable
                    style={{ width: 300 , float:'left',marginRight:'5%', backgroundColor: "green", padding: '10%'}}
                    cover={<img src={right}/>}
                >
                <div className='answer-section'>
                    <button className="answer-button" onClick={() => handleNextButtonClick()}>Câu hỏi tiếp theo</button>
                </div>
                </Card>
            )
        }
        else{
            return (
                <Card
                    hoverable
                    style={{ width: 300 , float:'left',marginRight:'5%', backgroundColor: "red", padding: '10%'}}
                    cover={<img src={wrong}/>}
                >
                <div className='answer-section'>
                        <button className="answer-button" onClick={() => handleNextButtonClick()}>Câu hỏi tiếp theo</button>
                </div>
                </Card>
            )
        }
    
    }

    const handleNextButtonClick = async () => {
        setShowresult(false);
    };

    return (
        // <div className="latest-articles" style={{ margin: "0px 15%" }}>
        <div 
            // style={{ margin: "0px 14% 0 19%" }}
            >
            <div>
                {showresult?
                    (resultCard(result)
                    ):(
                    <Card
                        hoverable
                        style={{ width: 300 , float:'left',marginRight:'5%',marginBottom:'50px'}}
                        cover={
                            <div className='card' 
                                style={{fontSize: "50px", backgroundColor: "#e16162", textAlign: "center"}}>
                                {quest}
                            </div>
                        }
                    >
                    <Meta className="title" 
                    title={'Hãy chọn cách phát âm đúng:'}/>
                    <div className='answer-section'>
                        {option.map((option) => (
                            <button className="answer-button" onClick={() => handleAnswerButtonClick(option)}>{option}</button>
                        ))}
                    </div>
                    </Card>
                )
                }
            </div>
        </div>
    );
};

export default () => <QuizCard />;