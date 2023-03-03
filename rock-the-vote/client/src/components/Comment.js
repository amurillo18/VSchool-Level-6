import { useContext, useState } from 'react'
import CommentProvider from '../context/CommentProvider'
//import {UserContext} from '../context/UserProvider'
import CommentForm from './CommentForm'

function Comment(props) {
 
    const { editComment} = props
    const {comments} = useContext(CommentProvider)
    const[toggle, setToggle] = useState(false)

    return(
        <>
        <div>
            {!toggle ?
            <>
            {comments.map(comment => {<p>{comment.comments}</p>})} 
            <button onClick={()=> setToggle(prev => !prev)}>Edit Comment</button> 
            </>
            :
            <>
            {comments.map(comment => <CommentForm
            key={comment._id}
            {...comment}
            btnTxt="Submit Edit"
            submit={editComment}
            />)} 
            <button onClick={()=> setToggle(prev => !prev)}>Close</button>
            </>
        }
        </div>
        </>
    )

}

export default Comment