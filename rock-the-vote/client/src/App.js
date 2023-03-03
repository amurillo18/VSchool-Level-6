import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import {UserContext } from './context/UserProvider'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Public from './components/Public'
import Auth from './components/Auth'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { token, logout, allIssues, upKeepIssues,likeIssue, dislikeIssue, addComment, comments} = useContext(UserContext)

  useEffect(()=>{
    upKeepIssues()
    // eslint-disable-next-line
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
          element={
          <ProtectedRoute token={token} >
          <Profile/>
        </ProtectedRoute>}
        />
        <Route 
          path="/issues"
          element={
          <ProtectedRoute token={token} >
          <Public 
          allIssues={allIssues} 
          upKeepIssues={upKeepIssues} 
          likeIssue={likeIssue} 
          dislikeIssue={dislikeIssue} 
          addComment={addComment}
          comments={comments}/>
        </ProtectedRoute>}
        />
     </Routes>
    </div>
  );
}

export default App;
