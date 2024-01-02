import { useState } from "react";
import "./SignUpForm.css";

export default function SignUpForm( {setToken} ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {

      if (password !== RepeatPassword) {
        setPasswordMatchError('Passwords do not match');
        return;
      }

      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {method: "POST",
        headers:{
          "content-type": "application/json",
        },
        body:JSON.stringify({username, password}),
      } 
        );
      const result = await response.json();
      setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up to Join Us!</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          {" "} 
          <input
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          {" "}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          {" "}
          <input
            type="password"
            placeholder="Reenter Password"
            value={RepeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setPasswordMatchError(''); // Reset error message on input change
            }}
          />
        </label>
        {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
        <br></br>
        <button>Sign Up</button>
      </form>
    </>
  );
}
