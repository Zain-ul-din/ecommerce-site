import React  from "react"

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
    Center
  } from '@chakra-ui/react';
  import { useState } from 'react';

  import {  FaTwitter, FaFacebook } from 'react-icons/fa'
  import  {FcGoogle} from 'react-icons/fc'

  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  
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
               
               <Stack px = {10}>
                 <Text fontSize={'1xl'} color = 'blue.300' align = {'center'}>
                  Select Account
                  </Text>
                  </Stack>
                </HStack>
                <HStack align={'center'}>  
               
                 <Center px = {8}>
                    <Box padding={2} role= {'button'}>
                     <Heading fontSize={'3xl'} > <FcGoogle/></Heading>
                    </Box>
                    <Box padding={2} role= {'button'}>
                    <Heading fontSize={'3xl'} color = 'blue.300'> <FaTwitter/> </Heading>
                    </Box>
                    <Box padding={2} role= {'button'}>
                    <Heading fontSize={'3xl'} color = 'blue.500'> <FaFacebook/> </Heading>   
                    </Box>
                 </Center>
             

              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
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
