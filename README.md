# 🚀 Project Description

**🌟 StackIt** is a lightweight, minimalistic question-and-answer forum platform built to support collaborative learning and structured knowledge sharing.
It allows users to:

* Ask and answer questions,
* Explore questions by tags,
* Manage their profiles,
* Switch between light and dark themes for a better user experience.

**Video Link:** [Watch Demo Video](https://drive.google.com/drive/folders/1ZGNLfJ71gB6xe4PWHAwgwCxTnftXBB9D)

StackIt emphasizes **simplicity** and **clarity**, ensuring users focus on quality discussions without distractions.

---

# ⚙️ Technologies Used

* **Frontend:** React.js, React Router, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Auth & Utilities:** JWT, bcrypt, Axios

---

# 🛠 How to run the project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/StackIt.git
cd StackIt
```

---

## 🚀 Running the **backend**

From the project root (where `package.json` of backend is), run:

```bash
cd backend
npm install
npm run start
```

This starts the Express server (by default on **[http://localhost:5000](http://localhost:5000)**).

> ⚠️ Make sure MongoDB is running on your system or cloud (Atlas) and your `.env` is set with your connection string.

---

## 🌐 Running the **frontend**

From the project root (where your React app is):

```bash
cd frontend
npm install
npm start
```

This starts React on **[http://localhost:3000](http://localhost:3000)**.

> 🔄 By default, frontend and backend run on **different ports** (`3000` for React, `5000` for Express).
> Your React app uses a **proxy** to forward API requests to backend.
> Check `frontend/package.json` for:

```json
"proxy": "http://localhost:5000"
```

---

# 🐞 Debugging & development tips

✅ **Fix “module not found” errors:**

* Ensure you have all files in place (like `App.css`, `Navbar.jsx`, etc.).
* Use **relative imports**, e.g.

```js
import Navbar from "./components/Navbar";
```

not absolute local paths.

✅ **React warnings (like unused vars)**

* Clean up code or add `// eslint-disable-next-line` above lines you want to temporarily skip.

✅ **Check backend logs**

* If Express crashes, it will show errors in your terminal.
* Use `console.log` generously for debugging.

✅ **MongoDB issues**

* Ensure MongoDB service is running locally (`mongod`) or your Atlas cluster is accessible.

✅ **CORS errors**

* Your backend should have CORS middleware enabled:

```js
const cors = require("cors");
app.use(cors());
```

✅ **Hot reload not working?**

* Stop server (`Ctrl + C`) and restart `npm start`.

---

# 🎉 Quick start summary

```bash
# Start backend
cd backend
npm install
npm start

# In a new terminal
cd frontend
npm install
npm start
```

---

✅ **Done!**
Your app will be live at:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5050)

---
