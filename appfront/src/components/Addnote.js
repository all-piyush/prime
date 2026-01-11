import React, { useState } from 'react'
import "./Addnote.css"
import { useNavigate } from 'react-router-dom';
const Addnote = () => {
    const apiurl=process.env.REACT_APP_API_URL;
    const navigate=useNavigate();
    const [title,settittle]=useState([]);
    const[content,setcontent]=useState([]);
    function changetitle(e){
        settittle(e.target.value);
    }
    function changecontent(e){
        setcontent(e.target.value);
    }
    const submitnote=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${apiurl}/addnote`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({title:title,content:content}),
                credentials:'include'
            })
            if(response.ok){navigate('/');}
        }catch(error){console.log(error)};
        
    }
  return (
    <form id='fullpage' onSubmit={submitnote}>
        <div id='addnote'>
            <div id="addnote-header">Add Note</div>
            <label className='label'>Title <br/>
           <input type='text' placeholder='Enter the Title' id='title' value={title} onChange={changetitle}></input>
           </label>
           <label className='label'>Content <br/>
           <textarea cols="50" placeholder='Enter Your Content' id='content' value={content}onChange={changecontent}></textarea>
           </label>
           <button className='addnotes save' type='submit'>Save</button>
        </div>
    </form>
  )
}

export default Addnote
