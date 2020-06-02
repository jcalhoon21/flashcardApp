import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import NavBar from "../src/components/NavBar";
import RuleLevel from "../src/components/RuleLevel";
import Footer from '../src/components/Footer';
import FlashcardList from '../src/components/FlashcardList';

import './app.css';

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: 'What is 2+2?',
//     answer: '4',
//     options: [
//       "2",
//       "3",
//       "4",
//       "5"
//     ]
//   },
//   {
//     id: 2,
//     question: 'Question 2',
//     answer: 'Answer',
//     options: [
//       "Answer 1",
//       "Answer 2",
//       "Answer",
//       "Answer 3"
//     ]
//   }
// ]

const App = () => {
  const [flashcards, setFlashcards] = useState([]); //useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer);
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <main>
      <Switch>
        <div className="App">
          {/* <Route path="/" component={Home} exact />
          <Route path="/flashcards" component={Flashcard} />
          <Route component={Error} /> */}
          <NavBar />
          <RuleLevel />
          <FlashcardList flashcards={flashcards} />
          <Footer />
        </div>
      </Switch>
    </main>
  );
}

export default App;
