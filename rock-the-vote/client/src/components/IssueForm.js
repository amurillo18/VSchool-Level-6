import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: ""
}

function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addIssue } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addTodo(inputs)
    setInputs(initInputs)
  }

  const { title, description } = inputs
  return (
    <form onSubmit={handleSubmit}>
        <h3>New Issue</h3>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"
        rows='15'
        />
      <button>Add Issue</button>
    </form>
  )
}

export default IssueForm