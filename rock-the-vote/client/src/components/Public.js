import React from 'react'
//import IssueList from './IssueList'
import Issue from './Issue'
//import { UserContext } from '../context/UserProvider'

function Public(props) {
  const { allIssues, likeIssue, dislikeIssue, addComment, comments } = props

  function sortIssues(a, b){
      if( a.likedUsers.length === b.likedUsers.length ){
          return 0
      } else if (a.likedUsers.length > b.likedUsers.length){ 
          return -1
      } else {return 1}
  }

  allIssues.sort(sortIssues)

  const issuesList = allIssues.map(issue => {
      return <Issue
          {...issue}
          key = {issue._id}
          likeIssue= {likeIssue}
          dislikeIssue= {dislikeIssue}
          addComment={addComment}
          comments={comments}
      />
  })

  return(
      <div className="public-container">
          <h1>Top Posts</h1>
          {issuesList}
      </div>
  )
}

export default Public