import React, { useEffect, useState } from "react";

import {
  Grid,
  TableContainer,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Center,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";

// import { OrderDetails } from "../Order"
import Link from "next/link";

export default function OrderRenderer(props) {
  return (
    <>
      <Center>
        <Text fontSize={"2xl"} pt={3}>
          All Orders
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
                <Th py={5}>Product QT</Th>
                <Th>Order Worth</Th>
                <Th>Status</Th>
                <Th>createdAt</Th>
              </Tr>
            </Thead>

            <Tbody>
              {props.orders &&
                props.orders.map((order, idx) => (
                  <OrderMeta key={idx} order={order} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export function OrderMeta(order) {
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    setCreatedAt(new Date(order.order.createdAt).toDateString());
  }, [order]);

  return (
    <>
      <Link href={`/admin/order/${order.order.id}`}>
        <Tr bg={"gray.100"} _hover={{ bg: "gray.200" }} cursor={"pointer"}>
          <Th>{order.order.orderItems.length}</Th>
          <Th>{order.order.totalBill + " PKR"}</Th>
          <Th>{order.order.status}</Th>
          <Th>{createdAt}</Th>
        </Tr>
      </Link>
    </>
  );
}

export function UserCendentialRenderer({ shippingAddress }) {
  return (
    <>
      <Center>
        <Flex>
          <Stack p={5}>
            <Link href={`/user/update/${shippingAddress.user_id}`}>
              <Text cursor={"pointer"}>
                {`Name : ` + shippingAddress.userName}
              </Text>
            </Link>
            <Text>{`Address : ` + shippingAddress.address}</Text>
            <Text>{`City :` + shippingAddress.city}</Text>
            <Text>{`Country : ` + shippingAddress.country}</Text>
            <Text>{`Contact Number : ` + shippingAddress.contactNumber}</Text>
            <Text>{`Postal Code : ` + shippingAddress.postalCode}</Text>
            <Text>{`Email : ` + shippingAddress.email}</Text>
          </Stack>
        </Flex>
      </Center>
    </>
  );
}
