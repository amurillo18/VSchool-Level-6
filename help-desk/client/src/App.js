
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify' //used for adding notifications
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Home from "./pages/Home"
import Login from './pages/Login'
import Register from './pages/Register' 
import Ticket from './pages/Ticket'
import Tickets from './pages/Tickets'
import NewTicket from './pages/NewTicket'



function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/newTicket' element={<ProtectedRoute>
              <NewTicket/>
            </ProtectedRoute>}/>
            <Route path='/tickets' element={<ProtectedRoute>
              <Tickets/>
            </ProtectedRoute>}/>
            <Route path='/ticket/:ticketId' element={<ProtectedRoute>
              <Ticket/>
            </ProtectedRoute>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
