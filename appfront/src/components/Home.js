import React, { useEffect, useMemo, useState } from 'react'
import './Home.css';
import{useNavigate} from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const Home = (props) => {
  const apiurl=process.env.REACT_APP_API_URL;
  const allnotes=props.allnotes;
  const setallnotes=props.setallnotes;
  const userloggedin=props.userloggedin;
  const[search,setsearch]=useState("");
  const getallnotes=async()=>{
    try{
      const response=await fetch(`${apiurl}/getnote`,{
        method:"GET",
        headers:{"Content-type":"application/json"},
          credentials:'include'
      })
      const result=await response.json();
      setallnotes(result.allnotes); 
    }catch(error){
      console.log(error);
    }
  }
  const deletenote=async(id)=>{
    try{
      const response=await fetch(`${apiurl}/deletenote`,{
        method:"DELETE",
        headers:{"Content-type":"application/json"},
          body:JSON.stringify({noteid:id}),
          credentials:'include'
      })
      if(response.ok){
        setallnotes((prev)=>prev.filter((note)=>note._id!==id));
      }
    }catch(error){
      console.log(error);
    }
  }
  function searchhandle(e){
    if(!userloggedin){navigate('/login');}
    setsearch(e.target.value);
  }
  const getfilterednotes=useMemo(()=>{
    if(!search){return allnotes;}
    return allnotes.filter((notes)=>notes.title.toLowerCase().includes(search.toLowerCase()) || notes.content.toLowerCase().includes(search.toLowerCase()))
  },[allnotes,search])
  useEffect(()=>{
    getallnotes();
  },[])
    const navigate=useNavigate();
  return (
    <div >
      <div id="dashboard-title">Dashboard</div><br/>
      <div id='searcharea' ><CiSearch id='search-icon'/><input type='text' placeholder='Search notes...' id='searchbar' value={search}onChange={searchhandle}/></div>
      <br/>
      <button className='addnotes' onClick={()=>{if(!userloggedin){navigate('/login')} else{navigate('/addnote')}}}><FaPlus className='plus' /> Add Notes</button>
      <br/><br/>
      {!allnotes || allnotes.length===0 ?(<div id='empty-text'>
        
        <div id='text'>
          <div id='image'></div>
          <b>No Notes Yet </b>
          <div>Create Your First Note</div>
          <button className='addnotes' onClick={()=>{if(!userloggedin){navigate('/login')} else{navigate('/addnote')}}}><FaPlus className='plus'/>  Add Notes</button>
        </div>
      </div>):
      (<div id="allnotes">{getfilterednotes.map((note)=>{
        return <div className='note'>
          <div className='note-header'><b className='text'>{note.title}</b><div><button className="update"onClick={()=>{navigate(`/editnote/${note._id}`)}}><CiEdit /></button>
          <button className="delete" onClick={()=>deletenote(note._id)}><MdDelete /></button></div></div>
          <div>{note.content}</div>
          <div className='date'>{note.createdat}</div>
          
        </div>
      })}</div>)
      }
    </div>
  )
}

export default Home
