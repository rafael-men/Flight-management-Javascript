import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom"
import Navbar from './components/Navbar'
import Login from './pages/Login'
import './App.css'
import Register from "./pages/Register"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import NewFlight from "./pages/NewFlight"
import EditFlight from "./pages/EditFlight"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/novo" element={<NewFlight/>}/>
        <Route path="/editar/:id" element={<EditFlight/>}/>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App
