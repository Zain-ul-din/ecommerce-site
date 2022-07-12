import React, { useRef } from "react"
import  { Badge } from "@chakra-ui/react"
import {
    Flex,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    FormHelperText,
    FormErrorMessage,
    VisuallyHidden,
    Text ,
    Stack ,
    Icon
} from "@chakra-ui/react"


export function InputField ({name , type , label ,  helperText = '' , state , dispatch  }) {
    
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

export function TextInputField ({name , type , label ,  helperText = '' , state , dispatch    }) {
    
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

export function FileInputField ({name , label ,  helperText = '' , state , dispatch  }) {
    
    const isError = state.errors[name] ? state.errors[name].error ? true : false : false;
    
    const inputRef = useRef (null)

    function loadFile (e) {
        dispatch({type : name , payload : e.target.files[0] })
    }
    
    return ( <Flex w = {'100%'} justifyContent={'center'} > 
        
        

        <Flex w = '2xl' py = {'1'}>
            <FormControl isInvalid={isError}>
                    <FormLabel>{label}</FormLabel>
                
                
                <Stack spacing={1} textAlign="center" m = {5} border={2}
                    borderColor = {'gray.400'}
                    borderStyle = {'dashed'}
                    p = {4}
                    cursor = 'pointer'
                    onClick = {()=>{
                        inputRef.current.click ()
                    }}
                >
                  <Icon
                    mx="auto"
                    boxSize={12}
                    color="gray.400"
                    _dark={{
                      color: "gray.500",
                    }}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  <Flex
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                    alignItems="center"
                    justifyContent={'center'}
                  >
                    <label
                      cursor="pointer"
                      rounded="md"
                      fontSize="md"
                      color="blue.600"
                      pos="relative"
                      _hover={{
                        color: "brand.400",
                        _dark: {
                          color: "brand.300",
                        },
                      }}
                    >
                    <span >
                        <Text color = 'blue.400' _hover={{color : 'blue.600'}}
                         cursor = 'pointer'
                        >
                        Upload a file
                        </Text>
                    </span>
                    </label>
                    <VisuallyHidden>
                        <input 
                          ref={inputRef}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChangeCapture = {loadFile}
                        />
                    </VisuallyHidden>
                    <Text pl={1}>or drag and drop</Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    PNG, JPG, GIF up to 10MB
                  </Text>
                  <Text color= {'green.400'}>
                  {state.data[name] && state.data[name].name}
                  </Text>
                </Stack>
                
                {/* Error Handler */}

                {isError ? (
                <FormErrorMessage > {state.errors[name].message}</FormErrorMessage>) 
                : (<FormHelperText>{helperText}</FormHelperText> )}
                
            </FormControl>
        </Flex>
    </Flex>  )
}

export function TagsRenderer ({tags}) {
    
    const arr = tags.split ('#').filter (val => val.trim() !== '')
    const colors = ['red' , 'purple' , 'green' ,'orange' , 'teal' , 'twitter']
    
    return (
        <>
           {arr && arr.map ( (val , idx) => <Badge
            key = {idx} 
            colorScheme = {colors[Math.round(Math.random() * colors.length)]}
            >{val}</Badge>)}
        </>
    )
}