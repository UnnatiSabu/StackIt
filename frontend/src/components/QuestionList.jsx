import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

function QuestionList({ questions, onVote, compact }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const handleQuestionClick = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  return (
    <>
      {questions.map((question) => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          onVote={onVote}
          compact={compact}
          onQuestionClick={handleQuestionClick}
          isExpanded={expandedQuestionId === question.id}
        />
      ))}
    </>
  );
}

export default QuestionList;
