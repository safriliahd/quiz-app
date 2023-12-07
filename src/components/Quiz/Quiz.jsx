import { useEffect, useState } from "react";
import "./Quiz.scss";
import AuthDetails from "../auth/AuthDetails";


const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [result, setResult] = useState({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    // console.log(result);
    const [showResult, setShowResult] = useState(false);
    const [timer, setTimer] = useState(1200);
    useEffect(() => {
      let interval;
  
      if (timer > 0 && !showResult) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else {
        // Timer is up, move to the result and reset the timer
  
        setShowResult(true);
        resetTimer();
      }
  
      return () => clearInterval(interval);
    }, [timer, showResult]);
  
    const resetTimer = () => {
      setTimer(1200); // Reset the timer to the initial value (you can adjust the time as needed)
    };
    if (!questions || questions.length === 0) {
      // Handle the case when questions are not available yet
      return <div className="loader"></div>;
    }
  
    function removeCharacters(question) {
      if (!question) return;
      return question
        .replace(/(&quot\;)/g, '"')
        .replace(/(&rsquo\;)/g, '"')
        .replace(/(&#039\;)/g, "'")
        .replace(/(&amp\;)/g, '"');
    }
    
    const { question, choices, correctAnswer } = questions[currentQuestion];
  
    //mark the answer is correct or not
    const onAnswerClick = (selectedAnswer, index) => {
      setAnswerIdx(index);
      setAnswer((prevAnswer) => {
        if (selectedAnswer === correctAnswer) {
          return true;
        } else {
          return false;
        }
      });
      setTotalAnswered((prevTotal) => prevTotal + 1);
    };
  
    const onClickNext = () => {
      setAnswerIdx(null);
      setAnswer((prevAnswer) => {
        setResult((prev) =>
          prevAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
              }
        );
        return prevAnswer; // return the updated answer state
      });
  
      if (currentQuestion !== questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setCurrentQuestion(0);
        setShowResult(true);
      }
    };

    const restartQuiz = () => {
    
          setShowResult(false);
          setCurrentQuestion(0);
        
          setAnswerIdx(null);
          setAnswer(null);
          setTotalAnswered(0);
          setResult({
              score: 0,
              correctAnswers: 0,
              wrongAnswers: 0,
    
          });
          resetTimer();
    };


    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = (timeInSeconds % 60).toLocaleString("en-US", { minimumIntegerDigits: 2 });
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="quiz-container">
        {!showResult ? (
          <>
            <div className="question-header">
              <span className="active-question-no">Questions {currentQuestion + 1}</span>
              <span className="total-question">/{questions.length}</span>
              <h2>{removeCharacters(question)}</h2>
              <p>Time Left: {formatTime(timer)}</p>
            </div>
            <div className="choice-question">
              <ul>
                {choices.map((choice, index) => (
                  <li
                    key={choice}
                    onClick={() => {
                      onAnswerClick(choice, index);
                      onClickNext();
                    }}
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </div> 
          </>
        ) : (
          <div className="result-container">
            <div className="result">
              <h3>Result</h3>
              <p>
                Total Questions: <span>{questions.length}</span>
              </p>
              <p>
                Total Score: <span>{result.score}</span>
              </p>
              <p>
                Total Answered: <span>{totalAnswered}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
              <button onClick={restartQuiz}>Try Again</button>          
            </div>
            <AuthDetails/>
          </div>
        )}
      </div>
    );
  };
  
export default Quiz;