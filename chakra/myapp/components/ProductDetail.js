import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Badge,
    Tooltip,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Input,
} from '@chakra-ui/react';

import { MdLocalShipping } from 'react-icons/md';
import { RatingComponent } from './Products'
import { BiClipboard } from 'react-icons/bi'
import { useState } from 'react';


export default function ProductDetail (

) {
    const [state , setState] = useState ('')

    return (
      
      <Container maxW={'7xl'}>
        <Input type={'file'} onChange = {(e)=>{
          const image = e.target.files[0]
          setState (URL.createObjectURL(image))
        }}/>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={
                'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
              }
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>


                  <Editable defaultValue={'Automatic Watch'}>
                      <EditablePreview />
                      <EditableInput />
                  </Editable>

                  <Button alignSelf={'end'} size = {'sm'} variant = {'outline'}><BiClipboard/></Button>
              </Heading>

                <Editable
                    color={useColorModeValue('gray.900', 'gray.400')}
                    fontWeight={300} fontSize={'2xl'} defaultValue={'$350.00 USD'}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Box>
        
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }} >
                <Text fontSize={'md'}>

                    <Editable defaultValue={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad\n' +
                        '                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum\n' +
                        '                  maxime modi nam officiis porro, quae, quisquam quos\n' +
                        '                  reprehenderit velit? Natus, totam.'}>
                        <EditablePreview />
                        <EditableTextarea w = {'40vh'}/>
                    </Editable>

                </Text>
              </VStack>
              
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text>
  
                <List spacing={2}>
                <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      CATEGORY : 
                    </Text>{' '}
                    <Badge as = 'button' variant={'ghost'} color = 'darkslategrey' px = {2} pb = {1} _hover = {{color : 'blue.400'}}> 
                      <Text fontSize={'sm'} p = {1}>phones</Text>
                    </Badge>
                </ListItem>      
                <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      BRAND : 
                    </Text>{' '}
                    <Badge variant={'outline'} colorScheme = {'linkedin'} px = {2} pb = {1} > 
                      <Text fontSize={'md'} p = {0.5}>
                          <Editable defaultValue={'Apple'}>
                              <EditablePreview />
                              <EditableInput />
                          </Editable>
                      </Text>
                    </Badge>
                  </ListItem>  
                  <ListItem>
                  <Flex> 
                    <Text as={'span'} fontWeight={'bold'}>
                      RATING : 
                    </Text>{' '}
                    <Tooltip label= {'4.6'} background = {'black'} variant = {'outline'} color = 'white' px ={5} py = {1} zIndex={9999999999999999999999}>
                    <Flex pt={1} px = {2}>
                      <RatingComponent rating={4.5}/>
                    </Flex>
                    </Tooltip>
                 </Flex>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                    IN STOCK :
                    </Text>{'  '}
                      <Badge bgGradient={'ghost'} px = {5}><Editable defaultValue={'10'}>
                          <EditablePreview />
                          <EditableInput type = 'number'/>
                      </Editable></Badge>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      REVIEWS :
                    </Text>{' '}
                      12
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                    LAST UPDATED :
                    </Text>{'  '}
                      {new Date().toDateString()}
                  </ListItem>
                  <ListItem>
                    <Text as = 'button' decoration={'underline'} color = {'blue.400'}>view reviews</Text>
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Add to cart
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }