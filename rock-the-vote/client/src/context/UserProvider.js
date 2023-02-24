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
        user: {}, 
        token: "", 
        issues: []
    }

    const {userstate, setUserState} = useState(initState)
    const {allIssues, setAllIssues} = useState([])

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
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/signup", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getAllIssues()
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
            issues: []
        })
    }

    function getAllIssues(){
        userAxios.get('/api/issue')
        .then(res => setAllIssues(res.data))
        .catch(err => console.log(err))
    }

    function getUserIssues(){
        userAxios.get('/api/issue/user')
        .then(res => setUserState(prevUserState => ({
            ...prevUserState,
            issues: [...prevUserState.issues, ...res.data]
        })))
        .catch(err => console.dir(err.response.data.errMsg))
    }

    function addIssue(newIssue) {
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: [...prevUserState.issues,res.data]
            }))
            setAllIssues(prevIssues => ([
                ...prevIssues,
                res.data
            ]))
        })
        .catch(err => console.dir(err.response.data.errMsg))
    }

    return(
        <UserContext.Provider
        value={{
            ...userstate,
            signup,
            login,
            logout,
            addIssue,
            resetAuthError,
            allIssues
        }}>
            {props.children}
        </UserContext.Provider>

    )

}

export default UserProvider