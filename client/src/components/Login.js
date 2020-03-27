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
  })
}

  return (
<>
<form onSubmit={handleSubmit}>
<input>
type=""
placeholder=""
value=""
name=""
id=""
onChange={}
</input>

<input>
type=""
placeholder=""
value=""
name=""
id=""
onChange={}
</input>

<button type="submit">
  Login
</button>
</form>
</>
  );
};

export default Login;
