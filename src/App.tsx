import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Game from './pages/Game'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Game/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
