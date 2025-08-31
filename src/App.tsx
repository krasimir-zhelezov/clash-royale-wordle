import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Game from './pages/Game'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Clash Royale Wordle";
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Game/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
