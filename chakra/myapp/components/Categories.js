
import React , {useState , useEffect} from 'react';

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Grid , 
    GridItem,
    Button
} from '@chakra-ui/react';
  
import Link from 'next/link';


const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

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
  


export function Category() {
    

    return (
      <Center py={12} mx= {1}>
        <Box className='categoryCard'
          role={'group'}
          p={6}
          maxW={`240px`}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'160px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={200}
              width={282}
              alt = {`loading...`}
              objectFit={'cover'}
              src={IMAGE}
            />
          </Box>
          <Stack pt={12} align={'center'}>
            <Heading pt = {2}  fontSize={'.3xl'} fontFamily={'body'} justifySelf= {'center'} fontWeight={500} noOfLines={2}>
              Laptops and accories
            </Heading>
            <Link href={'/home'}>
               <Text color={'blue.500'} fontSize={'sm'} textTransform={'uppercase'} role = {'button'} className = {'linkShopNow'}>
                 shop now
               </Text>
            </Link>
          </Stack>
        </Box>
        <style jsx>
          {CSS}
        </style>
      </Center>
    );
}

import Slider from 'react-slick';


export default function Categories () {
  
  let settings = {
    dots: true,
    speed: 500,
    initialSlide: 0,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      }
    ]
  }

  const [showAll , setShowAll] = useState (false)
  const [cardsCountInRow , setCardCountInRow] = useState(5)

  useEffect (()=>{
    if (!showAll) return
    const width = window.screen.width
    if ( width > 1300 ) setCardCountInRow(5)
    if ( width < 1300  ) setCardCountInRow(4)
    if ( width < 1000  ) setCardCountInRow(3)
    if ( width < 680 ) setCardCountInRow(2)
    if ( width < 300 ) setCardCountInRow(1)
  } , [showAll])

  return (
    <>
     <Center margin={2}><Heading fontSize={'2xl'}>SHOP BY CATEGORIES</Heading></Center>
     <Center><Button size={'sm'} mb = {1} mx = {5} gradient = {'ghost'} colorScheme = {'whatsapp'} onClick = {()=> setShowAll(!showAll)}>{!showAll ? 'Show All' : 'Expand'}</Button> </Center>
     
      {
      showAll ? 
      <>
        <Center>
           <Grid templateColumns={`repeat(${cardsCountInRow}, 2fr)`} gap={1}>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
           </Grid>
        </Center>
      </> 
      : 
      <>
         <Box px = {7} border = {'1px'} borderColor = {'white'}>
         <Slider {...settings} color = {'black'} >
             <Category/>
             <Category/>
               <Category/>
             <Category/>
             <Category/>
         </Slider>
         </Box>
      </>
      }      
    </>
  )
  /*const [cardsCountInRow , setCardCountInRow] = useState(5)
    

    // listens to screen width
    useEffect (()=>{
     const width = window.screen.width
     if ( width > 1300 ) setCardCountInRow(5)
     if ( width < 1300  ) setCardCountInRow(4)
     if ( width < 1000  ) setCardCountInRow(3)
     if ( width < 680 ) setCardCountInRow(2)
     if ( width < 300 ) setCardCountInRow(1)
    } , [])
    
    return (
        <>
        <Center margin={2}><Heading fontSize={'2xl'}>SHOP BY CATEGORIES</Heading></Center>
        <Center>
           <Grid templateColumns={`repeat(${cardsCountInRow}, 2fr)`} gap={1}>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
             <GridItem> <Category/> </GridItem>
           </Grid>
        </Center>
        </>
    )
    */
}
