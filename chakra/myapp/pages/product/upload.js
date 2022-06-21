import React, {useState , useReducer, useEffect} from "react"
import  { Button, useToast } from "@chakra-ui/react"
import { Toaster } from "../../Helpers/Toaster"
import {
    Flex,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    FormHelperText,
    FormErrorMessage,
    Center,
    Text,
    Select
} from "@chakra-ui/react"
import { Validator } from "../../Helpers/validator"
import { uploadFile } from "../../Helpers/ApiFetcher";
import axios from "axios";


function InputField ({name , type , label ,  helperText = '' , state , dispatch  }) {
    

    useEffect (()=>{
       setInterval(()=>console.log('time out') , 1000)
    } , [])
    
    const isError = state.errors[name] ? state.errors[name].error ? true : false : false;
    
    return ( <Flex w = {'100%'} justifyContent={'center'} > 
        <Flex w = '2xl' py = {'1'}>
            <FormControl isInvalid={isError}>
                    <FormLabel>{label}</FormLabel>
                <Input type = {type}
                       onChange={(e)=> dispatch({type : name , payload : e.target.value })}
                       value = {state.data[name] ? state.data[name] : ''}
                />

                {/* Error Handler */}

                {isError ? (
                <FormErrorMessage > {state.errors[name].message}</FormErrorMessage>) 
                : (<FormHelperText>{helperText}</FormHelperText> )}
                
            </FormControl>
        </Flex>
    </Flex>  )
}

function TextInputField ({name , type , label ,  helperText = '' , state , dispatch  }) {
    
    const isError = state.errors[name] ? state.errors[name].error ? true : false : false;
    

    
    return ( <Flex w = {'100%'} justifyContent={'center'} > 
        <Flex w = '2xl' py = {'1'}>
            <FormControl isInvalid={isError}>
                    <FormLabel>{label}</FormLabel>
                <Textarea type = {type}
                       onChange={(e)=> dispatch({type : name , payload : e.target.value })}
                       value = {state.data[name] ? state.data[name] : ''}
                />

                {/* Error Handler */}

                {isError ? (
                <FormErrorMessage > {state.errors[name].message}</FormErrorMessage>) 
                : (<FormHelperText>{helperText}</FormHelperText> )}
                
            </FormControl>
        </Flex>
    </Flex>  )
}

function FileInputField ({name , label ,  helperText = '' , state , dispatch  }) {
    
    const isError = state.errors[name] ? state.errors[name].error ? true : false : false;
    
    return ( <Flex w = {'100%'} justifyContent={'center'} > 
        <Flex w = '2xl' py = {'1'}>
            <FormControl isInvalid={isError}>
                    <FormLabel>{label}</FormLabel>
                <Input type = {'file'}
                       onChange={(e)=> dispatch({type : name , payload : e.target.files[0] })}
                       value = {state.data[name] ? state.data[name].fileName : undefined}
                />
                
                {/* Error Handler */}

                {isError ? (
                <FormErrorMessage > {state.errors[name].message}</FormErrorMessage>) 
                : (<FormHelperText>{helperText}</FormHelperText> )}
                
            </FormControl>
        </Flex>
    </Flex>  )
}

function DropDownInputField ({name , label ,  arr ,  dispatch  }) {

    const [curr_option , setOption] = useState (arr[0].name)
    
    return ( <Flex w = {'100%'} justifyContent={'center'} > 
        <Flex w = '2xl' py = {'1'}>
            <FormControl >
            <FormLabel htmlFor='arr'>{label}</FormLabel>
            <Select id='arr' placeholder={curr_option} onChange = {(e)=> setOption(e.target.value)} >
             
             {arr && arr.map ((ele , idx) => {

                useEffect (()=>{
                    if (ele.name === curr_option) {
                        dispatch ( {type : name , payload : ele })
                    }
                } , [curr_option])
                
                return (ele.name !== curr_option && <option key={idx}
                > {ele.name} </option>)
             })}   

            </Select>
            </FormControl>
        </Flex>
    </Flex>  )
}

function reducer ( state , action ) {
    
    switch (action.type) {
        case 'name': 
        return {...state , data : {...state.data , name : action.payload} 
            , errors : {...state.errors ,
            name : { error : action.payload.length > 1 ? undefined : '🎇' ,
            message : 'product name is too short'}}}
              
        case 'price':
            return {...state , data : {...state.data , price : action.payload} 
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
            errors : {...state.errors , category : {
                error : undefined , message : '' }}}              
    } 
    
    return state
}

export async function getStaticProps(context) {
    return {
      props: {
        category : [
            {
                id : 1 ,
                name : 'product' 
            }
            ,
            {
                id : 2 ,
                name : 'hello world'
            }
        ]
      }, // will be passed to the page component as props
    }
}


export default function uploadProduct
    (props) {
    const toast = useToast()
    
    const [rstate , dispatch] = useReducer(reducer , {data : {} , errors : {}}) 
    console.log (rstate)

    
    return (
        <>  <Flex w = {'100%'} 
                justifyContent= {'center'} 
                alignContent = {'center'} 
                p = {10} 
                flexDirection = {'column'}
                bg = {'whiteAlpha.800'}
            >
             
             <Center>
                <Text fontSize={'3xl'}>PRODUCT FORM</Text>
             </Center>
            <InputField
             name = 'name'  
             label = 'Enter Name'
             type = {'text'}
             state= {rstate}
             dispatch = {dispatch}
            />   


            <InputField
             name = 'price'  
             label = 'Enter Price'
             type = {'number'}
             state= {rstate}
             dispatch = {dispatch}
            />    

            <TextInputField
             name = 'description'  
             label = 'Enter Description'
             type = {'text'}
             state= {rstate}
             dispatch = {dispatch}
            />

            <InputField
             name = 'countInStock'  
             label = 'Enter Count In Stock'
             type = {'number'}
             state= {rstate}
             dispatch = {dispatch}
            />

            <FileInputField
             name = 'image'  
             label = 'Select Image'
             state= {rstate}
             dispatch = {dispatch}
            />

            <DropDownInputField 
              name = 'category'
              label = 'Select Category'
              arr = {props.category}
              dispatch = {dispatch}
            />

        <Center p = {5}>
            <Button  size = {'lg'} color = 'green.600' variant={'outline'}>
                 SUBMIT
            </Button>
        </Center>    
        </Flex></>
    )
}


/*
    async function handleUpload
    () {
       if (!Validator(state , ['name' , 'price' , 'description' , 'image' , 'countInStock' , 'category_id'])) {
           Toaster(toast , "Some input fields are missing " , "error")
           return
       }

        await uploadFile(state.image, async (imageUrl) => {
            if (!imageUrl.data) {
                Toaster(toast, "image upload fail", "error")
                return
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, {
                product : {...state , image : imageUrl.data }
            }).catch(async (err) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`)
                Toaster(toast, "upload fail", "error")
            })
            
            if (res.data && res.data.error && (res.data.error.code === "P2002" || res.data.error)) {
                Toaster(toast, "upload fail category name already exists", "error")
                await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`)
                return
            }

            if (res) Toaster(toast, "data has been uploaded", "success")
        })
    }
    */