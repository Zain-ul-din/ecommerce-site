import { useEffect, useState } from "react"
import { getUserByToken } from "../../Helpers/Auth"
import { LoadingComponent } from "../../components/CustomComponents"
import { cookieName } from "../../Helpers/constants"

export default function Orders () {
    
  const [loading , setLoading] = useState (true)
  const [user , setUser] = useState (null)
  
  useEffect (()=> {
    const cookie = document.cookie.match (cookieName)
    setUser (getUserByToken (cookie.input))
    setLoading (false)
  } , [])
  
  return (
        <>{ loading ? ( <LoadingComponent/> )  : <> {user.name + 'orders'} </> }</>        
  )
  
}

// looking ok