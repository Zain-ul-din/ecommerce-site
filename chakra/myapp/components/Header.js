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
    useOutsideClick
  } from '@chakra-ui/react';

import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    EditIcon
} from '@chakra-ui/icons';
  
import  {  useState , useRef } from 'react'
import Linker from 'next/link'


export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [userModelState , setUserModelState] = useState (false);

    const userModelRef = useRef ()

    useOutsideClick({
        ref: userModelRef,
        handler: () => setUserModelState(false),
    })
    
    return (
        <>
      <Box>
        
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 4 }}
          px={{ base: 6 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
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
              color={useColorModeValue('gray.800', 'white')}>
              RTX SHOP
            </Text>
         </Linker>  

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            
            pt = {2}
            direction={'row'}
            spacing={6}>

    <Popover isOpen = {userModelState}>
        <PopoverTrigger>
            <Button
              as={'button'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              onClick = {()=> setUserModelState (!userModelState)}
            >
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </Button>
     </PopoverTrigger>
     <Flex ref = {userModelRef}>
     <PopoverContent >
         <PopoverArrow />
         <PopoverCloseButton  onClick = {()=> setUserModelState (!userModelState)} />
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
         <PopoverBody w = {'xl'} p = {2} px = {5} >
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
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
            />
        </Button>
        </Linker>
        <Stack p = {2} spacing = {0}>
          <Text px = {2}>
            <Badge size={'xs'} px = {3} color = 'black'>zain ul din</Badge>  
          </Text>
          <Text  as = {'button'} px = {3} textDecoration = {'underline'} 
          color = {'blue.400'} py = {0} margin = {0} _hover = {{color : 'blue.300'}}
          fontSize = {'sm'}
          >zain.personal47@gmail.com</Text>
        </Stack>
        </Flex>
        <Stack direction={'row'} px = '20%' mt = '5'>
            <Button colorScheme={'red'} size= 'sm' > SignOut </Button>
        </Stack>
        {/* Body End */}
         </PopoverBody>
    </PopoverContent>
    </Flex>
    </Popover>
            {/*<Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'md'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              href={'#'}
              _hover={{
                bg: 'pink.300',
              }}>
               <Avatar
               size="sm"
               name="Dan Abrahmov"
               src="https://bit.ly/dan-abramov"
              />
            </Button>*/}
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      </>
    );
  }
  
  const DesktopNav = () => {

    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  fontSize={'sm'}
                  href={navItem.href ?? '#'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Linker href={href}>  
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
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
      </Link>
      </Linker>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  

  
const NAV_ITEMS = [
    {
      label: 'Inspiration',
      children: [
        {
          label: 'Explore Design Work',
          subLabel: 'Trending Design to inspire you',
          href: '/user/profile',
        },
        {
          label: 'New & Noteworthy',
          subLabel: 'Up-and-coming Designers',
          href: '#',
        },
      ],
    },
    {
      label: 'Find Work',
      children: [
        {
          label: 'Job Board',
          subLabel: 'Find your dream design job',
          href: '#',
        },
        {
          label: 'Freelance Projects',
          subLabel: 'An exclusive list for contract work',
          href: '#',
        },
      ],
    },
    {
      label: 'Learn Design',
      href: '#',
    },
    {
      label: 'Hire Designers',
      href: '#',
    },
];