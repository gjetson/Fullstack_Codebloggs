
import Sidebar from "./components/Sidebar"
import LoginSubmit from "./components/Login"
import RegisterSubmit from "./components/Register"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Blogg from "./components/Bloggs"
import Network from "./components/Network"
import { history } from "./util/history"


function App() {
  return (
    <BrowserRouter history={history}>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginSubmit />} />
        <Route path="/register" element={<RegisterSubmit />} />
        <Route path='/' element={<Home />} />
        <Route path='/bloggs' element={<Blogg />} />
        <Route path='/network' element={<Network />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
