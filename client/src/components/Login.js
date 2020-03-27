import React from "react";
import api from "../utils/api"
import { Form } from 'semantic-ui-react'

const Login = props => {

  const initialState = {
  username: "",
  password: ""
}

const [data, setData] = React.useState(initialState)

const handleChange = event => {
  setData({
    ...data,
    [event.target.name]:[event.target.value]
  })
}

const handleSubmit = event => {
  event.preventDefault()
  api()
  .post('/api/login', {
    username: data.username,
    password: data.password
  })
  .then(result => {
    console.log("LOGIN.JS RES",result)
    localStorage.setItem("token", result.data.payload)
    props.history.push("/protected")
    setData(initialState)
  })
  .catch(error => {
    console.log("ERROR LOGIN.JS: ",error)
    setData(initialState) //to prevent bugs
  })
}

  return (
  <>
  <form onSubmit={handleSubmit}>
  <input
  type="text"
  placeholder="User"
  value={data.username}
  name="username"
  id="username"
  onChange={handleChange}
  />



  <input
  type="password"
  placeholder="Password"
  value={data.password}
  name="password"
  id="password"
  onChange={handleChange}
  />

  <button type="submit">
    Login
  </button>
  </form>
  </>
  );
};

export default Login;
