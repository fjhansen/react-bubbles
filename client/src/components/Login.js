import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import { Button, Checkbox, Form, Input, Grid, Segment} from 'semantic-ui-react'


const Login = () => {
const [login, setLogin] = useState({
  username: '',
  password: '',
})
const history = useHistory()
const loginPls = loginPLZ => {
  axios.post('http://localhost:5000/api/login', loginPLZ)
  .then(result => {
    localStorage.setItem('token', result.data.payload)
    history.push('/private')
  })
}

const handleChange = event => {
  setLogin({...login, [event.target.name]: event.target.value})
}

const handleSubmit = event => {
  event.preventDefault()
  loginPls(login)

  setLogin({
    username: '',
    password: ''
  })
}


  return (
    <Grid textAlign="center" vertialAlign="middle">
      <Grid.Column style={{maxWidth: 450}}>

  <Form onSubmit={handleSubmit}>
        <Input
        type='text'
        name='username' 
        value={login.username} 
        placeholder='handle' 
        onChange={handleChange}
        />

        <Input
        type='password'
        name='password' 
        value={login.password} 
        placeholder='pw' 
        onChange={handleChange}
        />
      {/* <input type="submit"/>  */}
      <Button type="submit">Go</Button>          
        
  


    </Form> 
      </Grid.Column>
  
    </Grid>
  );
};

export default Login;
