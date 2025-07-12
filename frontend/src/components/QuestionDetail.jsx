import React from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./QuestionDetail.css";

function QuestionDetail({ questions }) {
  const { questionId } = useParams();
  const question = questions.find(q => q.id === parseInt(questionId));

  if (!question) return <div>Question not found</div>;

  return (
    <div className="question-detail-container">
      <div className="question-header">
        <h1>{question.title}</h1>
        <div className="question-meta">
          <span className="username">Asked by {question.username}</span>
          <span className="date">on {question.date}</span>
        </div>
      </div>

      <div className="question-content">
        <p>{question.description}</p>
        
        <div className="vote-section">
          <button className="vote-btn">
            <FaThumbsUp />
          </button>
          <div className="vote-count">{question.votes || 0}</div>
          <button className="vote-btn">
            <FaThumbsDown />
          </button>
        </div>
      </div>

      <div className="tags">
        {question.tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>

      <div className="answers-section">
        <h2>{question.answers ? question.answers.length : 0} Answers</h2>
        {question.answers && question.answers.map((answer, index) => (
          <div key={index} className="answer">
            <div className="answer-content">
              <p>{answer.text}</p>
              <div className="answer-meta">
                <span className="answer-author">- {answer.author}</span>
                <span className="answer-date">{answer.date}</span>
              </div>
            </div>
            <div className="answer-votes">
              <button className="vote-btn">
                <FaThumbsUp />
              </button>
              <div className="vote-count">{answer.votes || 0}</div>
              <button className="vote-btn">
                <FaThumbsDown />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDetail;

