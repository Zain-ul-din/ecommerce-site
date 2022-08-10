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
  Input,
  Avatar,
  Center,
  FormControl,
  IconButton,
  Divider,
  useToast,
} from "@chakra-ui/react";

import { useReducer, useState, useContext, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { MdLocalShipping } from "react-icons/md";
import { RatingComponent } from "./Products";
import { BiClipboard } from "react-icons/bi";
import { InputField, TextInputField } from "../Helpers/InputHelpers";

import { cartContext } from "../Hooks/RandomsHooks";
import { userContext } from "../Hooks/Context";

import { useHttpie as superPower } from "../Hooks/RandomsHooks";
import { Toaster } from "../Helpers/Toaster";

// Comment Component
function CommentsComponent({ review }) {
  return (
    <>
      <Flex p={5} flexDirection="column" w={"100%"}>
        <Stack>
          <Stack direction={"row"} spacing={3}>
            <Avatar
              name={`${review.userName}`}
              src="https://bit.ly/broken-link"
            />
            <Stack spacing={0}>
              <Text pt={2} fontSize={"1xl"}>
                {review.userName}
              </Text>
              <Stack direction={"row"}>
                <RatingComponent rating={review.rating} />
                <Text fontSize={"xs"} fontWeight={"bold"} color={"blue.400"}>
                  Sun Jun 26 2022 05:15:28
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={0}>
          <Text
            px={8}
            py={1}
            pl={{ lg: 14, base: 14 }}
            fontSize={{ lg: "1xl", sm: "md", base: "xs" }}
          >
            {review.comment}
          </Text>
        </Stack>
      </Flex>
    </>
  );
}

// Comment Component Upload
function ReviewUploadComponent({
  userId,
  productId,
  userName,
  reviews,
  setReviews,
}) {
  const clamp = (val, min, max) => (val < min ? min : val > max ? max : val);

  const toast = useToast();

  function reducer(state, action) {
    switch (action.type) {
      case "comment":
        return {
          ...state,
          data: { ...state.data, comment: action.payload },
          errors: {
            ...state.errors,
            comment: {
              error: action.payload.length < 10 ? "🤗" : undefined,
              message: `${10 - action.payload.length} More To Go`,
            },
          },
        };
      case "rating":
        const filterState = !isNaN(parseFloat(action.payload))
          ? clamp(parseFloat(action.payload), 1, 5)
          : 0;
        return {
          ...state,
          data: { ...state.data, rating: filterState },
          errors: {
            ...state.errors,
            rating: {
              error: isNaN(parseFloat(action.payload)) ? "😫" : undefined,
              message: "Invalid Rating",
            },
          },
        };
      case "reset":
        return { data: {}, errors: {} };
    }
  }

  const [state, dispatch] = useReducer(reducer, { data: {}, errors: {} });

  async function handleUpload() {
    const { errors } = state;

    if (Object.entries(errors).length < 2) {
      Toaster(toast, "Some input fields are missing", "error");
      return;
    }

    for (let [key, val] of Object.entries(errors))
      if (val.error !== undefined) {
        Toaster(toast, "Some input fields are invalid", "error");
        return;
      }

    const res = await superPower(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/review/`,
      "POST",
      {
        review: {
          user_id: userId,
          product_id: productId,
          rating: state.data.rating,
          comment: state.data.comment,
          userName: userName,
        },
      }
    );

    setReviews([res.data.data, ...reviews]);
    Toaster(toast, "upload success", "success");
  }

  return (
    <>
      <Flex
        w={"100%"}
        justifyContent={"center"}
        alignContent={"center"}
        p={10}
        flexDirection={"column"}
        bg={"whiteAlpha.800"}
      >
        <Center>
          <Stack direction={"row"}>
            <RatingComponent
              rating={state.data.rating ? parseFloat(state.data.rating) : 0}
            />
          </Stack>
        </Center>

        <InputField
          name={"rating"}
          label={"Enter Rating out of 5"}
          type={"number"}
          state={state}
          dispatch={dispatch}
        />

        <TextInputField
          name={"comment"}
          label={"Enter Comment"}
          type={"text"}
          state={state}
          dispatch={dispatch}
        />

        <Center pb={3}>
          <Button colorScheme={"whatsapp"} onClick={() => handleUpload()}>
            {`Add Review`}{" "}
          </Button>
        </Center>
      </Flex>
    </>
  );
}

export default function ProductDetail({ product }) {
  const addToCart = useContext(cartContext);
  const activeUser = useContext(userContext);
  const [reviews, setReviews] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    setReviews(product.reviews);
  }, [product]);

  const filterReviews = reviews.filter(
    (rev) =>
      rev.userName.toLowerCase().includes(searchVal) ||
      (rev.comment.toLowerCase().includes(searchVal) &&
        product.id === rev.product_id)
  );

  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={`http://localhost:8000/static/${product.image}`}
              fit={"fill"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", md: "400px", lg: "500px" }}
            />
          </Flex>

          <Stack
            spacing={{ base: 6, md: 8 }}
            px={{ lg: 1, md: 10, sm: 12, base: 6 }}
          >
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {`${product.name}`}

                <Button
                  alignSelf={"end"}
                  size={"sm"}
                  variant={"outline"}
                  ml={2}
                >
                  <BiClipboard />
                </Button>
              </Heading>

              <Text fontWeight={600} fontSize={"2xl"} color={"facebook.600"}>
                {`PRICE : ${product.price}  PKR`}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"3"}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      CATEGORY :
                    </Text>{" "}
                    <Badge
                      as="button"
                      variant={"ghost"}
                      color="darkslategrey"
                      px={2}
                      pb={1}
                      _hover={{ color: "blue.400" }}
                    >
                      <Text fontSize={"sm"} p={1}>
                        {product.categoryName}
                      </Text>
                    </Badge>
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      BRAND :
                    </Text>{" "}
                    <Badge
                      variant={"outline"}
                      colorScheme={"linkedin"}
                      px={2}
                      pb={1}
                    >
                      <Text fontSize={"md"} p={0.5}>
                        {product.brand}
                      </Text>
                    </Badge>
                  </ListItem>
                  <ListItem>
                    <Flex>
                      <Text as={"span"} fontWeight={"bold"}>
                        RATING :
                      </Text>{" "}
                      <Tooltip
                        label={`${product.rating}`}
                        background={"black"}
                        variant={"outline"}
                        color="white"
                        px={5}
                        py={1}
                        zIndex={9999999999999999999999}
                      >
                        <Flex pt={1} px={2}>
                          <RatingComponent rating={product.rating} />
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      IN STOCK :
                    </Text>
                    {"  "}
                    <Badge bgGradient={"ghost"} px={3}>
                      {product.countInStock}
                    </Badge>
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      REVIEWS :
                    </Text>{" "}
                    {product.reviewsCount}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      LAST UPDATED :
                    </Text>
                    {"  "}
                    {new Date(product.updatedAt).toDateString()}
                  </ListItem>
                  <ListItem>
                    <Text
                      as="button"
                      decoration={"underline"}
                      color={"blue.400"}
                    >
                      view reviews
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"md"}>{product.description}</Text>
              </VStack>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={(e) => {
                addToCart.dispatch({ type: "Add", payload: product });
              }}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Center>
        <Text fontSize="4xl"> Reviews </Text>
      </Center>
      {/*
        <Flex flexDirection={'column'} >
        <TextInputField name = 'review' type={'text'} label = 'Add Your Review' state = {{errors : {} , data : {}}}/>
        <InputField name = {'rating'} type={'number'} state = {{errors : {} , data : {}}} label = {'Rating'}/>
      </Flex>*/}
      <Container
        px={5}
        display={"flex"}
        align="center"
        w={"100%"}
        flexDirection={"row"}
        as={"form"}
        mt={4}
        mb={1}
      >
        <FormControl>
          <Input
            type={"text"}
            placeholder={"Search Reviews"}
            display={"block"}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
          />
        </FormControl>

        <IconButton
          aria-label="Search database"
          colorScheme={"twitter"}
          icon={<SearchIcon />}
          mx={2}
        />
      </Container>

      {activeUser.user &&
      !product.reviews.find((rev) => rev.user_id === activeUser.user.id) ? (
        <ReviewUploadComponent
          productId={product.id}
          userId={activeUser.user.id}
          userName={activeUser.user.name}
          setReviews={setReviews}
          reviews={reviews}
        />
      ) : (
        <> </>
      )}

      <Flex
        px={{ lg: 50, md: 15, sm: 5, base: 1 }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {filterReviews &&
          filterReviews
            .slice(0, 3)
            .map((val, key) => <CommentsComponent key={key} review={val} />)}
      </Flex>
      <Divider />

      <Flex my={10} bg={"white"}></Flex>
    </>
  );
}
