import React, { useState } from 'react';
import Home from './Pages/home';
import StudyGuide from './Pages/studyguide';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  const navigate = (to) => setPage(to);

  return (
    <div className="App">
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'studyguide' && (
        <div>
          <div style={{ padding: 12 }}>
            <button onClick={() => setPage('home')} style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>
              ← Back
            </button>
          </div>
          <StudyGuide />
        </div>
      )}
    </div>
  );
}

export default App;