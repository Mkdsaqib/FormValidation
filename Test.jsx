import React, { useState } from "react";
import "./Test.css";
import Facebook from "../MyComponent/images/face.svg";
import Google from "../MyComponent/images/google.svg";
import Linkedin from "../MyComponent/images/in.svg";

export const Test = () => {


  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    Cpassword: "",
  });

  const [items, setItems] = useState([]); 
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const addItem = (e) => {
    e.preventDefault();

    if (!inputData.name || !inputData.username || !inputData.email || !inputData.contact || !inputData.password || !inputData.Cpassword) {
      setMessage("All fields are required for SignUp.");
      return;
    }
   
    if (inputData.password !== inputData.Cpassword) {
      setMessage("Passwords do not match.");
      return;
    }

  const passwordValidation = (password) => {
    const rules = {
    minLength: password.length >= 8,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /\d/.test(password),
    capital: /[A-Z]/.test(password),
    };

    return Object.values(rules).every(Boolean);
  };

  if (!passwordValidation(inputData.password)) {
    setMessage("Password must be at least 8 characters long, contain a special character, a number, and a capital letter.");
    
    return;
  }
    setItems([...items, inputData]); 

    localStorage.setItem("items", JSON.stringify([...items,inputData]));

    setMessage("Sign Up successful! You can now Sign in.");
    
    setInputData({
      name: "",
      username: "",
      email: "",
      contact: "",
      password: "",
      Cpassword: "",
    });
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,  
    }));
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
  
    const storedUsers = JSON.parse(localStorage.getItem("items")) || [];
  
    const user = storedUsers.find(user => user.email === loginData.email);
  
    if (!user) {
      setMessage("User not found. Please sign up first.");
      return;
    }
  
    if (user.password !== loginData.password) {
      setMessage("Incorrect password.");
      return;
    }
  
    setMessage("Sign in successful!");

    
    
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  
   
  };
  
  







  








  const [signedIn, setSignedUp] = useState(false);

  const handleSignin = () => {
    setSignedUp(true);
  };
  const handleSignout = () => {
    setSignedUp(false);
  };
  return (
    <div>
      {signedIn ? (
        <div className="main-container">
          <div className="Container">
            <div className="welcome">
              <h1>Welcome Back!</h1>
            </div>
            <div className="paragraph">
              <p>
                To keep conneted with us please login <br /> with your personal
                info
              </p>
            </div>
            <div className="submit">
              <button type="submit" onClick={handleSignout} className="btn">
                SIGN IN
              </button>
            </div>
          </div>
          <div className="Container2">
            <div className="create-account">
              <h1>Create Account</h1>
            </div>
            <div className="social-media">
              <img className="icon" src={Facebook} alt="facebook" />
              <img className="icon" src={Google} alt="googleplus" />
              <img className="icon" src={Linkedin} alt="linkedin" />
            </div>

            <p>or use your email for regestration</p>
            <form onSubmit={addItem}>
              <div className="input-felid">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={inputData.username}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="contact"
                  type="number"
                  placeholder="Contact"
                  value={inputData.contact}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Create password"
                  value={inputData.password}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="Cpassword"
                  type="password"
                  placeholder="Confirm password"
                  value={inputData.Cpassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="submit">
                <button  type="submit" className="btn2">
                  SIGN UP
                </button>
              </div>
              {message && <p className="message">{message}</p>}
            </form>
          </div>
        </div>
      ) : (
        // -------------------------------LOGIN SESSION------------------------------

        <div className="main-container-login">
          <div className="Container2-login">
            <div className="create-account-login">
              <h1>Sign in</h1>
            </div>
            <div className="social-media-login">
              <img className="icon-login" src={Facebook} alt="facebook" />
              <img className="icon-login" src={Google} alt="googleplus" />
              <img className="icon-login" src={Linkedin} alt="linkedin" />
            </div>

            <p>or use your account</p>

            <form onSubmit={handleLogin}  className="input-felid-login">
              <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange}  required />
              <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange}  required />
              <div className="submit-login">
              <button type="submit" className="btn2-login">
                SIGN IN
              </button>
            </div>
            </form>
            <p className="forgot">
              Forgot your <span>password</span>?
            </p>
          
            {message && <p className="message">{message}</p>}
          </div>
          <div className="Container-login">
            <div className="welcome-login">
              <h1>Hello, Friend!</h1>
            </div>
            <div className="paragraph-login">
              <p>
                Enter your personal details and start
                <br /> journey with us
              </p>
            </div>
            <div className="submit-login">
              <button
                type="submit"
                onClick={handleSignin}
                className="btn-login"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
