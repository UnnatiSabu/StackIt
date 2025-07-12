import React from "react";
import QuestionCard from "./QuestionCard";

function QuestionList({ questions, onVote, compact }) {
  return (
    <>
      {questions.map((question) => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          onVote={onVote}
          compact={compact}
        />
      ))}
    </>
  );
}

export default QuestionList;