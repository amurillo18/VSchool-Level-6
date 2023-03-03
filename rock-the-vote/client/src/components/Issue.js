import React, { useContext, useEffect } from 'react'
import CommentForm from './CommentForm'
import { UserContext } from '../context/UserProvider'


function Issue(props){

  const {title, description, _id, likedUsers, dislikedUsers, comments} = props

  const {likeIssue, dislikeIssue, addComment, getComments} = useContext(UserContext)

  useEffect(() => {getComments()},[])
  return(
      <div className="post-container">
          <h3 className='title'>{title}</h3>
          <h4 className='desc'>{description}</h4>

          <div className = 'vote-button-container'>
              <button onClick={() => likeIssue(_id)}>
                  <i className="fa-solid fa-thumbs-up"></i>
              </button>
               <p>{likedUsers.length}</p>
          
              <button onClick={() => dislikeIssue(_id)}>
                  <i className="fa-solid fa-thumbs-down"></i>
              </button>
               <p>{dislikedUsers.length}</p>
          </div>

          <div className='comment-container'>
            <h5>Comments</h5>
            <p>{comments}</p>
            <CommentForm addComment={addComment}/>
          </div>
      </div>
  )
}

export default Issue