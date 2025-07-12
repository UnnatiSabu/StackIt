import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import "./styles/global.css";
import "./styles/App.css";

import Navbar from "./components/Navbar";
import QuestionList from "./components/QuestionList";
import Pagination from "./components/Pagination";
import AskAQuestion from "./components/AskAQuestion";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

import { FaSearch, FaTimes } from "react-icons/fa";

function Home() {
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const recommendedQuestions = [
    {
      id: 1,
      title: "How to optimize React performance?",
      description: "Looking for best practices to make my React app faster...",
      tags: ["React", "Performance", "JavaScript"],
      username: "react_lover",
      answers: 12,
      votes: 24,
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox - when to use which?",
      description: "I'm confused about when to use Grid and when Flexbox...",
      tags: ["CSS", "Frontend", "Web Development"],
      username: "css_newbie",
      answers: 8,
      votes: 15,
    },
    {
      id: 3,
      title: "Best way to handle authentication in 2023?",
      description: "What's the current best practice for auth in modern apps?",
      tags: ["Authentication", "Security", "Web Development"],
      username: "dev_enthusiast",
      answers: 5,
      votes: 10,
    },
    {
      id: 4,
      title: "TypeScript best practices for large codebases",
      description: "How to structure TypeScript projects for maintainability?",
      tags: ["TypeScript", "Best Practices"],
      username: "ts_expert",
      answers: 7,
      votes: 18,
    },
    {
      id: 5,
      title: "State management in React - Context vs Redux",
      description: "When should I use Context API vs Redux Toolkit?",
      tags: ["React", "State Management"],
      username: "state_master",
      answers: 9,
      votes: 22,
    },
  ];

  // Declare allTags here
  const allTags = [...new Set(recommendedQuestions.flatMap((q) => q.tags))];

  // Filter available tags based on tagSearchQuery
  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  // Toggle tags on selection/deselection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Filter questions by tags and search query
  const filteredQuestions = recommendedQuestions.filter((q) => {
    if (selectedTags.length > 0 && !selectedTags.every((tag) => q.tags.includes(tag))) {
      return false;
    }
    if (searchQuery) {
      return (
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  // Handle voting (stub)
  const handleVote = (questionId, direction) => {
    console.log(`Voted ${direction} on question ${questionId}`);
  };

  return (
    <div className="app">
      <div className="main-container">
        {/* Left Sidebar */}
        <div className="left-container">
          <div className="logo">StackIt</div>
          <div className="sidebar">
            <div
              className={`sidebar-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("home");
                setSelectedTags([]);
                setCurrentPage(1);
              }}
            >
              🏠 Home
            </div>
            <div
              className={`sidebar-item ${activeTab === "tags" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("tags");
                setCurrentPage(1);
              }}
            >
              🏷️ Tags
            </div>

            {activeTab === "tags" && (
              <div className="tag-container">
                <div className="tag-search">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                  />
                  {tagSearchQuery && (
                    <FaTimes
                      className="clear-icon"
                      onClick={() => setTagSearchQuery("")}
                    />
                  )}
                </div>

                <div className="selected-tags-section">
                  <h4>Selected Tags ({selectedTags.length})</h4>
                  <div className="selected-tags">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag}
                        className="tag-item active"
                        onClick={() => toggleTag(tag)}
                      >
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="available-tags-section">
                  <h4>Available Tags</h4>
                  <div className="available-tags">
                    {filteredTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <div
                          key={tag}
                          className="tag-item"
                          onClick={() => toggleTag(tag)}
                        >
                          #{tag}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Container */}
        <div className="right-container">
          <div className="navbar">
            <div className="search-container">
              <input
                className="search-bar"
                placeholder="Search questions or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="right-section">
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
              </button>

              {isLoggedIn ? (
                <div className="user-profile" onClick={() => (window.location.href = "/profile")}>
                  <img src={userProfile.avatar} alt="Profile" className="profile-pic" />
                  <span className="profile-name">{userProfile.name}</span>
                </div>
              ) : (
                <button
                  className="login-btn"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="content-container">
            <main className="content">
              {activeTab === "home" && (
                <>
                  <div className="greeting-section">
                    <h2>Welcome back, {userProfile.name}!</h2>
                    <button
                      className="ask-button"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Ask New Question
                    </button>
                  </div>

                  <h3 className="recommended-title">
                    {selectedTags.length > 0
                      ? `Questions tagged [${selectedTags.join(", ")}]`
                      : "Recommended for you"}
                  </h3>
                </>
              )}

              <QuestionList questions={currentQuestions} onVote={handleVote} compact={true} />
            </main>

            {totalPages > 1 && (
              <div className="pagination-container">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ask-question" element={<AskAQuestion />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
