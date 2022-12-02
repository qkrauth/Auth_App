import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler called");

    const body = {
        username,
        password
    }

    const url = "http://localhost:3000"

    axios.post(register ? `${url}/register` : `${url}/login`, body)
        .then(({data}) => {
          authCtx.login(data.token, data.exp, data.userId)
          console.log("After Auth", data)
        })
        .catch(err => {
            setUsername("")
            setPassword("")
        })

  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn">
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
