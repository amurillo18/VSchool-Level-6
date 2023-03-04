import React from 'react'
import Issue from './Issue'

function IssueList(props){
  
  const { issues } = props
  
  return (
    <div className="issue-list">
      { issues.sort((a, b) => { // goes through and sorts based on which one has a greater length of likes
        let bTotal = b.likeDislike.filter(item => item.likeDislike === true).length
        let aTotal = a.likeDislike.filter(item => item.likeDislike === true).length
        return bTotal - aTotal 
      }).map(issue => 
          <Issue 
            issue={ issue } 
            key={ issue._id }
            // comments={comments}
          />
        )}
    </div>
  )
}

export default IssueList