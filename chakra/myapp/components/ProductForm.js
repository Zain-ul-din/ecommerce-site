import React, { useReducer } from "react"
import  {  Button , MenuGroup, Stack , useToast } from "@chakra-ui/react"
import { Toaster } from "../Helpers/Toaster"
import {
    Flex,
    Center,
    Text,
    Menu ,
    MenuButton ,
    MenuList ,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react"

import { EVENT_NAME , socket } from "../Hooks/RandomsHooks"

import {
ChevronDownIcon ,
CheckIcon
} from '@chakra-ui/icons'

import { uploadFile } from "../Helpers/ApiFetcher";
import axios from "axios";

import Link from "next/link"

import  {
    InputField  ,
    FileInputField,
    TagsRenderer,
    TextInputField
} 
from '../Helpers/InputHelpers'

function reducer ( state , action ) {
    
    switch (action.type) {
        case 'name': 
        return {...state , data : {...state.data , name : action.payload} 
            , errors : {...state.errors ,
            name : { error : action.payload.length > 1 ? undefined : '🎇' ,
            message : 'product name is too short'}}}
              
        case 'price':
            return {...state , data : {...state.data , price : Math.abs(action.payload)} 
            , errors : {...state.errors ,
            price : { 
            error : action.payload.length > 0  ? undefined : '🎇' ,
            message : 'invalid price'}}}
        
        case  'description':
            return {...state , data : {...state.data , description : action.payload}
            , errors : {...state.errors ,
                description : { error : action.payload.length > 0 ? undefined : '🎇' ,
                message : 'description missing'}}}
            
        case 'countInStock':
            return {...state , data : {...state.data , countInStock : action.payload} 
            , errors : {...state.errors ,
                countInStock : { error : action.payload.length > 0 ? undefined : '🎇' ,
                message : 'enter products in stock'}}}  
        case 'image' :
            return {...state , data : {...state.data , image : action.payload} 
            , errors : {...state.errors ,
            countInStock : { error : undefined ,
            message : 'enter products in stock'}}} 
        case 'category':
            return {...state , data : {...state.data , categoryName : action.payload.name 
                , category_id : action.payload.id},
            errors : {...state.errors , categoryName : {
                error : undefined , message : '' }}}
        case 'tags' :
            return {...state , data : {...state.data , tags : action.payload} 
            , errors : {...state.errors ,
             tags : { error : undefined ,
            message : ''}}}   
        case 'brand':
          return {...state , data : {...state.data , brand : action.payload} 
          , errors : {...state.errors ,
          brand : { error : action.payload.length > 1 ? undefined : '🎇' ,
          message : 'brand name is too short'}}}
        case 'reset':
            return  { data : {} , errors : {} }                        
    } 
    
    return state
}

export async function getStaticProps(context) {
    
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`)
    
    return {
      props: {
        categories : data.data
      }
    }
}

export default function UploadProduct
    (props) {
    
    const toast = useToast()
    const [rstate , dispatch] = useReducer(reducer , {data : props.payload , errors : {}}) 

    
    async function handleUpload
    () {
       
        const {errors} = rstate
        
      if (Object.entries(errors).length < 7 ) {
            Toaster (toast,"Input Fields are missing !!"  , 'error' )
            return 
      }
        
      const requied = ['name' , 'price' , 'description' , 'image' , 'countInStock' , 'categoryName' , 'tags' , 'brand']
        
      for (let [ key, val] of Object.entries (errors))
            if (val.error !== undefined || !requied.includes(key)) {
                Toaster (toast,"Input Fields are missing !!"  , 'error' )
                return
            }
        
        await uploadFile(rstate.data.image, async (imageUrl) => {
            if (!imageUrl.data) {
                Toaster(toast, "image upload fail", "error")
                return
            }
            
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, {
                product : {...rstate.data , image : imageUrl.data }
            }).catch(async (err) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`)
                Toaster(toast, "upload fail", "error")
            })
            
            if (res)  {
                Toaster(toast, "data has been uploaded", "success")
                dispatch ({type : 'reset'})
            } else Toaster(toast, "some thing went wrong", "error")
        })
    }

    async function handleUpdate () {
      const { errors } = rstate
       
      for (let [ , val] of Object.entries (errors)) {
          if (val.error !== undefined) {
            Toaster (toast,"Input Fields are missing !!"  , 'error' )
            return
          } 
      }
      
      const { data } = rstate
      
      if (data.image !== null) {
        // upload image also
        await uploadFile(data.image, async (imageUrl) => {
          if (!imageUrl.data) {
               Toaster(toast, "image upload fail", "error")
               return
          }
          
          const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${data.id}`, {
              product : {...data , image : imageUrl.data }
          }).catch(async (err) => {
              console.log(err)
              await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`)
              Toaster(toast, "data upload fail Internet Connection Error..", "error")
          })
          
          if (res) {
            socket.emit (EVENT_NAME , '🧐')
            Toaster (toast , 'data has been saved !' , 'success')
          }  
        })
        dispatch ({type : 'image' , payload : null})
      } else {
        // simply do it
        try {
          const res = await axios.put (`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${data.id}` , {
           product :  data
          })
          if (res) {
            socket.emit (EVENT_NAME , '🧐')
            Toaster (toast , 'data has been saved !' , 'success')
          }  
        } catch (err) {
          Toaster (toast , 'data update fail internet connection error !' , 'error') 
          return 
        }
      }
        
    }



    return (
        <>
  {" "}
  <Flex
    w={"100%"}
    justifyContent={"center"}
    alignContent={"center"}
    p={10}
    flexDirection={"column"}
    bg={"whiteAlpha.800"}
  >
    <Center>
      <Text fontSize={"3xl"}>PRODUCT FORM</Text>
    </Center>

    <InputField
      name="name"
      label="Enter Name"
      type={"text"}
      state={rstate}
      dispatch={dispatch}
    />

    <Flex justifyContent={"center"} mt={5}>
      {props.mode !== 'update' && 
      <Menu>
        <MenuButton
          as={Button}
          variant={"solid"}
          size={"lg"}
          rightIcon={rstate.data.category_id ? <CheckIcon/> : <ChevronDownIcon />}
          color = {rstate.data.category_id ? 'green.400' : ''}
        >
          Select Category
        </MenuButton>
        <MenuList>
          {props.categories &&
            props.categories.map((category, key) => {
              return (
                <MenuGroup textDecoration = {'underline'} title={category.name} key = {key} cursor = 'default' m = {2}>
                    
                    {category.categories && category.categories.map ((val , idx)=>{
                        return <MenuItem
                        icon={<CheckIcon opacity = {rstate.data?.category_id === val.id ? 1 : 0} />}
                        key = {idx} color = {'whatsapp.700'}
                        onClick = {(e)=>dispatch ({type : 'category' , payload : val})}
                        >{val.name}</MenuItem>
                    })}
                    
                    {category.categories.length === 0 && 
                    <Link href={'/category/upload'}>
                    <MenuItem color={'blue.400'}>
                       Add +
                    </MenuItem></Link> }
                <MenuDivider />    
                </MenuGroup>
              )
            })}
            
            <Link href={'/category/upload'}>
            <MenuItem textDecoration={'underline'} color={'blue.700'}>
                       Add More +
            </MenuItem></Link>
            
        </MenuList>
      </Menu>}
    </Flex>

    <InputField
      name="price"
      label="Enter Price"
      type={"number"}
      state={rstate}
      dispatch={dispatch}
    />

    <TextInputField
      name="description"
      label="Enter Description"
      type={"text"}
      state={rstate}
      dispatch={dispatch}
    />

    <InputField
      name="countInStock"
      label="Enter Count In Stock"
      type={"number"}
      state={rstate}
      dispatch={dispatch}
    />

    <InputField
      name="brand"
      label="Enter Brand Name"
      type={"text"}
      state={rstate}
      dispatch={dispatch}
    />

    <FileInputField
      name="image"
      label="Select Image"
      state={rstate}
      dispatch={dispatch}
    />

    <Center py={2} fontWeight={"bold"}>
      <Text>TAGS :- </Text>
      <Stack direction="row">
        {rstate.data.tags && <TagsRenderer tags={rstate.data.tags} />}
      </Stack>
    </Center>

    <TextInputField
      name="tags"
      label="Enter Tags"
      type={"text"}
      state={rstate}
      helperText={"Example :-  #new  #top"}
      dispatch={dispatch}
    />

    <Center p={5}>
      {props.mode === 'update' ? 
      <Button
      size={"lg"}
      color="green.600"
      variant={"outline"}
      onClick={handleUpdate}
      >
      SAVE
     </Button>
      :
      <Button
        size={"lg"}
        color="green.600"
        variant={"outline"}
        onClick={handleUpload}
      >
        SUBMIT
      </Button>}
    </Center>
  </Flex>
</>
)
}







