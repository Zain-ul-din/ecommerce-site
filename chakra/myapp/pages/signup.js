import React from "react"
import axios from "axios";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Center,
    useToast
} from '@chakra-ui/react';

import {Toaster} from "../Helpers/Toaster"
import {useState} from 'react';

import Router from 'next/router'

import {FaTwitter, FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

import {
    auth
    , SignInWithPopup
    , providers
    , SignOut
} from '../Helpers/firebase';

export default function Signup() {

    const [ state , setState ] = useState({})
    const toast = useToast()

    async function SignInWithGoogle () {
        // don't forget to remove the credential
        SignOut (auth)
        const res = await SignInWithPopup(auth, providers.google)
        console.log(res)
        const {email} = res.user
        if (email === null) {
            Toaster(toast , 'not verified email' , 'error' )
            setState({})
        }

        setState({...state , email : email , auth : 'Google' , showData : true})
    }

    async function SignInWithFacebook() {
        // don't forget to remove the credential
        SignOut (auth)
        const res = await SignInWithPopup(auth, providers.facebook)
        const {email} = res._tokenResponse
        if (email === null) {
            Toaster(toast , 'not verified email' , 'error' )
            setState({})
        }

        setState({...state , email : email , auth : 'Facebook' , showData : true})
    }

    async function HandleSignUp () {

        if (!state.name || state.email === null) {
            if (state.name && state.name.trim().length === 0) Toaster(toast , 'please enter name' , 'error' )
            return
        }

        // checks user already in record
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${state.email}`)
        const { data } = res.data

        console.log(data)
        if (data && data.length !== 0) {
            Toaster(toast , 'account already exists use sign in ' , 'error' )
            await Router.push('/login')
            return
        }

        let error = null
        const userRes = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/` , {
          user : state
        }).catch(err => error = err)

        if (error) {
            Toaster(toast , 'sign up fail some thing went wrong' , 'error' )
            return
        }

        Toaster(toast , 'sign-up succeed' , 'success' )
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={14}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'md'} color={'gray.600'}>
                        with your Social Account
                    </Text>
                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={3}>
                        <HStack>

                            <Stack px={10}>
                                <Text fontSize={'1xl'} color='blue.300' align={'center'}>
                                    Select Account
                                </Text>
                            </Stack>
                        </HStack>
                        <HStack align={'center'}>
                            <Center px={8}>
                                <Box padding={2} role={'button'} onClick={async (e) => SignInWithGoogle()}>
                                    <Heading fontSize={'3xl'}> <FcGoogle/></Heading>
                                </Box>
                                <Box padding={2} role={'button'} onClick={(e) => {
                                }}>
                                    <Heading fontSize={'3xl'} color='blue.300'> <FaTwitter/> </Heading>
                                </Box>
                                <Box padding={2} role={'button'} onClick={async (e) => SignInWithFacebook()}>
                                    <Heading fontSize={'3xl'} color='blue.500'> <FaFacebook/> </Heading>
                                </Box>
                            </Center>
                        </HStack>
                        {state.showData && <>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value = {state.email ? state.email : ''} onChange={()=>{}} />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name={"name"} placeholder={'enter your user name'}
                                   onChange={(e)=> setState({...state , name : e.target.value })}/>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick = {HandleSignUp}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack> </>}
                        <Stack pt={5}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
