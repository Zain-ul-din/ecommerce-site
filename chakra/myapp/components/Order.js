import React, { useReducer , useEffect , useContext} from "react";
import { cartContext } from "../Hooks/RandomsHooks";

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
    , Stack 
    , Input
    , FormControl
    , Flex
    , NumberInput
    , NumberInputField
    , NumberInputStepper
    , NumberIncrementStepper
    , NumberDecrementStepper, 
    Button
} 
from "@chakra-ui/react"

import {  InputField } from "../Helpers/InputHelpers"

import Link from "next/link";

export default function Order (props) {
  
    function reducer (state , action) {
     switch (action.type) {
      case 'userName':
          return {
               ...state 
              , data : {...state.data , userName : action.payload} 
              , errors : {...state.errors , userName : {error : action.payload.length > 2 ? undefined : '🤯' , message : 'Name is too short' }}
          }
     }
    }
    
    const context = useContext (cartContext)
    const [state , dispatch] = useReducer (  reducer ,{ data : {} , errors : {} } ) 

    console.debug (state)

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

export function CheckOutForm ({state , dispatch}) {
       
  return (
    <>
      <Center><Text fontSize={'2xl'} fontWeight = {'bold'} mt = {5} fontFamily = {'monospace'}>ORDER DETAILS</Text></Center>
      <Flex p = {5}>
       <InputField 
         name = 'userName'
         type= {'text'}
         label = {'Enter your full name'}
         helperText = {''}
         state = {state}
         dispatch = {dispatch}
       />
      </Flex>
    </>
   )
}