// pages/_app.js
import { ChakraProvider , extendTheme } from '@chakra-ui/react'

import '../styles/globals.css'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

import {useEffect} from 'react'

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  
  useEffect(()=>{
    console.log(process.env.NEXT_PUBLIC_API_URL)
  } ,[])
  
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}


export default MyApp;