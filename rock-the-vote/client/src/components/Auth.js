import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm'
import {UserContext} from '../context/UserProvider'

const initInputs = {
    username: "",
    password: ""
}

function Auth(){
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthError} = useContext(UserContext)

    function handleChange(e){
        const {name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
      setToggle(prev => !prev)
      resetAuthError()
    }

    return (
        <div className="auth-container">
          <h1>Rock The Vote</h1>
          { !toggle ?
            <>
              <AuthForm 
                handleChange={handleChange}
                handleSubmit={handleSignup}
                inputs={inputs}
                btnText="Sign up"
                errMsg={errMsg}
              />
              <p onClick={toggleForm}>Already have an account?</p>
            </>
          :
            <>
              <AuthForm 
                handleChange={handleChange}
                handleSubmit={handleLogin}
                inputs={inputs}
                btnText="Login"
                errMsg={errMsg}
              />
              <p onClick={toggleForm}>Ready to Signup?</p>
            </>
          }
        </div>
      )
}

export default Auth