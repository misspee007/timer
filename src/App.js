import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current !== null) return; //prevents another interval from being created if start is pressed while timer is still running

    setTitle('You are doing great!');
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');

    setIsRunning(false);
    setIsPaused(true);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Go again?');
    setTimeLeft(30 * 60);
    setIsRunning(false);
    setIsPaused(false);
  }

  const min = padTime(Math.floor(timeLeft / 60));
  const sec = padTime(timeLeft - min * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{min}</span>
        <span>:</span>
        <span>{sec}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {isPaused && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
