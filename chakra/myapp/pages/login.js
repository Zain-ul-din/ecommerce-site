import {
    Flex,
    Box,
    Stack,
    Link,
    Heading,
    Text,
    useColorModeValue,
    Center,
    useToast
} from '@chakra-ui/react';

import {FaTwitter, FaFacebook} from 'react-icons/fa';
import {Toaster} from "../Helpers/Toaster"

import {
    auth
    , SignInWithPopup
    , providers
    , SignOut
} from '../Helpers/firebase';

import {FcGoogle} from 'react-icons/fc'
import axios from "axios";
import Router from "next/router";


export default function Login() {

    const toast = useToast()

    async function handleSignIn (email) {
        // checks user already in record
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${email}`)
        const { data } = res.data

        if (!data) {
            Toaster(toast , 'account not exists use sign up' , 'error')
            await Router.push('/signup')
            return
        }

        Toaster(toast , 'login success' , 'success')
    }

    async function SignInWithGoogle() {
        const res = await SignInWithPopup(auth, providers.google)
        console.log(res)
        const {email} = res.user
        console.log(res, ' : ', email)

        await handleSignIn(email)
    }

    async function SignInWithFacebook() {
        const res = await SignInWithPopup(auth, providers.facebook)
        const {email} = res._tokenResponse
        console.log(res, ' : ', email)

        await handleSignIn(email)
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={10}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in </Heading>
                    <Center>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            With Your <Link color={'blue.400'}>Social Account</Link>
                        </Text>
                    </Center>
                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={3} px={10}>
                        <Box>
                            <Center>
                                <Heading fontSize={'2xl'}>One Tap Auth</Heading>
                            </Center>
                        </Box>
                        <Box>
                            <Center>
                                <Box padding={2} role={'button'} onClick={async (e) => SignInWithGoogle()}>
                                    <Heading fontSize={'3xl'}> <FcGoogle/></Heading>
                                </Box>
                                <Box padding={2} role={'button'} onClick = {(e)=>{}}>
                                    <Heading fontSize={'3xl'} color='blue.300'> <FaTwitter/> </Heading>
                                </Box>
                                <Box padding={2} role={'button'} onClick={async (e) => SignInWithFacebook()}>
                                    <Heading fontSize={'3xl'} color='blue.500'> <FaFacebook/> </Heading>
                                </Box>
                            </Center>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}