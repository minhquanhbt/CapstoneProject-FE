/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './style.css';

const Timer = ({timeout}) => {
    const [minutes, setMinutes] = useState(40);
    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const intervalId = setInterval(() => {
            if(seconds > 0){
                setSeconds((seconds) => seconds -1)
            }
            else if(minutes > 0){
                setMinutes((minutes) => minutes -1)
                setSeconds(59)
            }
            else if(minutes == 0 && seconds == 0){
                timeout()
                return () => clearInterval(intervalId);
            }
        },1000)
        return () => clearTimeout(intervalId);
    }, [minutes, seconds])

    return (
        <div className='countdown-timer'>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
        )
} 
export default Timer