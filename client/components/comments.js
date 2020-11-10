import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import {useForm} from 'react-hook-form';
import {createComment} from '../actions/comments';
function App() {
    const { register, handleSubmit } =useForm();
    const submitForm = (data) =>{
        createComment(data);

    }
    return (
      <div style={{marginTop:"400px", marginLeft:"400px"}}>
        <h4>My Form</h4>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="comment">Enter  your Comment</label>
          <input name="pnr_number" type="string" ref={register}></input>
          <input name="comment_by" type="string" ref={register}></input>
          <input name="facilityType" type="string" ref={register}></input>
       
    facilityType:String,
          <TextareaAutosize name="comment" aria-label="minimum height" ref={register}  rowsMin={3} placeholder="Minimum 3 rows" />
           <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  

export default App;