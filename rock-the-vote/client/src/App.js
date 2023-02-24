import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import {UserContext } from './context/UserProvider'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Public from './components/Public'
import Auth from './components/Auth'

function App() {
  const { token, logout, allIssues} = useContext(UserContext)

  useEffect(() => {

  }, [])

  return (
    <div className="App">
     {token && <Navbar logout={logout}/>}
     <Routes>
      <Route 
          path='/' 
          element = { token ? <Navigate to='/profile'/> : <Auth/>}/>
      <Route 
          path="/profile"
          element={<Profile />}
        />
        <Route 
          path="/public"
          element={<Public />}
        />
     </Routes>
    </div>
  );
}

export default App;
