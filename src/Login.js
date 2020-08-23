import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./Firebase";

function Login() {
  const history =useHistory();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  
  

  const login =(event)=>{
    event.preventDefault();   //prevent refresh on form
    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
        history.push('/');
    })
    .catch((e)=>alert(e.message));
  };

  const register= (event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth)=>{
        history.push('/');
    })
    .catch((e)=>alert(e.message));
  }

  return (
    <div className="login">
       <Link to="/">
          <img src="https://sguru.org/wp-content/uploads/2018/02/amazon_logo_RGB.jpg" />
        </Link>
      <div className="login_container">
       
        <h1>Sign in</h1>
        <form>
          <label>Email</label>
          <input value={email} onChange={event=>setEmail(event.target.value)} type="email" />
          <label>Password</label>
          <input  value={password} onChange={event=>setPassword(event.target.value)} type="password" />
          <button onClick={login} className="login_btn">Sign in</button>
        </form>
        
        <p> By continuing, you agree to Amazon's Conditions of Use and Privacy
             Notice.</p>
      <button onClick={register} className="create_btn">Create Account</button>
        
      </div>

      
    </div>
  );
}

export default Login;
