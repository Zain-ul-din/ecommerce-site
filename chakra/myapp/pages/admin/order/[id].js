import React from "react";
import { useHttpie as superPower } from "../../../Hooks/RandomsHooks";

export async function getServerSideProps(context) {
  const redirectPayload = {
    redirect: {
      permanent: false,
      destination: "/notFound",
    },
    props: {
      data: {},
    },
  };

  const id = context.params.id;

  const res = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/order/${id}`,
    "GET"
  );

  if (!res.data.data) return redirectPayload;

  return {
    props: { orders: res.data.data },
  };
}

import { OrderDetails } from "../../../components/Order";
import { UserCendentialRenderer } from "../../../components/adminComponents/order";

export default function SingleOrder(props) {
  console.log(props.orders[0].shippingAddress);
  return (
    <>
      <OrderDetails products={props.orders[0].orderItems} mode={"readonly"} />
      <UserCendentialRenderer
        shippingAddress={props.orders[0].shippingAddress}
      />
    </>
  );
}
