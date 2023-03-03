import {createContext, useState} from 'react';
import axios from 'axios';

export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        issues: [],
        errMsg: ""
    }

    console.log(localStorage.getItem('user'))

    const [userState, setUserState] = useState(initState)
    const [allIssues, setAllIssues] = useState([])

    function signup(credentials){
        axios.post("/auth/signup", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserIssues()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            issue: []
        })
    }

    function getAllIssues(){
        userAxios.get('/api/issue')
        .then(res => setAllIssues(res.data))
        .catch(err => console.log(err))
    }

    function getUserIssues(){
        userAxios.get("/api/issue/user")
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              issues: res.data
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      }
     console.log(userState.issues._id)

    function addIssue(newIssue) {
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                issue: [...prevUserState.issues,res.data]
            }))
        })
        .catch(err => console.dir(err.response.data.errMsg))
    }

    function handleAuthError(errMsg){
        setUserState(prevUserState => ({
          ...prevUserState,
          errMsg
        }))
      }
    
      function resetAuthError(){
        setUserState(prevUserState => ({
          ...prevUserState,
          errMsg: ""
        }))
      }

      function likeIssue(issueId){
        userAxios.put(`/api/issue/like/${issueId}`)
        .then(res => {
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issueId !== issue._id ? issue : res.data))
            setUserState(prevUserState => ({...prevUserState, issues: prevUserState.issues.map(issue => issueId !== issue._id ? issue : res.data)}))
        })
        .catch(err => console.log(err))
      }

      function dislikeIssue(issueId){
        userAxios.put(`/api/issue/dislike/${issueId}`)
        .then(res => {
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issueId !== issue._id ? issue : res.data))
            setUserState(prevUserState => ({...prevUserState, issues: prevUserState.issues.map(issue => issueId !== issue._id ? issue : res.data)}))
        })
        .catch(err => console.log(err))
      }
    //   function commenting(newComment) {
    //     userAxios.post('/api/comment',  newComment)
    //         .then(res => getAllIssues())
    //         .catch(err => console.log(err.response.data.errMsg))
    // }

    function upKeepIssues(){
        getUserIssues()
        getAllIssues()
        getComments()
    }
// adding on commenting

    const[comments, setComments] = useState([])

    function getComments(id){
        userAxios.get(`/api/issue/comment/`)
        .then(res => setComments(res.data))
        .catch(err => console.dir(err.response.data.errMsg))
    }
    
    
    const addComment = (issueId, newComment) => {
        userAxios.post(`/api/issue/comment/${issueId}`, newComment)
        .then((response) => setComments(response.data))
        .catch(err => console.log(err))
    }

    // function editComment(commentId, updateComment){
    //     userAxios.put(`/api/issue/comment/${commentId}`, updateComment)
    //     .then(res => setComments(prev => prev.map(prevs => prevs._id !== commentId ? prevs : res.data)))
    // }

    return(
        <UserContext.Provider
        value={{
            ...userState,
            signup,
            login,
            logout,
            addIssue,
            resetAuthError,
            likeIssue,
            dislikeIssue,
            allIssues,
            getAllIssues,
            getUserIssues,
            userAxios,
            upKeepIssues,
            comments,
            getComments,
            addComment
            //editComment
            
        }}>
            {props.children}
        </UserContext.Provider>

    )
}

export default UserProvider