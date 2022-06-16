
import React, { useEffect, useState } from 'react'

import { 
Heading,
Center ,
Box ,
Flex ,
Text ,
Badge,
Icon,
Input ,
Grid ,
GridItem,
useBreakpoint,
Button,
Stack,
IconButton,
FormControl,
Container
} from '@chakra-ui/react'

import Image from 'next/image'


const IMAGE = `https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80`

import {BsStarFill , BsStarHalf} from 'react-icons/bs'
import { SearchIcon } from '@chakra-ui/icons'

var arr = []

// rating Component
export function RatingComponent ({rating = 1}) {
   
    arr = []
    let isFloat = rating !== Math.floor(rating)
    for (let i = 1 ; i <= 5 ; i += 1) 
            if (parseInt(rating) >= i) arr.push ("star")
            else arr.push("NULL")
    if (isFloat) arr [Math.floor(rating)] = "halfStar";

    return (
        <>
            {arr.map ((val , idx) => 
             <Text key={idx} className = '_stars' color={val === "star" || val == "halfStar" ? "yellow.500" : "gray.300"} >
               { val == "halfStar" ? <BsStarHalf/> : <BsStarFill/> }  
             </Text> )}
        </>
    )
}

const CSS = `
    .linkShopNow:hover {
       text-decoration: underline;
       opacity: 80%;   
    }

    ._stars {
        display : block;
    }
    
    ._stars:hover {
        opacity: 80%;
        transform: translateY(-2px);
    }
    
    .categoryCard {
        transition : .2s;
    }
    .categoryCard:hover {
      transform: translateY(-8px);
    }
`  

// A Single Product Card
export function Product () {

    const property = {
        imageUrl: "/productImage.avif",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4.5,
      };

      
      const [mobBreakPoint]  = useBreakpoint() 
      const isMob = mobBreakPoint == 'b' || mobBreakPoint == 's'
      
      
      return (
        <>
        <Flex
          p = {2}
          w= {isMob ? "50" : "70"}
          alignItems="center"
          justifyContent="center"
          rounded="xl"
          className='categoryCard'
        >
          <Box
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            maxW="sm"
            borderWidth="1px"
            rounded="xl"
            shadow="lg"
          >
            <Image
              src={property.imageUrl}
              alt={property.imageAlt}
              width={382}
              height = {254}
            />
    
            <Box px={isMob ? "2" : "6"} py = {isMob ?"2" : "4"}>
              <Box display="flex" alignItems="baseline">
                <Badge rounded="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Text color={'blue.500'} fontSize={isMob ? 'x-small' : 'sm'} textTransform={'uppercase'} role = {'button'} className = {'linkShopNow'} px = {2}>
                 Add to Cart
               </Text>
              </Box>
    
              <Text
                mt="1"
                fontWeight="semibold"
                as= { isMob ? "h5" : "h4"}
                lineHeight="tight"
                fontSize={isMob ? "sm" : ""}
                noOfLines={isMob ? 3 : 2}
              >
                {property.title}
              </Text>
    
              <Box fontSize={isMob ? "sm" : ""} fontWeight="semibold">
                {property.formattedPrice}
              </Box>
    
              <Box display="flex" mt= { isMob ? "1" : "2"} alignItems="center">
                <RatingComponent rating={3.7}/>
                <Box as="span" ml="2" color="gray.600" fontSize={isMob ? "x-small" : "sm"} lineHeight="tight">
                  {property.reviewCount} reviews
                </Box>
              </Box>
            </Box>
          </Box>
          <style jsx>{CSS}</style>
        </Flex>
        </>
      );
}

// Products
export default function Products () {

  const [cardsCountInRow , setCardCountInRow] = useState(5)

  useEffect (()=>{
    
    const width = window.screen.width
    if ( width > 1300 ) setCardCountInRow(5)
    if ( width < 1300  ) setCardCountInRow(4)
    if ( width < 1000  ) setCardCountInRow(3)
    if ( width < 680 ) setCardCountInRow(2)
    if ( width < 300 ) setCardCountInRow(1)
  })


  return (
        <>
          <Center>
            <Heading fontSize={'3xl'} my = {8} >Top Products 🔥</Heading>
          </Center>
            
          
          <Container
             px = {5}
             display = {'flex'}
             align = 'center'
             w = {'100%'}
             flexDirection = {'row'}
             as={'form'}
             mb = {5}
            >
              <FormControl>
              <Input type={'text'} placeholder = {'Search Products'} display = {'block'} />
              </FormControl>
              
               <IconButton aria-label='Search database' colorScheme={'twitter'} icon={<SearchIcon />} mx = {2} />
              
          </Container>
          
          <Center px = {2}>
           <Grid templateColumns={`repeat(${cardsCountInRow}, 2fr)`} gap={.5}>
             <GridItem> <Product/> </GridItem>
             <GridItem> <Product/> </GridItem>
             <GridItem> <Product/> </GridItem>
             <GridItem> <Product/> </GridItem>
             <GridItem> <Product/> </GridItem>
           </Grid>
         </Center>
         <Container mb = {3}/>
        </>
    )
}