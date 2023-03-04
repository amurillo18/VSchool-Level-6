import React, {  useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
//import { UserContext } from "../context/UserProvider";


const initInputs = {
   comment: ""
  } 

function CommentForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addComment } = useContext(UserContext)

    const {_id} = props

    console.log(_id, "id")

  //   const commentData = {
  //     inputs,
  //     issueId: _id
  // }

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
    
      }

      function handleSubmit(e){
        e.preventDefault()
        addComment(_id, inputs)
        setInputs(initInputs)
      }

      const { comment} = inputs
    return(
        <>
        <form onSubmit={handleSubmit}>
            <textarea
            type='text'
            name='comment'
            value={comment}
            onChange={handleChange}
            placeholder='Type Comment'
            />
            <button>Submit Comment</button>
        </form>
        </>
    )
}

export default CommentForm