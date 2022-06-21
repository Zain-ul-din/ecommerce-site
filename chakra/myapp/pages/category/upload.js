
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack, Input, Link,
    Stack,
    Text,
    useToast,
    useColorModeValue,
    Wrap,
    WrapItem,
    Badge
} from "@chakra-ui/react";

import {uploadFile} from "../../Helpers/ApiFetcher"
import {useState} from "react";
import {Toaster} from "../../Helpers/Toaster"
import axios from "axios";

import {Validator} from "../../Helpers/validator";
import {Category} from "../../components/Categories";

export default function Upload
    () {

    const toast = useToast()
    const [state, setState] = useState({})

    async function handleUpload() {

        if (!Validator(state, ['name', 'image'])) {
            Toaster(toast, "some input fields are empty", "error")
            return
        }

        await uploadFile(state.image, async (imageUrl) => {
            if (!imageUrl.data) {
                Toaster(toast, "image upload fail", "error")
                return
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`, {
                category: {
                    name: state.name,
                    image: imageUrl.data
                }
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
            setState({})
        })

    }

    console.log(state.url)

    return (
        <>

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={4} mx={'auto'} maxW={'xl'} py={18} px={18}>
                    <Stack align={'center'}>
                        <Heading fontSize={'3xl'} textAlign={'center'}>
                            CATEGORY UPLOAD
                        </Heading>
                        <Text fontSize={'md'} color={'gray.600'}>
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}> <Center>
                        <Category name={state.name ? state.name : ''} image={state.url} showBtn={false}/>
                    </Center>
                        <Stack spacing={3}>

                            <FormControl isRequired>
                                <FormLabel>Category Name</FormLabel>
                                <Input type="email" value={state.name ? state.name : ''}
                                       onChange={(e) => setState({...state, name: e.target.value})}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Select Image</FormLabel>
                                <Input type="file" placeholder={'enter your user name'}
                                       onChange={(e) => {
                                           setState({
                                               ...state,
                                               image: e.target.files[0],
                                               url: URL.createObjectURL(e.target.files[0])
                                           })
                                       }}
                                />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    onClick={handleUpload}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Upload
                                </Button>
                            </Stack>

                            <Stack pl={30}>
                                <Flex flexWrap={'wrap'} gap={1} w={'100%'} p={0}>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                    <Badge colorScheme='purple' p={2}>hello world</Badge>
                                </Flex>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>

            </Flex>

        </>
    )
}