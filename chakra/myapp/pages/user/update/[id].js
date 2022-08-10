import React from "react";
import SocialProfile from "../../../components/UserProfile";
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile/${id}`,
    "GET"
  );

  const { data } = res.data;

  if (!data) return redirectPayload;

  return {
    props: {
      user: data[0] || null,
    },
  };
}

export default function UpdateUser(props) {
  return (
    <>
      <SocialProfile user={props.user} mode={"admin"} />
    </>
  );
}
