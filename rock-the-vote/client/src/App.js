import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext } from './context/UserProvider'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Public from './components/Public'
import Auth from './components/Auth'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { token, logout, user} = useContext(UserContext)

  return (
    <div className="App">
     {token && <Navbar logout={logout}/>}
     <Routes>
      <Route 
          path='/' 
          element = { token ? <Navigate to='/profile'/> : <Auth/>}/>
      <Route 
          path="/profile"
          element={
          <ProtectedRoute token={token} redirectTo="/">
          <Profile/>
        </ProtectedRoute>}
        />
        <Route 
          path="/public"
          element={
          <ProtectedRoute token={token} redirectTo="/">
          <Public/>
        </ProtectedRoute>}
        />
     </Routes>
    </div>
  );
}

export default App;
