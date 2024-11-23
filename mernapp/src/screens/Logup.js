import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';  // Added useNavigate for redirection

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // useNavigate hook to handle redirection
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", result.authToken);  // Corrected this line
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error with your request.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className='bg-dark text-light'>
        <div className="container ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text text-light">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">  {/* Changed to /signup */}
              I'am new a user
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
