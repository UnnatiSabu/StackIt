@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* --- Main Page Wrapper and Background --- */
.ask-question-page-wrapper {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  background-color: #f8f9fa; 
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cg fill='%23d4dce2' fill-opacity='0.4'%3e%3cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3e%3c/g%3e%3c/svg%3e");
}

/* --- Header Styles --- */
.page-header { background-color: white; border-bottom: 1px solid #dee2e6; padding: 0 2rem; height: 65px; display: flex; align-items: center; }
.page-header-content { display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1400px; margin: 0 auto; }


.page-header-logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0d6efd;
  text-decoration: underline;
  transition: transform 0.2s ease-in-out; 
}
.page-header-logo:hover {
  transform: scale(1.05); 
}

.page-header-nav { display: flex; align-items: center; gap: 1.5rem; }


.btn-ask-question-active {
  background-color: #0b5ed7;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: transform 0.2s ease-in-out; 
}
.btn-ask-question-active:hover {
  transform: scale(1.05); 
}

.page-header-avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #dee2e6; object-fit: cover; transition: transform 0.2s ease-in-out; }
.page-header-avatar:hover { transform: scale(1.1); cursor: pointer; }


.ask-question-main-content { padding: 2rem 1rem; }
.ask-question-form-card { background: white; width: 100%; max-width: 900px; margin: 0 auto; padding: 2.5rem 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); }
.ask-question-title { font-size: 2rem; font-weight: 700; color: #2c3e50; margin: 0 0 1.5rem 0; padding-bottom: 1.5rem; border-bottom: 1px solid #e0e6ed; }

/* --- Form styles --- */
.form-group { margin-bottom: 1.5rem; }
.form-label { display: block; font-size: 1rem; font-weight: 500; color: #495057; margin-bottom: 0.5rem; }
.form-input { width: 100%; padding: 0.8rem 1rem; border: 1px solid #ced4da; border-radius: 8px; font-size: 1rem; box-sizing: border-box; }
.rich-text-editor .ql-toolbar { border-top-left-radius: 8px; border-top-right-radius: 8px; border: 1px solid #ced4da; background: #f8f9fa; }
.rich-text-editor .ql-container { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border: 1px solid #ced4da; border-top: 0; min-height: 150px; }
.tags-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }
.tag-item { background-color: #d1e7fd; color: #0d6efd; padding: 0.4rem 0.8rem; border-radius: 12px; font-weight: 500; }
.remove-tag { margin-left: 0.5rem; cursor: pointer; font-weight: 700; }
.form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
.btn { padding: 0.8rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; text-decoration: none; text-align: center; }
.btn-primary { background-color: #4a90e2; color: white; }
.btn-secondary { background-color: #6c757d; color: white; }

/* --- Avatar Modal Styles --- */
.avatar-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); display: flex; justify-content: center; align-items: center; z-index: 2000; cursor: pointer; }
.avatar-modal-content { cursor: default; animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.avatar-modal-image { width: 200px; height: 200px; border-radius: 50%; border: 4px solid white; box-shadow: 0 5px 25px rgba(0, 0, 0, 0.4); }
@keyframes zoomIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .page-header { padding: 0 1rem; }
  .page-header-logo { font-size: 1.5rem; }
  .ask-question-main-content { padding: 1.5rem 1rem; }
  .ask-question-form-card { padding: 1.5rem; }
  .ask-question-title { font-size: 1.5rem; padding-bottom: 1rem; margin-bottom: 1rem; }
  .form-actions { flex-direction: column; gap: 0.75rem; }
  .btn { width: 100%; box-sizing: border-box; }
}
.dynamic-bg {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(-45deg, #004e92, #000428, #2980b9, #2c3e50);
  background-size: 400% 400%;
  animation: gradientBackground 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.5s ease  ;
}

@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.ask-question-page-wrapper {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  max-width: 900px;
  width: 100%;
  margin: 40px auto;
  padding: 30px;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}
.dynamic-bg.light {
  background: linear-gradient(-45deg, #c2e9fb, #a1c4fd, #d4fc79, #96e6a1);
  background-size: 400% 400%;
}
.dynamic-bg.dark .ask-question-page-wrapper {
  background-color: #1e1e2f;
  color: white;
}

/* Button styling */
.theme-toggle-button {
  background: none;
  color: inherit;
  border: 1px solid #ccc;
  padding: 6px 12px;
  margin-left: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.theme-toggle-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}
