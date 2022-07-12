
import React , {useState , useEffect} from 'react';

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Flex ,
    Grid
} from '@chakra-ui/react';
  
import Link from 'next/link';

const CSS = `
    .linkShopNow:hover {
       text-decoration: underline;
       opacity: 80%;   
    }

    .categoryCard {
        transition : .2s;
    }
    .categoryCard:hover {
      transform: translateY(8px);
    }
`   

export function Category(
    {
        id ,
        name ,
        image,
        mode = 'category' ,
        showBtn = true
    }
) {
    
    return (
      <>
        <Link href= { mode === 'category' ? `/category/${name}` : `/category/${name}/${id}` }>
          <Stack maxW={{ lg : 270 , base : 170 }} w = {'100%'} m = { { xl : 1 , lg : 2 , md : 1, base : '0.5'}} 
          border = {1} borderColor = {'blackAlpha.100'}  
          borderStyle = {'solid'} boxShadow='md' _hover={{boxShadow : 'lg' }} className = 'categoryCard' rounded='md' bg='white'>
            <Box py = {1}>
            <Text  pl = {1} fontSize = {{lg : '2xl' , md : '1xl' , sm : 'sm' , base : 'sm'  }}>{name}</Text>
            </Box>
            <Box>
          <Image  
            src = {`http://localhost:8000/static/${image}`} 
            alt = {'loading'} 
            w= {{ lg : 268 , base : 168  }} 
            h = {{lg : 254 , base : 156  }} 
            _hover = {{filter : 'auto', translateX : '2' }} 
            cursor = {'pointer'}
          />
            </Box>
            <Center py = {2}>
            <Text  cursor={'pointer'} color = {'blue.400'}>
              Shop Now
            </Text>
            </Center>
          </Stack>
        </Link>  
      </>
    );
}

export default function Categories ({ categories , mode = '' , label = 'SHOP BY CATEGORIES' , eleRef = null }) {
  
  return (
    <>
    <Center ref={eleRef} margin={2}><Heading fontSize={'2xl'}>{label}</Heading></Center>

     {mode === 'subCategory' ? 
      <> 
        
        <Grid  gridAutoFlow={'column'} 
         gap = {1}
         p = {2}
         gridAutoColumns = {{ xl : '18%' , lg : '25%' , md : '22%' , sm : '29%' , base : '38%' }}
         overflowX = {'auto'}
         overscrollBehaviorX = {'contain'}
         className = {'boardslist'}
         >
           {categories && categories.map ((cat) => 
            <Category 
             key = {cat.id}
             id = {cat.id}
             name = {cat.name}
             image = {cat.image}
             mode = 'subCategory'
            /> )}
        </Grid>
      </> :
      <Flex flexWrap={'wrap'} justifyContent = {'center'} alignContent = {'center'} bg = {'whiteAlpha.100'}>
        {categories && categories.map ((cat) => <Category 
          key = {cat.id}
          id = {cat.id}
          name = {cat.name}
          image = {cat.image}
        />)}
    </Flex>
      
    }
    
    <>
      { categories.length == 0 && 
        <Center>
        <Text color={'red.400'} fontSize = {'2xl'}>No thing to Show</Text>
        </Center>
      }
      </>   
    </>
  )
}

// looks okay