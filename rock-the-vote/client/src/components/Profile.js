import React, { useContext, useEffect} from 'react'
import IssueForm from './IssueForm'
import UserIssueList from './UserIssueList'
import { UserContext } from '../context/UserProvider'
//import CommentContext from '../context/CommentProvider'

function Profile(){

  const { 
    user: { username }, 
    addIssue,  
    issues,
    getUserIssues
  } = useContext(UserContext)

  useEffect(() => {
    getUserIssues()
}, [])

    
  return (
    <div className="profile">
      <div className="form">
        <h1 className="text-primary">Welcome {username}!</h1>
        <h3 className="text-secondary">Add An Issue</h3>
        <IssueForm 
          addIssue={addIssue}
        />        
        <h3 className="text-primary">Your Issue</h3>
      </div>
      <UserIssueList 
        issues={issues}
      />
    </div>
  )
}

export default Profile