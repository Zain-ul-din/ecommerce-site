import React from 'react'
import axios from 'axios'
import {
    useColorModeValue,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Text
} from "@chakra-ui/react";

import {useState} from 'react'

import {fs} from 'fs'
import {path} from 'path'

export async function getStaticProps() {
  
  return { props : {} }
}

async function uploadFile (file) {
    const url = 'http://localhost:8000/static/'
    let formData = new FormData();
    formData.append("image_upload", file);
    
    const res = await axios.post(url , formData , {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
    }).catch (err => console.log(err))
    console.log(res)
}



export default function Test () {
  const [state , setState] = useState ('')
    

  async function HandleResize () {
    if (!state.image) return
    
  
  
  }

    return (
        <>
            <input type = {'file'} onChange = {(e)=>setState ({...state , image : e.target.files[0]})}/>
            <button onClick={HandleResize}>Submit</button>
        </>
    )
}