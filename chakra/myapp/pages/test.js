import { Button  , Center, Input , Textarea} from '@chakra-ui/react'
import React , { useState , useContext , useEffect } from 'react'


export async function getStaticProps() {
  return { props : {} }
}

// import { io } from 'socket.io-client'
// const socket = io ('http://localhost:8000/')

export default function Test () {
  
  const [text , setText] = useState ('')

  // useEffect (
  // () => {  
  //      try {
  //       socket.on('onProductChange', (msg)=> setText (msg))
  //      } catch (e) {
  //       console.error (e)
  //      }
  // } , [])
  
  return (
    <>
       {/* <Textarea 
        m = {5}
        type = {'text'}
        onChange = {(e)=>{
         // e.preventDefault ()
         // socket.emit ('onProductChange' , e.target.value)
        }}
        value = {text}
       />
       <Center>
       {text}
       </Center> */}
    </>
  )
}