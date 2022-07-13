import React, { useReducer , useEffect , useContext} from "react";
import { cartContext  } from "../Hooks/RandomsHooks";
import { userContext } from '../Hooks/Context'

import { 
      Grid 
    , Table  
    , TableContainer 
    , Thead 
    , Tr 
    , Th 
    , Tbody 
    , Text 
    , Center 
    , Flex
    , NumberInput
    , NumberInputField
    , NumberInputStepper
    , NumberIncrementStepper
    , NumberDecrementStepper, 
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Stack,
    Box
} 
from "@chakra-ui/react"

import {  InputField , TextInputField } from "../Helpers/InputHelpers"
import Link from "next/link";




export default function Order (props) {
    
    function reducer (state , action) {
     // userName , address , addressGoogle , postalCode , city , country , orderId  , email , contactNumber 
     switch (action.type) {
      case 'userName':
          return {
               ...state 
              , data : {...state.data , userName : action.payload} 
              , errors : {...state.errors , userName : {error : action.payload.length > 2 ? undefined : '🤯' , message : 'Name is too short' }}
          }
      case 'country':
        return {
          ...state 
         , data : {...state.data , country : action.payload} 
         , errors : {...state.errors , country : {error :  undefined  , message : '' }}
        }  
      case 'city':
        return {
          ...state 
         , data : {...state.data , city : action.payload} 
         , errors : {...state.errors , city : {error : action.payload.length > 2 ? undefined : '🤯' , message : 'City name is too short' }}
        }  
      case 'address':
        return {
          ...state 
         , data : {...state.data , address : action.payload} 
         , errors : {...state.errors , address : {error : action.payload.length >= 10 ? undefined : '🤯' , message : `${10 - action.payload.length} more to go` }}
        } 
      case 'postalCode':
        return {
          ...state 
         , data : {...state.data , postalCode : action.payload} 
         , errors : {...state.errors , postalCode : {error : action.payload.length > 3 ? undefined : '🤯' , message : 'Invalid postal Code' }}
        } 
      case 'contactNumber':
        return {
          ...state 
         , data : {...state.data , contactNumber : action.payload} 
         , errors : {...state.errors , contactNumber : {error : action.payload.length === 11 ? undefined : '🤯' , message : 'Contact Number seems like invalid' }}
        }  
      case 'email':
        return {
          ...state 
         , data : {...state.data , email : action.payload} 
         , errors : {...state.errors , email : {error : undefined  , message : 'Contact Number seems like invalid' }}
        }   
     }
    }
    
    const context = useContext (cartContext)
    const loggedInUser = useContext (userContext)
    const [state , dispatch] = useReducer (  reducer ,{ data : {} , errors : {} } ) 
    
    console.log (state)

    async function handleUploadOrder () {
      // validation
      if (context.products.length === 0) { return }
       
      let totalBill =  0
      for (let product of context.products) totalBill += isNaN (parent(product.totalBill)) ? 0 : parent(product.totalBill)
      
      const userId = loggedInUser.user.id

      const order = { totalBill , userId }
      const orderItems = context.products
      
    }

    useEffect (()=> {
        if (!loggedInUser.user) return  
      //  dispatch ({type : 'userName' , payload : loggedInUser.user.name})
         dispatch ({type : 'country' , payload : 'Pakistan'})
    } , [])
    
    return (
      <>
        <OrderDetails products = {context.products} cart = {context}/>
        <CheckOutForm state={state} dispatch = {dispatch}/>
      </>
    )
}

export function OrderDetails (props) {
    
    
    return ( 
    <> 
    <Center><Text fontSize={'2xl'} fontWeight = {'bold'} mt = {5} fontFamily = {'monospace'}>ORDER</Text></Center>
    <Grid  gridAutoFlow={'column'} 
         mt = {2}
         gap = {1}
         p = {2}
         px = {{lg : 60 , md : 30 , sm : 1 , base : 0}}
         overflowX = {'auto'}
         overscrollBehaviorX = {'contain'}
         className = {'boardslist'}
        >
    <TableContainer rounded={'base'}>
    <Table size='sm' variant={'striped'}>
     <Thead>
      <Tr bg = {'gray.300'}>
        <Th py = {5}>Product Name</Th>
        <Th>Price</Th>
        <Th>Quality</Th>
        <Th>In Stock</Th>
        <Th>Total</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody >
      {props.products && props.products.map ( (product , idx) => <OrderMeta key = {idx} product = {product} context = {props.cart} /> )}
      <Tr bg = {'linkedin.100'}>
      <Th></Th>
      <Th></Th>
      <Th></Th>
      <Th fontSize = {'1xl'} fontWeight = {'medium'}>Total BILL : </Th>
      <Th py = {5} fontSize = {'1xl'} fontWeight = {'medium'}> {(() => {
        let total = 0
        props.products && props.products.forEach ((val) => 
          total += isNaN (parseInt(val.totalBill)) ? 0 : parseInt(val.totalBill)
        )
        return total
      })()} </Th>
      <Th></Th>
      </Tr>
    </Tbody>
    </Table>
    </TableContainer>
    </Grid>
    </>)
}

function OrderMeta ({product , context}) {
    
    useEffect (() => { 
        if (!product.qt || product.qt <= product.countInStock) return
        let qt = product.qt > product.countInStock ? product.countInStock : product.qt 
        console.log ( 'QT : ', qt)
        context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : isNaN(product.qt * product.price) ? 0 : product.qt * product.price  , qt }})
    } , [product])
      
    
    useEffect (()=> {
        if (product.qt) {
         let qt = parseInt (product.qt)
         context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : qt * product.price , qt }})
        } 
    } , [])

    return ( 
        
        <Tr  bg = {'gray.100'} _hover = {{bg : 'white'}} cursor = {'pointer'}>
            <Th py = {3} _hover = {{color : 'blue.600'}}>{ <Link  href = {`/product/${product.id}`}>{product.name}</Link>}</Th>
            <Th >{product.price}</Th>
            <Th>{
                parseInt(product.countInStock) === 0 ? <Text color={'red'}>Out Of Stock</Text> :
                <NumberInput size='sm' maxW={20} defaultValue={1} min={1} max = {product.countInStock} 
                value = {isNaN(product.qt) ? '' : product.qt }
                onChange = {( _ , number)=> { 
                 let qt = Math.abs(number) 
                 context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : isNaN(qt) ? 0 : qt * product.price  , qt }})
                }}
                isInvalid = {isNaN(product.qt)}
                onFocus = {(e)=> {
                 e.preventDefault ()
                 if (!isNaN (product.qt)) return
                 let qt = 1
                 context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : qt * product.price , qt }})   
                }}
                variant = {'filled'}
                allowMouseWheel >
                <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
               </NumberInput>
            }</Th>
            <Th>{product.countInStock}</Th>
            <Th>{product.totalBill}</Th>
            <Th><Button colorScheme={'red'} onClick = {(e)=>{
                e.stopPropagation ()
                context.dispatch ({type : 'Delete' , payload : {id : product.id}})
            }}>Delete</Button></Th>
        </Tr>
    )
}

import { countryList } from "../Helpers/constants";
import { ChevronDownIcon } from '@chakra-ui/icons'

export function CheckOutForm ({state , dispatch}) {
       
  return (
    <>
      <Center><Text fontSize={'2xl'} fontWeight = {'bold'} mt = {5} fontFamily = {'monospace'}>ORDER DETAILS</Text></Center>
     

      <Stack>
        <Center>
         <InputField 
           name = 'userName'
           type= {'text'}
           label = {'Enter your full name*'}
           helperText = {''}
           state = {state}
           dispatch = {dispatch}
         />
        </Center>
        
        <Center>
          <InputField 
           name = 'city'
           type= {'text'}
           label = {'Enter your city name*'}
           helperText = {''}
           state = {state}
           dispatch = {dispatch}
          />
         </Center>
        
        <Center>
         <TextInputField 
          name = 'address'
          type = {'text'}
          label = {'Enter full Address*'}
          helperText = {'enter your full address so we can easily find you'}
          state = {state}
          dispatch = {dispatch}
         />
        </Center>

        <Center>
          <InputField 
            name = 'postalCode'
            type = {'number'}
            label = {'Enter Postal Code (optional)'}
            state = {state}
            dispatch = {dispatch}
          />
        </Center>

        <Center>
          <InputField 
            name = 'contactNumber'
            type = {'number'}
            label = {'Enter Contact Number*'}
            state = {state}
            dispatch = {dispatch}
          />
        </Center>

         <Center>
        <Menu computePositionOnMount = {false}  direction = {'ltr'} isLazy mb = {10}>
          <MenuButton> 
            <Button>Country : {state.data.country} <ChevronDownIcon/> </Button>
         </MenuButton>
         <MenuList position={'fixed'} maxH = {'30vh'} overflowY = {'scroll'} onScroll = {()=> {}}>
          {countryList && countryList.map ( (country , idx ) => <MenuItem  key = {idx}
          onClick = {(e)=> dispatch ({type : 'country' , payload : country})}
          >{country}</MenuItem>)}
         </MenuList>
         </Menu>
        </Center>
      </Stack>
      <Flex mt = {10} />
      
    </>
   )
}