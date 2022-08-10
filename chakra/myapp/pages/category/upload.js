import React, { useReducer, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { Toaster } from "../../Helpers/Toaster";
import {
  Flex,
  Center,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

import { InputField, FileInputField } from "../../Helpers/InputHelpers";

import { uploadFile } from "../../Helpers/ApiFetcher";
import { useHttpie as superPower } from "../../Hooks/RandomsHooks";

export async function getServerSideProps(context) {
  const { data } = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,
    "GET"
  );

  return { props: { categories: data.data } };
}

function Reducer(state, action) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        data: { ...state.data, name: action.payload },
        errors: {
          ...state.errors,
          name: {
            error: action.payload.length > 1 ? undefined : "🎇",
            message: "name is too short",
          },
        },
      };
    case "image":
      return {
        ...state,
        data: { ...state.data, image: action.payload },
        errors: { ...state.errors, image: { error: undefined, message: "" } },
      };
    case "reset":
      return { data: {}, errors: {} };
  }
}

function SubReducer(state, action) {
  switch (action.type) {
    case "category":
      return {
        ...state,
        data: {
          ...state.data,
          superCategory_id: action.payload.id,
          superCategoryName: action.payload.name,
        },
        errors: {
          ...state.errors,
          category: { error: undefined, message: "" },
        },
      };
    case "name":
      return {
        ...state,
        data: { ...state.data, name: action.payload },
        errors: {
          ...state.errors,
          name: {
            error: action.payload.length > 1 ? undefined : "🎇",
            message: "name is too short",
          },
        },
      };
    case "image":
      return {
        ...state,
        data: { ...state.data, image: action.payload },
        errors: { ...state.errors, image: { error: undefined, message: "" } },
      };
    case "reset":
      return { data: {}, errors: {} };
  }
}

export default function Upload(props) {
  const [state, dispatch] = useReducer(Reducer, { data: {}, errors: {} });

  const toast = useToast();
  const [subState, subDispatch] = useReducer(SubReducer, {
    data: {},
    errors: {},
  });

  const [categories, setCategories] = useState(props.categories);

  console.log(subState);

  async function handleUpload() {
    if (Object.entries(state.errors).length != 2) {
      Toaster(toast, "some input fields are missing", "error");
      return;
    }

    for (let [, val] of Object.entries(state.errors)) {
      if (val.error !== undefined) {
        console.log(val);
        Toaster(toast, "Invalid Input", "error");
        return;
      }
    }

    await uploadFile(state.data.image, async (imageUrl) => {
      if (!imageUrl.data) {
        Toaster(toast, "image upload fail", "error");
        return;
      }

      const res = await superPower(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,
        "POST",
        {
          category: { ...state.data, image: imageUrl.data },
        }
      ).catch(async (err) => {
        await superPower(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`,
          "DELETE"
        );
        Toaster(toast, "upload fail", "error");
      });

      if (
        res.data &&
        res.data.error &&
        (res.data.error.code === "P2002" || res.data.error)
      ) {
        Toaster(toast, "upload fail category name already exists", "error");
        await superPower(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`,
          "DELETE"
        );
        dispatch({ type: "reset" });
        return;
      }

      if (res) {
        Toaster(toast, "data has been uploaded", "success");
        const { data } = await superPower(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,
          "GET"
        );
        setCategories(data.data);
        dispatch({ type: "reset" });
      }
    });
  }

  async function uploadSubCategory() {
    if (Object.entries(subState.errors).length != 3) {
      Toaster(toast, "some input fields are missing", "error");
      return;
    }

    for (let [, val] of Object.entries(subState.errors)) {
      if (val.error !== undefined) {
        console.log(val);
        Toaster(toast, "Invalid Input", "error");
        return;
      }
    }

    await uploadFile(subState.data.image, async (imageUrl) => {
      if (!imageUrl.data) {
        Toaster(toast, "image upload fail", "error");
        return;
      }

      const res = await superPower(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subcategory`,
        "POST",
        {
          category: { ...subState.data, image: imageUrl.data },
        }
      ).catch(async (err) => {
        await superPower(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`,
          "DELETE"
        );
        Toaster(toast, "upload fail", "error");
      });

      if (
        res.data &&
        res.data.error &&
        (res.data.error.code === "P2002" || res.data.error)
      ) {
        Toaster(toast, "upload fail category name already exists", "error");
        subDispatch({ type: "reset" });
        await superPower(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl.data}`,
          "DELETE"
        );
        return;
      }

      if (res) {
        Toaster(toast, "data has been uploaded", "success");
        subDispatch({ type: "reset" });
      }
    });
  }

  return (
    <>
      <>
        {" "}
        <Flex
          w={"100%"}
          justifyContent={"center"}
          alignContent={"center"}
          p={10}
          flexDirection={"column"}
          bg={"whiteAlpha.800"}
        >
          <Center>
            <Text fontSize={"3xl"}>CATEGORIES FORM</Text>
          </Center>

          <InputField
            name="name"
            label="Enter Category Name"
            type={"text"}
            state={state}
            dispatch={dispatch}
          />

          <FileInputField
            name="image"
            label="Select Image"
            state={state}
            dispatch={dispatch}
          />

          <Center p={5}>
            <Button
              size={"lg"}
              color="green.600"
              variant={"outline"}
              onClick={() => {
                handleUpload();
              }}
            >
              SUBMIT
            </Button>
          </Center>

          <Center>
            <Text fontSize={"3xl"}>SUB-CATEGORIES FORM</Text>
          </Center>

          <Flex justifyContent={"center"} mt={5}>
            <Menu>
              <MenuButton
                as={Button}
                variant={"solid"}
                size={"lg"}
                rightIcon={
                  subState.data.superCategory_id !== undefined ? (
                    <CheckIcon />
                  ) : (
                    <ChevronDownIcon />
                  )
                }
                outlineColor={
                  subState.data.superCategory_id !== undefined
                    ? "green.400"
                    : "red.200"
                }
                color={
                  subState.data.superCategory_id !== undefined
                    ? "green"
                    : "black"
                }
              >
                Select Category
              </MenuButton>
              <MenuList>
                {categories &&
                  categories.map((category, key) => {
                    return (
                      <MenuItem
                        key={key}
                        _hover={{ opacity: 80 }}
                        onClick={() =>
                          subDispatch({ type: "category", payload: category })
                        }
                        icon={
                          <CheckIcon
                            opacity={
                              subState.data?.superCategory_id === category.id
                                ? 1
                                : 0
                            }
                          />
                        }
                      >
                        {category.name}
                      </MenuItem>
                    );
                  })}
              </MenuList>
            </Menu>
          </Flex>

          <InputField
            name="name"
            label="Enter Sub Category Name"
            type={"text"}
            state={subState}
            dispatch={subDispatch}
          />

          <FileInputField
            name="image"
            label="Select Image"
            state={subState}
            dispatch={subDispatch}
          />

          <Center p={5}>
            <Button
              size={"lg"}
              color="green.600"
              variant={"outline"}
              onClick={() => {
                uploadSubCategory();
              }}
            >
              SUBMIT
            </Button>
          </Center>
        </Flex>
      </>
    </>
  );
}
