import React, { useState } from "react";
import Home from "./Pages/home";
import StudyGuide from "./Pages/studyguide";
import Login from "./Pages/login";  // ⬅️ add this
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const navigate = (to) => setPage(to);

  return (
    <div className="App">

      {page === "home" && <Home onNavigate={navigate} />}

      {page === "studyguide" && (
        <div>
          <div style={{ padding: 12 }}>
            <button
              onClick={() => navigate("home")}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            >
              ← Back
            </button>
          </div>

          <StudyGuide onNavigate={navigate} />
        </div>
      )}

      {/* NEW LOGIN PAGE */}
      {page === "login" && (
        <Login onNavigate={navigate} />
      )}
    </div>
  );
}

export default App;
