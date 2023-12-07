import Quiz from "./components/Quiz/Quiz";
import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { auth } from "./firebase";


function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=25&category=26");
        const data = await response.json();
        const formattedQuestions = data.results.map((question) => ({
          question: question.question,
          choices: [...question.incorrect_answers, question.correct_answer],
          correctAnswer: question.correct_answer,
        }));
        console.log(formattedQuestions);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(questions);

  const [currentUser, setCurrentUser] =
  useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Quiz questions={questions}/> : <Navigate to={"login"}/>} />
        <Route path="/auth" element={<AuthDetails />} />
        <Route path="/login" element={currentUser ? <Navigate to={"/"} /> : <SignIn/> } />
        <Route path="/signUp" element={currentUser ? <Navigate to={"/"} /> : <SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App
