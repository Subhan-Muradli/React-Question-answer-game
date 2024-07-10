import React, { useState, useRef } from 'react';
import questions from './data';
import correct from './mp3/correct.mp3';
import win from './mp3/win.mp3';
import end from './mp3/end.mp3';
import styles from './modulyarCss/data.module.css';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const correctSound = useRef(null);
  const incorrectSound = useRef(null);
  const endSound = useRef(null);

  const handleAnswerOptionClick = (isCorrect, index) => {
    setSelectedAnswer(index);

    if (isCorrect) {
      correctSound.current.play();
      setScore(score + 1);
    } else {
      incorrectSound.current.play();
      setShowCorrectAnswer(true);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
      } else {
        setGameOver(true);
        if (score >= 15) {
          incorrectSound.current.play();
        } else {
          endSound.current.play();
        }
      }
    }, 2000);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  };

  return (
    <div className={styles.app}>
      <audio ref={correctSound} src={win}></audio>
      <audio ref={incorrectSound} src={correct}></audio>
      <audio ref={endSound} src={end}></audio>
      {gameOver ? (
        <div className={styles.scoreSection}>
          <h2>
            Siz oyunu bitirdiniz və sizin nəticəniz: {score} / {questions.length}
          </h2>
          <button className={styles.repeatGame} onClick={reset}>Oyuna təkrar başla</button>
        </div>
      ) : (
        <>
          <div className={styles.questionSection}>
            <div className={styles.questionCount}>
              <span>Sual {currentQuestion + 1}</span> / {questions.length}
            </div>
            <div className={styles.questionText}>{questions[currentQuestion].question}</div>
          </div>
          <div className={styles.answerSection}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer, index)}
                className={styles.button}
                style={{
                  backgroundColor: selectedAnswer === index
                    ? option === questions[currentQuestion].answer
                      ? 'green'
                      : 'red'
                    : showCorrectAnswer && option === questions[currentQuestion].answer
                    ? 'green'
                    : ''
                }}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
