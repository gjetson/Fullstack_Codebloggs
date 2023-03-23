
import Sidebar from "./components/Sidebar"
import LoginSubmit from "./components/Login"
import RegisterSubmit from "./components/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginSubmit />} />
        <Route path="/register" element={<RegisterSubmit />} />
        <Route path='/' element={<h1>........................................................................................home</h1>} />
        <Route path='/bloggs' element={<h1>........................................................................................bloggs</h1>} />
        <Route path='/network' element={<h1>........................................................................................network</h1>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
