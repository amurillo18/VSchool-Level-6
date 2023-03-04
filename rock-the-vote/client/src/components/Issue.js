import React, { useContext, useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import { UserContext } from '../context/UserProvider'
import Comments from './Comment'
import IssueForm from './IssueForm'


function Issue(props){

  const {title, description, _id, likedUsers, dislikedUsers, comments} = props

  const {likeIssue, dislikeIssue, addComment, getComments, deleteIssue, updateIssue} = useContext(UserContext)
  
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => {
    getComments()
    // eslint-disable-next-line
},[])
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
          <button onClick={()=>deleteIssue(_id)}><i title="Delete" className="fas fa-trash"></i></button>
            <button onClick={()=> setEditToggle(!editToggle)}>{!editToggle ? <i title="Edit" className="fas fa-edit"></i> : <i title="Cancel" className="fas fa-window-close"></i>}</button>
            <br/>
            {editToggle ? 
                <div className="edit-form">
                    <IssueForm 
                        title={title} 
                        description={description} 
                        submit={updateIssue}
                        _id={_id}
                        btnText="Edit Issue"
                    />
                </div> : 
                null
            }

          <div className='comment-container'>
            <h5>Comments</h5>
            {`Comments(${comments.length})`}
                
              <Comments key={_id} comments={comments} _id={_id}/>
            <CommentForm addComment={addComment} _id={_id}/>
          </div>
      </div>
  )
}

export default Issue