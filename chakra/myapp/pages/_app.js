import { ChakraProvider , extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'

import { useEffect , useState } from 'react'
import { userContext , categoriesContext } from '../Hooks/Context'
import { cookieName } from '../Helpers/constants'
import { getUserByToken } from '../Helpers/Auth'


import Header from '../components/Header'
import { useHttpie as power , cartContext , useCart} from '../Hooks/RandomsHooks'
import { socket } from '../Hooks/RandomsHooks'


// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  
  const [ user , setUser ] = useState ({})
  const [categories , setCategories] = useState ({})

  const cart = useCart ()

  useEffect (()=>{
    
    const cookie = document.cookie.match (cookieName)
    
    async function FetchCategories () {
      const { data } = await power (`${process.env.NEXT_PUBLIC_SERVER_URL}/category` , 'GET')
      setCategories ({categories : data.data , setCategories : setCategories})
    }
    
    // listen for userChange Event
    socket.on ('onUserChange' , async (email) => {
      if (!user) return
      if (user.email == email) {
        const newUser = await power (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${email}` , 'GET')
        setUser (newUser.data.data[0])
      }
    })
    
    if (cookie === null) {
      setUser (null)
      FetchCategories()
      return
    }
    
    setUser (getUserByToken (cookie.input))
    FetchCategories()

  } , [])
  
  return (
    <ChakraProvider theme={theme}>
      <userContext.Provider value={{user , setUser}}>
       <categoriesContext.Provider value = {categories}>  
        <cartContext.Provider value={cart}>
          <Header/>  
          <Component {...pageProps} />
        </cartContext.Provider>  
       </categoriesContext.Provider> 
      </userContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp

// AIzaSyDg0Sl7MkjfTzR0Sho0I2-abhqojhuKL2k