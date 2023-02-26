import React from 'react'

function Issue(props){
  const { title, description, likedUsers, dislikedUsers, _id } = props
  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>

      <div className='vote-container'>
        <button><i className='fa-solid fa-thumbs-up'></i></button>
        <p>{likedUsers.length}</p>

        <button><i className='fa-solid fa-thumbs-down'></i></button>
        <p>{dislikedUsers.length}</p>
      </div>
      
    </div>
  )
}

export default Issue