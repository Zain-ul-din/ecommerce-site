// almost set
import React, { useEffect, useState, useContext } from "react";

import {
  Heading,
  Center,
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  Input,
  Grid,
  GridItem,
  useBreakpoint,
  Stack,
  IconButton,
  FormControl,
  Container,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  Button,
  Switch,
  FormLabel,
  //Image
} from "@chakra-ui/react";

import Image from "next/image";
import { BsStarFill, BsStarHalf, BsCartPlus } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import { FcFilledFilter } from "react-icons/fc";

var arr = [];

import { cartContext } from "../Hooks/RandomsHooks";

import Link from "next/link";

// rating Component
export function RatingComponent({ rating = 1 }) {
  arr = [];
  let isFloat = rating !== Math.floor(rating);
  for (let i = 1; i <= 5; i += 1)
    if (parseInt(rating) >= i) arr.push("star");
    else arr.push("NULL");
  if (isFloat) arr[Math.floor(rating)] = "halfStar";

  return (
    <>
      <>
        {arr.map((val, idx) => (
          <Text
            key={idx}
            className="_stars"
            color={
              val === "star" || val == "halfStar" ? "yellow.500" : "gray.300"
            }
          >
            {val == "halfStar" ? <BsStarHalf /> : <BsStarFill />}
          </Text>
        ))}
      </>
    </>
  );
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
`;

// A Single Product Card
export function Product({
  id,
  imageUrl = "/productImage.avif",
  imageAlt = "loading",
  title,
  price,
  rating,
  reviewCount,
  badgeText,
  product,
}) {
  const [mobBreakPoint] = useBreakpoint();
  const isMob = mobBreakPoint == "b" || mobBreakPoint == "s";
  const addToCart = useContext(cartContext);

  return (
    <>
      <Link href={`/product/${id}`}>
        <Flex
          cursor={"pointer"}
          p={2}
          w={isMob ? "50" : "70"}
          alignItems="center"
          justifyContent="center"
          rounded="xl"
          className="categoryCard"
        >
          <Box bg="white" maxW="sm" borderWidth="1px" rounded="xl" shadow="lg">
            <Image
              src={`http://localhost:8000/static/${imageUrl}`}
              alt={imageAlt}
              width={382}
              height={254}
            />

            <Box px={isMob ? "2" : "6"} py={isMob ? "2" : "4"}>
              <Box display="flex" alignItems="baseline">
                {badgeText && (
                  <Badge rounded="full" px="2" colorScheme="teal">
                    {badgeText}
                  </Badge>
                )}

                <Text
                  color={"blue.500"}
                  fontSize={isMob ? "x-small" : "sm"}
                  textTransform={"uppercase"}
                  role={"button"}
                  className={"linkShopNow"}
                  px={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart.dispatch({ type: "Add", payload: product });
                  }}
                >
                  Add to Cart
                </Text>
              </Box>

              <Text
                mt="1"
                fontWeight="semibold"
                as={isMob ? "h5" : "h4"}
                lineHeight="tight"
                fontSize={isMob ? "sm" : ""}
                noOfLines={isMob ? 3 : 2}
              >
                {title}
              </Text>

              <Box fontSize={isMob ? "sm" : ""} fontWeight="semibold">
                <Stack direction={"row"}>
                  <Text color={"blackAlpha.700"}>{price} </Text>
                  <Text color={"facebook.700"}> PKR </Text>
                </Stack>
              </Box>

              <Box display="flex" mt={isMob ? "1" : "2"} alignItems="center">
                <RatingComponent rating={rating} />
                <Box
                  as="span"
                  ml="2"
                  color="gray.600"
                  fontSize={isMob ? "x-small" : "sm"}
                  lineHeight="tight"
                >
                  {reviewCount} reviews
                </Box>
              </Box>
            </Box>
          </Box>
          <style jsx>{CSS}</style>
        </Flex>
      </Link>
    </>
  );
}

// Products
export default function Products({ label, products }) {
  const [cardsCountInRow, setCardCountInRow] = useState(5);
  const mediaQuery = useBreakpointValue({});

  useEffect(() => {
    const width = window.screen.width;
    if (width > 1300) setCardCountInRow(5);
    if (width < 1300) setCardCountInRow(4);
    if (width < 1000) setCardCountInRow(3);
    if (width < 680) setCardCountInRow(2);
    if (width < 300) setCardCountInRow(2);
  }, [mediaQuery]);

  const [filterState, setFilterState] = useState(false); // switch toggler state
  const [state, setState] = useState({ rating: 0, min: 0, max: 99999999 });
  const [searchVal, setSearchVal] = useState("");

  const min = products?.reduce(
    (acc, curr) => (acc.price < curr.price ? acc : curr),
    0
  );
  const max = products?.reduce(
    (acc, curr) => (acc.price > curr.price ? acc : curr),
    0
  );

  useEffect(() => {
    setState({ ...state, min: min.price });
    setState({ ...state, max: max.price });
  }, []);

  let filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchVal)
  );

  if (filterState) {
    filterProducts = filterProducts.filter(
      (product) =>
        product.rating >= state.rating &&
        product.price >= state.min &&
        product.price <= state.max
    );
  }

  return (
    <>
      <Center>
        <Heading fontSize={"3xl"} my={8}>
          {label}
        </Heading>
      </Center>

      <Container
        px={5}
        display={"flex"}
        align="center"
        w={"100%"}
        flexDirection={"row"}
        as={"form"}
        mb={5}
      >
        <FormControl>
          <Input
            type={"text"}
            placeholder={"Search Products"}
            display={"block"}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
          />
        </FormControl>
        <Popover trigger={`hover`}>
          <PopoverTrigger>
            <IconButton
              aria-label="Search database"
              as={`button`}
              colorScheme={`gray`}
              icon={<FcFilledFilter />}
              mx={2}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Product Filter</PopoverHeader>
            <PopoverBody>
              <Stack>
                <Text>Enable Product Filter</Text>
                <Switch
                  size={`md`}
                  isChecked={filterState}
                  onChange={(e) => setFilterState(!filterState)}
                />
                {filterState && (
                  <>
                    <Stack direction={"row"}>
                      <RatingComponent rating={state.rating} />
                    </Stack>
                    <Input
                      type={`number`}
                      placeholder={`Enter Rating`}
                      defaultValue={0}
                      onChange={(e) => {
                        e.preventDefault();
                        if (!isNaN(parseFloat(e.target.value)))
                          setState({
                            ...state,
                            rating: ((min, max, val) => {
                              return val < min ? min : val > max ? max : val;
                            })(0, 5, parseFloat(e.target.value)),
                          });
                      }}
                    />

                    <Stack direction={"row"}>
                      <FormControl>
                        <FormLabel>Min Price : </FormLabel>
                        <Input
                          type={"number"}
                          value={state.min}
                          onChange={(e) => {
                            setState({
                              ...state,
                              min: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Max Price : </FormLabel>
                        <Input
                          type={"number"}
                          value={state.max}
                          onChange={(e) => {
                            setState({
                              ...state,
                              max: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </FormControl>
                    </Stack>
                  </>
                )}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Container>

      <Center px={2}>
        <Grid templateColumns={`repeat(${cardsCountInRow}, 2fr)`} gap={0.5}>
          {filterProducts &&
            filterProducts.map((product, idx) => (
              <GridItem key={idx}>
                <Product
                  id={product.id}
                  imageUrl={product.image}
                  imageAlt="loading"
                  title={product.name}
                  price={product.price}
                  rating={product.rating}
                  reviewCount={product.reviewsCount}
                  badgeText={"new"}
                  product={product}
                />
              </GridItem>
            ))}
        </Grid>
      </Center>
      {filterProducts.length === 0 && (
        <Center>
          <Text fontSize={"7xl"} color={`red.400`}>
            {" "}
            ! NOT FOUND
          </Text>
        </Center>
      )}
      <Container mb={3} />
    </>
  );
}
