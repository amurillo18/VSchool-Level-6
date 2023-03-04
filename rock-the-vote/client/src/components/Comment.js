//import react from 'react'
//import CommentProvider from '../context/CommentProvider'
//import {UserContext} from '../context/UserProvider'
//import CommentForm from './CommentForm'

function Comment(props) {
 
    const {comments} = props
    return (
        <div>
            <br/>
            {comments.map((item, index) =>  
                <div key={index}>
                    <p className="description">{item.comment}</p>
                    <hr/>
                </div>
            )}
        </div>
    )

}

export default Comment