import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";

Quill.register("modules/emoji", Emoji);

const AskQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const navigate = useNavigate();

  const suggestedTags = [
    "javascript", "react", "node", "express", "mongodb",
    "sql", "python", "django", "java", "spring",
    "c++", "docker", "aws", "graphql"
  ];

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePost = () => {
    const questionData = {
      title,
      description,
      tags
    };
    fetch('/api/ask-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(questionData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to post question");
        return res.json();
      })
      .then(() => navigate('/profile'))
      .catch(err => {
        console.error(err);
        alert("Failed to post question. Please try again.");
      });
  };
  

  const quillModules = {
    toolbar: [
      ['bold', 'italic'],
      [{ 'list': 'bullet' }, { 'list': 'ordered' }],
      [{ 'align': [] }],
      ['link', 'image', 'emoji']
    ],
    "emoji-toolbar": true,
    "emoji-shortname": true,
  };

  return (
    <div className="ask-question-page-wrapper">
      <header className="page-header">
        <div className="page-header-content">
          <Link to="/profile" className="page-header-logo">
            StackIt
          </Link>
          <nav className="page-header-nav">
            <button 
              className="btn-ask-question-active"
              onClick={() => navigate('/profile')}
            >
              My Profile
            </button>
            <Link to="/profile">
              <img 
                src="https://i.imgur.com/kPwsB4p.png" 
                alt="User Avatar" 
                className="page-header-avatar" 
              />
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="ask-question-main-content">
        <div className="ask-question-form-card">
          <h1 className="ask-question-title">Ask a Public Question</h1>
          
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
  type="text"
  id="title"
  className="form-input"
  placeholder="e.g., Is there a JavaScript function to reverse a string?"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={quillModules}
              placeholder="Start typing..."
              className="rich-text-editor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags</label>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  {tag}
                  <span className="remove-tag" onClick={() => removeTag(tag)}>×</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              id="tags"
              className="form-input"
              placeholder="Press Enter to add a tag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            <div className="suggested-tags">
              {suggestedTags.map(tag => (
                <span
                  key={tag}
                  className="suggested-tag"
                  onClick={() => {
                    if (!tags.includes(tag)) setTags([...tags, tag]);
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={handlePost}>
              Post Your Question
            </button>
            <Link to="/profile" className="btn btn-secondary">Cancel</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AskQuestionPage;
