import { useState, useEffect } from "react";

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusSession, setIsFocusSession] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      if (isFocusSession) {
        setIsFocusSession(false);
        setTimeLeft(BREAK_TIME);
        setSessionsCompleted(prev => prev + 1);
      } else {
        setIsFocusSession(true);
        setTimeLeft(FOCUS_TIME);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isFocusSession]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocusSession ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="focus-timer">
      <h3>{isFocusSession ? 'Focus Session' : 'Break Time'}</h3>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer} className="timer-btn">Start</button>
        ) : (
          <button onClick={pauseTimer} className="timer-btn">Pause</button>
        )}
        <button onClick={resetTimer} className="timer-btn reset-btn">Reset</button>
      </div>
      <p className="session-count">Sessions completed: {sessionsCompleted}</p>
    </div>
  );
}