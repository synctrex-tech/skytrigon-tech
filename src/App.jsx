import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<div>Loading site...</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
