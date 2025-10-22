import './App.css'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Game from './pages/Game'
import About from './pages/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  )
}

export default App
