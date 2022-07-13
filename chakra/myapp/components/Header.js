import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Avatar,
    PopoverArrow ,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Badge,
    useOutsideClick,
    Center, 
    Image,    
    Input,
    Divider ,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';


import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    EditIcon
} from '@chakra-ui/icons';

import { FiLogIn } from 'react-icons/fi'
import { FaShoppingCart } from 'react-icons/fa' 
import { userContext  , categoriesContext} from '../Hooks/Context'
import { useContext, useEffect } from 'react';
import { SignOutUser } from '../Helpers/firebase';

import  {  useState , useRef } from 'react'
import Linker from 'next/link'

import { cartContext as cartObj } from '../Hooks/RandomsHooks'


export default function WithSubnavigation() {
    
    const { isOpen, onToggle } = useDisclosure();
    const [userModelState , setUserModelState] = useState (false);

    const userModelRef = useRef ()

    const user = useContext (userContext)
    const categories = useContext (categoriesContext)
    
    const cartContext = useContext (cartObj)

    useOutsideClick({
        ref: userModelRef,
        handler: () => setUserModelState(false),
    })
    

    const [navPos , setNavPos] = useState ('flex')
    
    useEffect (()=> {
      window.addEventListener ('scroll' , (e) => {
        setNavPos (window.scrollY > 100 ? 'fixed' : 'flex')
        console.log ('changed')
      }) 
    } , [])
    
    return (
        <>
      
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          width = {'100%'}
          align={'center'}
          px = {0}
          mx = {0}
          top  = {0}
          left = {0}
          right = {0}
         // position = {navPos}
          zIndex = {999}
          >
          
          <Flex
            flex={{ base: 1, md: 'auto' }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            
        <Linker href='/'>           
            <Text as = 'button'
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              pl = {{lg : 4 , md : 3}}
              >
              RTX SHOP
            </Text>
        </Linker>  

        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav categories = {categories.categories} />
        </Flex>

    
      </Flex>
  
         
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            pt = {2}
            direction={'row'}
           >

          {/* Cart */}

          <Popover variant = {'ghost'}> 
           <PopoverTrigger>  
          <IconButton variant={`ghost`} mx = {1} ><FaShoppingCart/></IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
            <Center><Text fontSize = {'1xl'} fontWeight = {'bold'} m = {2}>Shoping Cart</Text></Center>
            </PopoverHeader>
            <PopoverBody>
              <Stack>
                <Stack maxH={'60vh'} overflowY = {'scroll'} className = {'cartScroll'}>
                 { cartContext.products && cartContext.products.map ((product , idx)=> 
                   <CartMeta key = {idx} product = {product} context = {cartContext} />
                 )}
                </Stack>
                <Divider/>
                <Text fontSize={'1xl'} color = {'gray.600'} fontWeight = {'semibold'}>Total Bill : {(()=>{
                  let total = 0
                  cartContext.products && cartContext.products.forEach ((pro_total) => 
                   total += isNaN (parseInt(pro_total.totalBill)) ? 0 : parseInt(pro_total.totalBill)) 
                   return total   
                })()} PKR</Text>
                <Linker href = {'/user/checkout/'}>
                <Button colorScheme={`whatsapp`} p = {2} m = {2}>Check Out</Button>
                </Linker>
              </Stack>
            </PopoverBody>
          </PopoverContent>
          </Popover>

         {/* Cart End */}

<Popover isOpen = {userModelState} >
        <PopoverTrigger>
          <Button
              as={'button'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              onClick = {()=> setUserModelState (!userModelState)}
          >
           { user.user ? <Avatar
                size="sm"
                name= {user.user.name}
                src= {user.user.avatar}
            /> :
            <><Text fontSize={'2xl'}>
             <FiLogIn/>
            </Text></> }
          </Button>
     </PopoverTrigger>
     <Flex ref = {userModelRef}>
     <PopoverContent 
     p = {5} 
     w = {'100%'}
     >
         <PopoverArrow />
         <PopoverCloseButton  onClick = {()=> setUserModelState (!userModelState)} />
         
         { !user.user ?
         <PopoverBody>
          <Flex py = {5} px = {0} align = 'center' justifyContent={'center'} >
            <Linker href={'/login'}>
             <Button mr = {2} size = 'sm' onClick={()=> setUserModelState (false)}
             colorScheme = {'whatsapp'}
            >
              Sign In
             </Button>
             </Linker>
             <Linker href={'/signup'}>
             <Button ml = {2} size = 'sm' onClick={()=> setUserModelState (false)}
              colorScheme = {'facebook'}
             >
              Sign Up
             </Button>
             </Linker>
          </Flex>
         </PopoverBody>
         : <>
        <PopoverHeader px = {4}>
            RTX Shop Account
            <Linker href={'/user/profile'}>
            <Button as = 'a' size = 'xs' variant={'ghost'} mx = {2} pb = {0.5}
             onClick = {()=> setUserModelState (false)}
            >
            <EditIcon w= {4} h = {4} />
            </Button>
            </Linker>
        </PopoverHeader>
         <PopoverBody w = {'100%'} p = {2} px = {5} >
          <Flex align={'center'}  w = {'100%'}>  
        <Linker href = {'/user/profile'}>  
         <Button
            as={'button'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick = {(e)=> setUserModelState(false)}
        >
            <Avatar
                size="md"
                name={user.user.name}
                src={user.user.avatar}
            />
        </Button>
        </Linker>
        <Stack p = {2} spacing = {0}>
          <Text px = {2}>
            <Badge size={'xs'} px = {3} color = 'black'>{user.user.name}</Badge>  
          </Text>
          <Text  as = {'button'} px = {3} textDecoration = {'underline'} 
          color = {'blue.400'} py = {0} margin = {0} _hover = {{color : 'blue.300'}}
          fontSize = {'sm'}
          >{user.user.email}</Text>
        </Stack>
        </Flex>
        <Stack direction={'row'} px = '20%' mt = '5'>
            <Button colorScheme={'red'} size= 'sm' onClick={()=>{
              SignOutUser()
              user.setUser (null)
              setUserModelState (false)
            }}> SignOut </Button>
        </Stack>
        
        </PopoverBody> 
        </>}
      </PopoverContent>
    </Flex>
    </Popover>
            
          </Stack>
        </Flex>
  
      <Collapse in={isOpen} animateOpacity>
          <MobileNav  categories = {categories.categories} /> 
      </Collapse>
      
      </>
    );
}
  
const DesktopNav = ({ categories }) => {
    
    const [activeMenu , setActiveMenu] = useState ('')
     
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
     
    return (
      <>
      <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem , idx) => {
           
       return (
        <Linker href={`${navItem.href}`} key={idx}>
          <Box>
            <Popover trigger={'hover'} placement={'bottom-start'} >
              <PopoverTrigger>
                <Link
                  onMouseOver={(e)=>{
                    setActiveMenu (navItem.label)
                  }}
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                    {navItem.label} 
                </Link>
              </PopoverTrigger>
              
              {(categories && activeMenu === 'Categories') && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}> 
                  <Stack>
                    {categories.map((child , idx ) => (
                      <DesktopSubNav key={idx} child = {child} />
                    ))} 
                  </Stack>
                </PopoverContent>
              )}

              {(navItem.children && activeMenu === 'DashBoard') && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child , idx ) => (
                      <DesktopSubNav key={idx} child = {child} 
                        label = {navItem.label} 
                        href = {child.href}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              )}

            </Popover>
            
          </Box>
          </Linker>
      )})}
      </Stack>
      
      </>
    );
};
  
const DesktopSubNav = ({child , label , href}) => {
    
   const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
      <>
      <Popover trigger={'hover'} placement='right' >
      <PopoverTrigger>
      
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Linker href={ !href  ?  `/category/${child.name}` : `${href}` }>  
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {child.name}
            </Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
        </Linker>
      </Link>
     
      </PopoverTrigger>
       
      { child.categories.length > 0 && <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}
      >
          {child.categories   && child.categories.map ((child , idx)=>{
              return <DesktopSubChild key = {idx} child = {child} />
            })}
      </PopoverContent> }


      </Popover>
      </>
    );
  };
  
  const DesktopSubChild = ({ child }) => {


    return (
      <>
      <Link
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Linker href= {`/category/${child.superCategoryName}/${child.id}`}>  
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {child.name}
          </Text>
      </Box>
      <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
       </Stack>
       </Linker>
      </Link>
      </>
    )
  }
  

  const MobileNav = ({categories}) => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p = {4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem , idx) => ( 
          <Center key = {idx}>
            <MobileNavItem key={navItem.label} {...navItem}
               categories = {categories} 
            />
          </Center>
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label,  href  , categories , children}) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={onToggle}>
        
        <Flex
          py={2}
          cursor = {'pointer'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Linker href={`${href}`}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          </Linker>  
          {(children || label === 'Categories')&& (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
        

        {label === 'Categories' ? 
        <>
          <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {categories &&
              categories.map((child , idx) => {

              return (
                <Linker href = {`/category/${child.name}`} key = {idx}>
                <Link key={idx} py={2}> {child.name} </Link>
                </Linker>
            )})}
          </Stack>
        </Collapse>
        </> :
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child , idx) => {
              return (
                <Linker key={idx} href = {`${child.href}`}>
                <Link  py={2}>
                  {child.name}
                </Link>
                </Linker>
              )})}
          </Stack>
        </Collapse>}

      </Stack>
    );
  };
  

  
const NAV_ITEMS = [
    {
      label: 'Categories',
      href : '/'
    },
    {
      label: 'Products',
      href : '/products/'
    },
    {
      label: 'About Us',
      href: '/',
    },
    {
      label: 'DashBoard',
      href: '/',
      children: [
        {
          name : 'Upload Products' ,
          href : '/product/upload/',
          categories : []
        },
        
        {
          name : 'Upload Categories' ,
          href : '/category/upload',
          categories : []
        },
        {
          name: 'Edit Users',
          href: '/admin/users/',
          categories : []
        },
        {
          name: 'Edit Products',
          href: '/admin/products/',
          categories : []
        },
      ],
    },
];


function CartMeta ( { product , context }) {

  useEffect (() => { 
    if (!product.qt || product.qt <= product.countInStock) return
    let qt = product.qt > product.countInStock ? product.countInStock : product.qt 
    context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : isNaN(product.qt * product.price) ? 0 : product.qt * product.price  , qt }})
  } , [product])
  
  useEffect (()=> {
    console.log ('called')
    if (!product.qt || isNaN (product.qt)) {
     let qt = 1
     context.dispatch ({type : 'Update' , payload : { id : product.id , totalBill : qt * product.price , qt }})
    } 
  } , [])
  
  return (
    <>
      <Stack direction="row" spacing="5" width="full" p = {2}>
        <Linker href = {`/product/${product.id}`}>
       <Image
        cursor = {'pointer'}
        rounded="lg"
        width="80px"
        height="80px"
        fit = 'fill'
        src= {`http://localhost:8000/static/${product.image}`} 
        alt={'loading'}
        draggable="true"
        quality={'100%'}
       />
       </Linker>
        <Stack direction={'column'} spacing = {'-0.5'}>
         <Stack direction={'row'}>
          <Linker href = {`/product/${product.id}`}>
            <Text fontSize={'sm'} pt = {2} noOfLines = {1} fontWeight = {'bold'} cursor = {'pointer'}>{product.name}</Text>
          </Linker>
         </Stack>
        <Stack direction={'row'}>
          <Text fontSize={`x-small`} fontWeight = {'bold'} color = {'blackAlpha.900'}>Price : {product.price}</Text>
          <Text fontSize={`x-small`} fontWeight = {'bold'} color = {'blackAlpha.900'}>In Stock : {product.countInStock}</Text>
        </Stack>

        {product.countInStock <= 0 ? <Text color={'red'} py = {1}>OUT OF STOCK</Text> :   
        <Stack direction={'row'} py = {2}>
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
         <Text fontSize={'xs'} fontWeight = {'bold'} pt= {2}>Total : {
          product.totalBill
        }</Text>
        </Stack>}
        <Stack pr={10}>
          <Button colorScheme={'red'} size = {'xs'} ml = {5} onClick = {(e)=> {
            context.dispatch ({type : 'Delete' , payload : {id : product.id}})
          }}>Remove</Button>
        </Stack>
       </Stack>
      </Stack>
      
    </>
  )
}