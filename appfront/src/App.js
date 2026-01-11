import logo from './logo.svg';
import './App.css';
import { useEffect, useState,React } from 'react';
import{Routes, useNavigate,Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Addnote from './components/Addnote';
import Editnote from './components/Editnote';

function App() {
  const[allnotes,setallnotes]=useState([]);
  const api=process.env.REACT_APP_API_URL;
  const [userloggedin,setuserloggedin]=useState(false);
  const checklogin=async()=>{
    try{
      const response=await fetch(`${api}/authorization`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        credentials:'include',
      })
      if(response.status===200){
        setuserloggedin(true);
      }
    }catch(error){
      console.log(error);
    }
  }
  const logout=async()=>{
    try{
      const response=await fetch(`${api}/logout`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        credentials:'include',
      })
      const result=await response.json();
      if(result.success){
        setuserloggedin(false);
        setallnotes([]);
        console.log("logged out successfully");
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    checklogin();
  },[userloggedin]);
  const navigate=useNavigate();
  
  return (
    <div id='dashboard'>
      <div id="heading">
        <div id='header'>Notes App</div>
        <div>
          {userloggedin?(<button onClick={logout}>Logout</button>):(<button onClick={()=>navigate('login')}>Login</button>)}
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home allnotes={allnotes} setallnotes={setallnotes} userloggedin={userloggedin}></Home>}></Route>
        <Route path='/login' element={<Login setuserloggedin={setuserloggedin}></Login>}></Route>
        <Route path='/addnote' element={<Addnote></Addnote>}></Route>
        <Route path='/editnote/:id' element={<Editnote></Editnote>}></Route>
      </Routes>
    </div>
  );
}

export default App;
