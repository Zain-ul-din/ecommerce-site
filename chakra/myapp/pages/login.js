import {
    Flex,
    Box,
    Stack,
    Link,
    Heading,
    Text,
    useColorModeValue,
    Center ,
} from '@chakra-ui/react';
  
import {  FaTwitter, FaFacebook } from 'react-icons/fa';

import {   
    auth 
  , SignInWithPopup 
  , providers
  , SignOut
} from '../Helpers/firebase';

import  {FcGoogle} from 'react-icons/fc'
import { async } from '@firebase/util';



export default function Login() {

   async function SignInWithGoogle () {
    // don't forget to remove the credential
    sessionStorage.removeItem('credential');
    const res = await SignInWithPopup(auth , providers.google)
    console.log(res)
   }

   async function SignInWithFacebook () {
    // don't forget to remove the credential
    sessionStorage.removeItem('credential');
    const res = await SignInWithPopup(auth , providers.facebook)
    console.log(res)
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
                 With Your  <Link color={'blue.400'}>Social Account</Link>
               </Text>
            </Center>
          </Stack>
          
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={3} px= {10}>
              <Box>
                <Center>
                <Heading fontSize={'2xl'}>One Tap Auth</Heading>
                </Center>
              </Box>  
              <Box>
                 <Center>
                 <Box padding={2} role= {'button'} onClick = {async (e)=> SignInWithGoogle()}>
                     <Heading fontSize={'3xl'} > <FcGoogle/></Heading>
                    </Box>
                    <Box padding={2} role= {'button'}>
                    <Heading fontSize={'3xl'} color = 'blue.300'> <FaTwitter/> </Heading>
                    </Box>
                    <Box padding={2} role= {'button'} onClick = {async (e)=> SignInWithFacebook()}>
                    <Heading fontSize={'3xl'} color = 'blue.500'> <FaFacebook/> </Heading>   
                    </Box>
                 </Center>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }