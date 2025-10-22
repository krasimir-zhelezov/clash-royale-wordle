import './App.css'
import {Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Game from './pages/Game'
import About from './pages/About'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Game/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      

      <footer className="w-full text-center py-3 border-t border-gray-300 mt-auto text-gray-600 text-sm">
        <p>
          Made by Krasimir Zhelezov • 
            <a href="https://www.instagram.com/_krasimir_zhelezov_/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Instagram</a> • 
            <a href="https://github.com/krasimir-zhelezov/clash-royale-wordle/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">GitHub</a> • 
            <a href="https://www.paypal.com/paypalme/krasimirzhelezov" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Donate</a> • &copy; 2025 CRWordle
        </p>
        <p className="text-xs mt-1">
          <a href='mailto:zhelezov.krasimir@gmail.com'>Contact</a> • Privacy Policy • <Link to="/about">About</Link> • Not affiliated with Supercell
        </p>
      </footer>
    </Router>
  ) 
}

export default App
