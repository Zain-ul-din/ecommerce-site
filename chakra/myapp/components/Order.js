import React, { useReducer, useEffect, useContext, useState } from "react";
import { cartContext } from "../Hooks/RandomsHooks";
import { userContext } from "../Hooks/Context";

import {
  Grid,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Center,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Box,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { useHttpie as superPower } from "../Hooks/RandomsHooks";
import { InputField, TextInputField } from "../Helpers/InputHelpers";
import Link from "next/link";
import { Toaster } from "../Helpers/Toaster";
import axios from "axios";
import { EVENT_NAME, socket } from "../Hooks/RandomsHooks";
import { MdLocalShipping } from "react-icons/md";

export default function Order(props) {
  function reducer(state, action) {
    // userName , address , addressGoogle , postalCode , city , country , orderId  , email , contactNumber
    switch (action.type) {
      case "userName":
        return {
          ...state,
          data: { ...state.data, userName: action.payload },
          errors: {
            ...state.errors,
            userName: {
              error: action.payload.length > 2 ? undefined : "🤯",
              message: "Name is too short",
            },
          },
        };
      case "country":
        return {
          ...state,
          data: { ...state.data, country: action.payload },
          errors: {
            ...state.errors,
            country: { error: undefined, message: "" },
          },
        };
      case "city":
        return {
          ...state,
          data: { ...state.data, city: action.payload },
          errors: {
            ...state.errors,
            city: {
              error: action.payload.length > 2 ? undefined : "🤯",
              message: "City name is too short",
            },
          },
        };
      case "address":
        return {
          ...state,
          data: { ...state.data, address: action.payload },
          errors: {
            ...state.errors,
            address: {
              error: action.payload.length >= 10 ? undefined : "🤯",
              message: `${10 - action.payload.length} more to go`,
            },
          },
        };
      case "postalCode":
        return {
          ...state,
          data: { ...state.data, postalCode: action.payload },
          errors: {
            ...state.errors,
            postalCode: {
              error: action.payload.length > 3 ? undefined : "🤯",
              message: "Invalid postal Code",
            },
          },
        };
      case "contactNumber":
        return {
          ...state,
          data: { ...state.data, contactNumber: action.payload },
          errors: {
            ...state.errors,
            contactNumber: {
              error: action.payload.length === 11 ? undefined : "🤯",
              message: `${11 - action.payload.length} more to go`,
            },
          },
        };
      case "email":
        return {
          ...state,
          data: { ...state.data, email: action.payload },
          errors: {
            ...state.errors,
            email: {
              error: undefined,
              message: "Contact Number seems like invalid",
            },
          },
        };
      case "addressGoogle":
        return {
          ...state,
          data: { ...state.data, addressGoogle: action.payload },
          errors: {
            ...state.errors,
            addressGoogle: {
              error: undefined,
              message: "Contact Number seems like invalid",
            },
          },
        };
    }
  }

  const context = useContext(cartContext);
  const loggedInUser = useContext(userContext);
  const [state, dispatch] = useReducer(reducer, { data: {}, errors: {} });
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  async function handleUploadOrder() {
    // details

    // validation
    setBtnLoading(true);
    if (context.products.length === 0) {
      Toaster(toast, "No Product in Cart", "error");
      setBtnLoading(false);
      return;
    }

    let totalBill = 0;
    for (let product of context.products)
      totalBill += isNaN(parseInt(product.totalBill))
        ? 0
        : parseInt(product.totalBill);

    if (totalBill === 0) {
      Toaster(
        toast,
        "Product are out of stock please check out your cart",
        "error"
      );
      setBtnLoading(false);
      return;
    }

    const userId = loggedInUser.user.id;

    const order = { totalBill, userId };
    const orderItems = context.products;

    const requiedFields = [
      "userName",
      "address",
      "city",
      "country",
      "email",
      "contactNumber",
    ];
    const fields = Object.entries(state.errors);

    for (let field of requiedFields)
      if (fields.filter((f) => f[0] === field).length === 0) {
        Toaster(toast, "Some Input Fields are missing", "error");
        setBtnLoading(false);
        return;
      }

    for (let [, error] of fields)
      if (error.error !== undefined) {
        Toaster(toast, "Some Input Fields are uncompelete", "error");
        setBtnLoading(false);
        return;
      }

    const orderDetails = state.data;

    const res = await superPower(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/`,
      "POST",
      {
        order,
        orderItems,
        orderDetails,
      }
    );

    Toaster(toast, "Order has been send", "success");
    socket.emit(EVENT_NAME, "🦄");
    setBtnLoading(false);
  }

  const toast = useToast();

  useEffect(() => {
    dispatch({ type: "country", payload: "Pakistan" });

    async function makeReq() {
      const token = "3110b89719b583";
      try {
        var { data } = await axios
          .get(`https://ipinfo.io?token=${token}`)
          .catch((err) => console.error(err));
      } catch (error) {
        return;
      }

      if (data) {
        dispatch({ type: "city", payload: data.city });
        dispatch({ type: "address", payload: `${data.region} , ${data.city}` });
        dispatch({ type: "postalCode", payload: data.postal });
        dispatch({ type: "addressGoogle", payload: data.loc });
      }
    }

    makeReq();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loggedInUser.user.name) return;
    dispatch({ type: "userName", payload: loggedInUser.user.name });
    dispatch({ type: "email", payload: loggedInUser.user.email });
  }, [loggedInUser]);

  return (
    <>
      {loading ? (
        <> Loading </>
      ) : (
        <>
          <OrderDetails
            products={context.products}
            cart={context}
            mode="Checkout"
          />
          <CheckOutForm state={state} dispatch={dispatch} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            pb={5}
          >
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
          <Center>
            <Flex>
              <Button
                colorScheme={"facebook"}
                mb={"5"}
                onClick={() => handleUploadOrder()}
                isLoading={btnLoading}
              >
                Complete Check Out
              </Button>
            </Flex>
          </Center>{" "}
        </>
      )}
    </>
  );
}

export function OrderDetails(props) {
  return (
    <>
      <Center>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          mt={5}
          fontFamily={"monospace"}
        >
          ORDER
        </Text>
      </Center>
      <Grid
        gridAutoFlow={"column"}
        mt={2}
        gap={1}
        p={2}
        px={{ lg: 60, md: 30, sm: 1, base: 0 }}
        overflowX={"auto"}
        overscrollBehaviorX={"contain"}
        className={"boardslist"}
      >
        <TableContainer rounded={"base"}>
          <Table size="sm" variant={"striped"}>
            <Thead>
              <Tr bg={"gray.300"}>
                <Th py={5}>Product Name</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>In Stock</Th>
                <Th>Total</Th>
                {props.mode === "Checkout" && <Th>Delete</Th>}
              </Tr>
            </Thead>

            <Tbody>
              {props.products &&
                props.products.map((product, idx) => (
                  <OrderMeta
                    key={idx}
                    product={product}
                    mode={props.mode}
                    context={props.cart}
                  />
                ))}
              <Tr bg={"linkedin.100"}>
                <Th>{` `}</Th>
                <Th>{` `}</Th>
                <Th>{` `}</Th>
                <Th fontSize={"1xl"} fontWeight={"medium"}>
                  Total BILL :{" "}
                </Th>
                <Th py={5} fontSize={"1xl"} fontWeight={"medium"}>
                  {" "}
                  {(() => {
                    let total = 0;
                    props.products &&
                      props.products.forEach(
                        (val) =>
                          (total += isNaN(parseInt(val.totalBill))
                            ? 0
                            : parseInt(val.totalBill))
                      );
                    return total;
                  })()}{" "}
                </Th>
                {props.mode === "Checkout" && <Th>{` `}</Th>}
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

function OrderMeta({ product, context, mode }) {
  useEffect(() => {
    if (mode !== "Checkout") return;
    if (!product.qt || product.qt <= product.countInStock) return;
    let qt =
      product.qt > product.countInStock ? product.countInStock : product.qt;
    console.log("QT : ", qt);
    context.dispatch({
      type: "Update",
      payload: {
        id: product.id,
        totalBill: isNaN(product.qt * product.price)
          ? 0
          : product.qt * product.price,
        qt,
      },
    });
  }, [product]);

  useEffect(() => {
    if (mode !== "Checkout") return;
    if (product.qt) {
      let qt = parseInt(product.qt);
      context.dispatch({
        type: "Update",
        payload: { id: product.id, totalBill: qt * product.price, qt },
      });
    }
  }, []);

  return (
    <Tr
      bg={"gray.100"}
      _hover={{ bg: "white" }}
      cursor={"pointer"}
      key={product.id}
    >
      <Th py={3} _hover={{ color: "blue.600" }}>
        {<Link href={`/product/${product.id}`}>{product.name}</Link>}
      </Th>
      <Th>{product.price}</Th>
      <Th>
        {parseInt(product.countInStock) === 0 ? (
          <Text color={"red"}>Out Of Stock</Text>
        ) : (
          <NumberInput
            size="sm"
            maxW={20}
            defaultValue={1}
            min={1}
            max={product.countInStock}
            value={isNaN(product.qt) ? "" : product.qt}
            isDisabled={mode !== "Checkout"}
            onChange={(_, number) => {
              let qt = Math.abs(number);
              context.dispatch({
                type: "Update",
                payload: {
                  id: product.id,
                  totalBill: isNaN(qt) ? 0 : qt * product.price,
                  qt,
                },
              });
            }}
            isInvalid={isNaN(product.qt)}
            onFocus={(e) => {
              e.preventDefault();
              if (!isNaN(product.qt)) return;
              let qt = 1;
              context.dispatch({
                type: "Update",
                payload: { id: product.id, totalBill: qt * product.price, qt },
              });
            }}
            variant={"filled"}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </Th>
      <Th>{product.countInStock}</Th>
      <Th>{product.totalBill}</Th>
      {mode === "Checkout" && (
        <Th>
          <Button
            colorScheme={"red"}
            onClick={(e) => {
              e.stopPropagation();
              context.dispatch({ type: "Delete", payload: { id: product.id } });
            }}
          >
            Remove
          </Button>
        </Th>
      )}
    </Tr>
  );
}

import { countryList } from "../Helpers/constants";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdOutlineTextRotationAngleup } from "react-icons/md";

export function CheckOutForm({ state, dispatch }) {
  return (
    <>
      <Center>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          mt={5}
          fontFamily={"monospace"}
        >
          ORDER DETAILS
        </Text>
      </Center>

      <Stack px={5}>
        <Center>
          <InputField
            name="userName"
            type={"text"}
            label={"Enter your full name*"}
            helperText={""}
            state={state}
            dispatch={dispatch}
          />
        </Center>

        <Center>
          <Menu computePositionOnMount={false} direction={"ltr"} isLazy mb={10}>
            <MenuButton as={Button}>
              Country : {state.data.country} <ChevronDownIcon />
            </MenuButton>
            <MenuList
              position={"fixed"}
              maxH={"30vh"}
              overflowY={"scroll"}
              onScroll={() => {}}
            >
              {countryList &&
                countryList.map((country, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={(e) =>
                      dispatch({ type: "country", payload: country })
                    }
                  >
                    {country}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Center>

        <Center>
          <InputField
            name="contactNumber"
            type={"number"}
            label={"Enter Contact Number*"}
            helperText={"11 Digit Contact Number without space"}
            state={state}
            dispatch={dispatch}
          />
        </Center>

        <Center>
          <InputField
            name="city"
            type={"text"}
            label={"Enter your city name*"}
            helperText={""}
            state={state}
            dispatch={dispatch}
          />
        </Center>

        <Center>
          <TextInputField
            name="address"
            type={"text"}
            label={"Enter full Address*"}
            helperText={"enter your full address so we can easily find you"}
            state={state}
            dispatch={dispatch}
          />
        </Center>

        <Center>
          <InputField
            name="postalCode"
            type={"number"}
            label={"Enter Postal Code (optional)"}
            state={state}
            dispatch={dispatch}
          />
        </Center>

        <Center>
          <Flex w={"100%"} justifyContent={"center"}>
            <Flex w="2xl" py={"1"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={state.data.email} onChange={() => {}} />
              </FormControl>
            </Flex>
          </Flex>
        </Center>
      </Stack>

      <Flex mt={10} />
    </>
  );
}
