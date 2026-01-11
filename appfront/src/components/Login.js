import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import './Login.css'
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  const apiurl=process.env.REACT_APP_API_URL;
    const setuserloggedin=props.setuserloggedin;
    const navigate=useNavigate();
    const[newuser,setnewuser]=useState(false);
    const onsuccess=async(credentialResponse)=>{
      const decoded = jwtDecode(credentialResponse.credential);
      try{
        const response=await fetch(`${apiurl}/googlelogin`,{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({name:decoded.name,email:decoded.email,googleid:decoded.sub}),
          credentials:'include'
        })
        if(response.ok){
          setuserloggedin(true);
          navigate('/');
        }
      }catch(error){
        console.log(error);
        console.log("unable to login/signup");
      }
    }
    const[formdata,setformdata]=useState({name:"",email:"",password:""});
    function changedata(e){
      const{name,value}=e.target;
      setformdata((prev)=>({...prev,[name]:value}))
    }
    const formhandle=async(e)=>{
      e.preventDefault();
      const url=newuser?(`${apiurl}/signup`):(`${apiurl}/login`);
      try{
        const response=await fetch(`${url}`,{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(formdata),
          credentials:'include'
        })
        if(response.ok){
          setuserloggedin(true);
          navigate('/');
        }
      }catch(error){
        console.log(error);
        console.log("unable to login/signup");
      }
    }
  return (
    <div className='app-login'>
    {newuser===false?(
      <form id='login-form' onSubmit={formhandle}>
        <div className='heading-text'>Login</div>
        <label>Email <br/>
        <input type='email' placeholder='Enter Your Email' name="email" className='email' value={formdata.email} onChange={changedata} required></input>
        </label>
        <label htmlFor='password'>Password <br/>
        <input type="password" placeholder='Enter Your Password' name="password" className='password' value={formdata.password} onChange={changedata} required></input>
        </label>
        <button type='submit' id='login-button'>LOGIN</button>
        <div id='googlelogin'><GoogleLogin onSuccess={onsuccess} ></GoogleLogin></div>
        <div>Don't have an account? <button id="signup" onClick={()=>{setnewuser((prev)=>!prev);setformdata({name:"",email:"",password:""});}}>Sign up</button></div>
      </form>
    ):(
      <form id='signup-form' onSubmit={formhandle}>
        <div className='heading-text'>Sign Up</div>
        <label>Name <br/>
        <input type='text' placeholder='Enter Your Name' name="name" className='name' value={formdata.name} onChange={changedata} required></input>
        </label>
        <label>Email <br/>
        <input type='email' placeholder='Enter Your Email' name="email" className='email' value={formdata.email}onChange={changedata} required></input>
        </label>
        <label>Password<br/>
        <input type="password" placeholder='Enter Your Password' name="password" className='password' value={formdata.password} onChange={changedata} required></input>
        </label>
        <button type='submit' id='signup-button'>SIGN UP</button>
        <div id='googlelogin'><GoogleLogin onSuccess={onsuccess} ></GoogleLogin></div>
        <div>Already have an account? <button id="signup" onClick={()=>{setnewuser((prev)=>!prev);setformdata({name:"",email:"",password:""})}}>Login</button></div>
      </form>)}
    </div>
  )
}

export default Login
