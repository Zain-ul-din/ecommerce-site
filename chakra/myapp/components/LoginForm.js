import  { useState  , useContext } from 'react'
import { userContext as userState } from '../Hooks/Context'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Center,
    useToast
} from '@chakra-ui/react'

import { Toaster } from '../Helpers/Toaster'
import Router from 'next/router'

import {FaTwitter, FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

import {
     auth
    , SignInWithPopup
    , providers
    , SignOut 
    , SignOutUser
} from '../Helpers/firebase'

import { useHttpie as httpPower } from '../Hooks/RandomsHooks'




export default function LoginForm ( {mode = 'signin' | 'signup'} ) {
    
    const toast = useToast()
    const [ state , setState ] = useState({})
    const userContext = useContext(userState)

    async function SignInWithGoogle() {
        SignOutUser(false)

        try {
            var res = await SignInWithPopup(auth, providers.google)
            
        } catch (err) {
            const email = err.customData.email;
            
            if (mode === 'signup') {
                setState({...state , email : email , auth : 'Google' , showData : true })
                return
            }
            
            await handleSignIn(email)
            return
        }
        
        const { email } = res.user
        const  { photoURL } = res.user

        if (mode === 'signup') {
            setState({...state , email : email , auth : 'Google' , showData : true , avatar : photoURL })
            return
        }
        
        await handleSignIn(email)
    }
    
    async function SignInWithFacebook() {
        SignOutUser(false)

        try {
            var res = await SignInWithPopup(auth, providers.facebook)
        }
        catch (err) {
            const email = err.customData.email;

            if (mode === 'signup') {
                setState({...state , email : email , auth : 'Facebook' , showData : true})
                return
            }
            
            await handleSignIn(email)
            return
        }
        
        const { email } = res._tokenResponse
        const  { photoURL } = res._tokenResponse
         
        if (mode === 'signup') {
            setState({...state , email : email , auth : 'Facebook' , showData : true , avatar : photoURL })
            return
        }
        
        await handleSignIn(email )
    }
    
    async function handleSignIn (email ) {

        const res = await httpPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${email}` , 'GET')
        const { data } = res.data
        
        // checks user already in record
        if (!data) {
            Toaster(toast , 'account not exists use sign up' , 'error')
            await Router.push('/signup')
            return
        }
        
        userContext.setUser (data[0])
        Toaster(toast , 'login success' , 'success')
        await Router.push ('/')
    }
    
    async function HandleSignUp () {
        
        if (!state.name || state.email === null) {
            if (!state.name) Toaster(toast , 'please enter name' , 'error' )
            if (state.name && state.name.trim().length < 2) Toaster(toast , 'user name is too short' , 'error' )
            return
        }
        
        // checks user already in record
        const res = await httpPower(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${state.email}` , 'GET')
        const { data } = res.data
        
        if (data && data.length !== 0) {
            Toaster(toast , 'account already exists use sign in ' , 'error' )
            await Router.push('/login')
            return
        }

        let error = null
        
        const userRes = await httpPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/` , 'POST' ,{
            user : state
        }).catch (err => error = err)
        
         
        if (error) {
            Toaster(toast , 'sign up fail some thing went wrong' , 'error' )
            return
        }
        
        const newUser = await httpPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${state.email}` , 'GET')
        userContext.setUser (newUser.data.data[0])

        Toaster(toast , 'sign-up succeed' , 'success' )
        await Router.push ('/')
    }

    return (
        <>
        <Flex minH={ '100vh'} align={ 'center'} justify={ 'center'} bg={useColorModeValue( 'gray.50', 'gray.800')}>
	    <Stack spacing={8} mx={ 'auto'} maxW={ 'xl'} py={12} px={14}>
		<Stack align={ 'center'}>
			<Heading fontSize={ '4xl'} textAlign={ 'center'}> {mode} </Heading>
			<Text fontSize={ 'md'} color={ 'gray.600'}> with your Social Account </Text>
		</Stack>
		<Box rounded={ 'lg'} bg={useColorModeValue( 'white', 'gray.700')} boxShadow={ 'lg'} p={8}>
			<Stack spacing={3}>
				<HStack>
					<Stack px={10}>
						<Text fontSize={ '1xl'} color='blue.300' align={ 'center'}> Select Account </Text>
					</Stack>
				</HStack>
				<HStack align={ 'center'}>
					<Center px={8}>
						<Box padding={2} role={ 'button'} onClick={async (e)=> SignInWithGoogle()}>
							<Heading fontSize={ '3xl'}>
								<FcGoogle/>
							</Heading>
						</Box>
						<Box padding={2} role={ 'button'} onClick={(e)=> { }}>
							<Heading fontSize={ '3xl'} color='blue.300'>
								<FaTwitter/> </Heading>
						</Box>
						<Box padding={2} role={ 'button'} onClick={async (e)=> SignInWithFacebook()}>
							<Heading fontSize={ '3xl'} color='blue.500'>
								<FaFacebook/> </Heading>
						</Box>
					</Center>
				</HStack> 
                {
                 state.showData &&
				 <>
					<FormControl id="email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input type="email" value={ state.email ? state.email : ''} onChange={()=>{}} /> </FormControl>
					<FormControl id="email" isRequired>
						<FormLabel>Name</FormLabel>
						<Input type="text" name={ "name"} placeholder={ 'enter your user name'} onChange={(e)=> setState({...state , name : e.target.value })}/> </FormControl>
					<Stack spacing={10} pt={2}>
						<Button onClick={ HandleSignUp } loadingText="Submitting" size="lg" bg={ 'blue.400'} color={ 'white'} _hover={{ bg: 'blue.500', }}> Sign up </Button>
					</Stack>
				 </>
                }
					{ mode === 'signup' && <Stack pt={5}>
						<Text align={ 'center'}> Already a user?
							<Link color={ 'blue.400'}>Login</Link>
						</Text>
					</Stack> }
			    </Stack>
		    </Box>
	    </Stack>
    </Flex>
    </>
)
}