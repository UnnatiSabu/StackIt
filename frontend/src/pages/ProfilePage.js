import React, { useState, useEffect, useContext } from 'react';
import '../styles/ProfilePage.css';
import avatar from '../assets/avatar.jpg';
import {
  FaQuestionCircle,
  FaCommentDots,
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function ProfilePage() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({ name: '', tagline: '' });
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    fetch('/api/my-profile')
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data.name || 'Anonymous',
          tagline: data.tagline || 'Focused on clean code and growth',
        });
      })
      .catch(console.error);

    // Fetch user's questions
    fetch('/api/my-questions')
      .then(res => res.json())
      .then(data => setQuestions(data.questions || []))
      .catch(console.error);
  }, []);

  const handleAskQuestionClick = () => {
    navigate('/ask-question');
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <img className="avatar" src={avatar} alt="User Avatar" />
        <h2 className="username">{user.name}</h2>
        <p className="tagline">{user.tagline}</p>
        <span className="role-badge">User</span>
        <button
          className="edit-btn"
          onClick={() => navigate('/edit-profile')}
        >
          Edit Profile
        </button>

        <button
          onClick={toggleTheme}
          style={{
            marginTop: '2rem',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: theme === 'dark' ? '#f5f5f5' : '#333',
            color: theme === 'dark' ? '#333' : '#f5f5f5',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </aside>

      <main className="main-content">
        <section className="stats-bar">
          <div className="stat-item">
            <FaQuestionCircle className="stat-icon" />
            <div>
              <h3>{questions.length}</h3>
              <p>Questions</p>
            </div>
          </div>
          <div className="stat-item">
            <FaCommentDots className="stat-icon" />
            <div>
              <h3>28</h3>
              <p>Answers</p>
            </div>
          </div>
          <div className="stat-item">
            <FaThumbsUp className="stat-icon" />
            <div>
              <h3>145</h3>
              <p>Upvotes</p>
            </div>
          </div>
          <div className="stat-item">
            <FaThumbsDown className="stat-icon" />
            <div>
              <h3>12</h3>
              <p>Downvotes</p>
            </div>
          </div>
          <div className="stat-item">
            <FaStar className="stat-icon" />
            <div>
              <div className="rating-stars">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="filled-star" />
                ))}
                <FaStar className="empty-star" />
              </div>
              <p>Rating</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <button
            className="ask-question-btn"
            onClick={handleAskQuestionClick}
            style={{
              padding: '10px 18px',
              fontSize: '1rem',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Ask a Question
          </button>
        </section>

        <section className="activity-section">
          <h3>My Questions</h3>
          {questions.length === 0 ? (
            <p>No questions posted yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {questions.map((q) => (
                <li key={q.id} style={{ marginBottom: '1rem' }}>
                  <strong>{q.title}</strong>{' '}
                  <span style={{ color: '#777' }}>
                    - {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <h3>Recent Activity</h3>
          <div className="activity-list">
            {/* You can dynamically replace these with actual data */}
            <article className="activity-item">
              <div className="breadcrumbs">React &gt; Auth</div>
              <h4 title="How does JWT authentication work?">
                How does JWT authentication work?
              </h4>
              <p>2 answers • 5 upvotes</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
