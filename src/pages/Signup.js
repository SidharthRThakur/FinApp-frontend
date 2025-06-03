import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../util";
import { handleSuccess } from "../util";
function Signup() {
  // to the se data in temprar  oy storage
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    // Handle input changes
    // name → input ka name attribute
    // value → input ki current value
    const { name, value } = e.target; // e=yeh us event ka data hai jo trigger hua hai (onChange)
    // e.target us HTML element ko point karta hai jahan par event hua hai.
    // Toh jab user kuch type karega, handleChange function call hoga — aur:
    // e.target → points to the <input>
    // e.target.name → "email"
    // e.target.value → jo bhi user ne type kiya (for example: "sid@example.com")
    console.log(name, value);
    const copySignupInfo = { ...signupInfo }; // Create a copy of the signup state and extract the signupInfo here
    copySignupInfo[name] = value; // name add karni hai aur value ko update karna hai
    setsignupInfo(copySignupInfo); // now set the copySignupInfo to the signupInfo state
  };
  console.log("signupInfo->", signupInfo); // This will log the current state of signupInfo whenever it changes// Runtime per jo b value set ho rahi hai, wo yahan par print hogi
  //signupInfo-> {name: 'sdd', email: 'sdd@gmail.com', password: '1234'}
  //handleSignup is a API call
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name ,email & password are required");
    }
    try {
      const url = "https://fin-app-backend.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      // checking the re  sult
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details); //passw must be 4 character long //
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        {/*  signup form component */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
      <ToastContainer />
      {/* Add toast notifications here */}
    </div>
  );
}

export default Signup;
