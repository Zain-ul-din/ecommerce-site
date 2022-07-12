import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Popover ,
    PopoverTrigger ,
    PopoverContent ,
    Input ,
    PopoverHeader ,
    useToast,
    Switch
} from '@chakra-ui/react';

import { useEffect, useState ,useContext } from 'react'
import { Toaster } from '../Helpers/Toaster'
import { userContext } from '../Hooks/Context'
import { SignOutUser } from '../Helpers/firebase'
import { useHttpie as superPower } from '../Hooks/RandomsHooks'
import { cookieName } from '../Helpers/constants'

import { socket } from '../Hooks/RandomsHooks';

export default function SocialProfile ({user , setUser , mode = 'user'}) {
   
    const [userName , setUserName] = useState (user.name)
    const [isNameChanged , setIsNameChanged] = useState (false)
    const [loading , setLoading] = useState (false)

    const currentUser = useContext (userContext)

    const toast = useToast ()
    
    const [userStatus , setUserStatus] = useState ({})

    useEffect (()=>{
     setUserName (user.name)
     setUserStatus ({
      isAdmin : user.isAdmin ,
      isStuff : user.isStuff
    })
    } ,[user])
  

    async function handleStatusUpdate () {
      const res = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.email}` , 'PUT' , {
        user : {...user , name : userName.trim()  , isAdmin : userStatus.isAdmin , isStuff : userStatus.isStuff}
      }) 

      if (mode === 'user' ){
         await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.email}` , 'GET')
         currentUser.setUser ({...user , name : userName.trim() , isAdmin : userStatus.isAdmin , isStuff : userStatus.isStuff})
      }
      else socket.emit ('onUserChange' , user.email)
      Toaster (toast , 'Data has been Saved' , 'success')
    }
    

    return (
      <Center py={6} mt = {10}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={user.avatar}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={user.isActive ?{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            } : {}}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
           {userName}
           <Popover>
            <PopoverTrigger>
              <Button mx = {1} size = {'xs'}>Edit</Button>
            </PopoverTrigger>
            <PopoverContent bg={'white'} border = {'1px solid black'}>
            <PopoverHeader fontWeight='semibold' fontSize={`md`}>Edit Name</PopoverHeader>
             <Stack p = {1}>
              <Input type={'text'} placeholder = {`Enter New Name`} 
              value = {`${userName}`} onChange = {(e)=>{
                setUserName (e.target.value)
              }}/>
              {userName && userName.trim().length < 3 && <Text color={`red`} fontSize = {`xs`}> ! Name is too short</Text> }
              <Button colorScheme={userName && userName.trim().length > 2 ? `green` : `red`} 
              
              onClick = {async (e)=>{
                if ( userName.trim().length < 3  ) return
                if (isNameChanged && mode === 'user') return
                Toaster (toast , 'User Name Has Been Changed !' , 'success')
                setLoading (true)
                if (mode === 'user') document.cookie = cookieName + '=; Max-Age=-99999999;'

                const res = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.email}` , 'PUT' , {
                  user : {...user , name : userName.trim()}
                }) 
                
                if (mode === 'user' ){
                  await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.email}` , 'GET')
                  currentUser.setUser ({...user , name : userName.trim()})
                } else socket.emit ('onUserChange' , user.email)

                setLoading (false)
                setIsNameChanged (true)
              }}

              isLoading = {loading}
              >Save</Button>
             </Stack>
           </PopoverContent>
           </Popover>
          </Heading>
          
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {user.email}
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Text>Sign With : </Text> 
            <Badge
              px={2}
              py={1}
              colorScheme = {'whatsapp'}
              fontWeight={'400'}>
              {user.auth}
            </Badge>
          </Stack>
          
          
          <Center mt= {4}>
          <Stack direction={'row'} spacing = {2}>
             <Switch size = {'sm'} colorScheme = {userStatus.isAdmin ? 'green' : 'red' }  
             isReadOnly = {mode === 'user'}
             isChecked = {userStatus.isAdmin}
             onChange = {async (e)=>{
              setUserStatus ({...userStatus , isAdmin : !userStatus.isAdmin})
             }}>is Admin</Switch>

             <Switch 
              size = {'sm'} 
              isReadOnly = {mode === 'user'}
              colorScheme = {userStatus.isStuff ? 'green' : 'red' }  
              isChecked = {userStatus.isStuff}
              onChange = {async (e)=>{
              setUserStatus ({...userStatus , isStuff : !userStatus.isStuff})
             }}>is Stuff</Switch>
          </Stack>
          </Center>

          <Stack mt={6} direction={'row'} spacing={4}>
          { mode === 'user' &&  
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme = {'red'}
              onClick = {(e)=>{
                SignOutUser()
                setUser (null)
              }}
            >
              Signout
            </Button>  }

          {mode !== 'user' && 
          <Button
               flex={1}
               fontSize={'sm'}
               rounded={'full'}
               colorScheme = {'green'}
              onClick = {(e)=> {handleStatusUpdate()}}
              >
              Save
            </Button> }

            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              view orders
            </Button>
          </Stack> 
          
        </Box>
      </Center>
    );
  }