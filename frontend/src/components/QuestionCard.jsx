import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionCard.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function QuestionCard({ question, onVote, compact }) {
  const [userVote, setUserVote] = useState(null);
  const [localVotes, setLocalVotes] = useState(question.votes || 0);
  const navigate = useNavigate();

  if (!question) return null;

  const handleVote = (direction) => {
    let voteChange = 0;

    if (userVote === direction) {
      setUserVote(null);
      voteChange = direction === 'up' ? -1 : 1;
    } else if (userVote === null) {
      setUserVote(direction);
      voteChange = direction === 'up' ? 1 : -1;
    } else {
      setUserVote(direction);
      voteChange = direction === 'up' ? 2 : -2;
    }

    setLocalVotes(localVotes + voteChange);
    onVote(question.id, direction);
  };

  const handleQuestionClick = () => {
    navigate(`/questions/${question.id}`);
  };

  return (
    <div 
      className={`question-card ${compact ? "compact" : ""}`}
      onClick={handleQuestionClick}
    >
      <div className="vote-section">
        <div className="vote-buttons">
          <button 
            className={`vote-btn ${userVote === 'up' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleVote('up');
            }}
            aria-label="Upvote"
          >
            <FaThumbsUp />
          </button>
          <div className="vote-count">{localVotes}</div>
          <button 
            className={`vote-btn ${userVote === 'down' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleVote('down');
            }}
            aria-label="Downvote"
          >
            <FaThumbsDown />
          </button>
        </div>
      </div>

      <div className="question-content">
        <h3>{question.title}</h3>
        <p>{question.description}</p>
        <div className="tags-user">
          <div className="tags">
            {question.tags.map((tag, i) => (
              <span key={i} className="tag">#{tag}</span>
            ))}
          </div>
          <div className="username">Asked by {question.username}</div>
        </div>
      </div>

      <div className="answer-count">
        {Array.isArray(question.answers) ? question.answers.length : question.answers} 
        {Array.isArray(question.answers) ? 
          (question.answers.length === 1 ? ' answer' : ' answers') 
          : (question.answers === 1 ? ' answer' : ' answers')}
      </div>
    </div>
  );
}

export default QuestionCard;
