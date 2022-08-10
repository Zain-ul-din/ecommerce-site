import React from "react";
import { useHttpie as superPower } from "../../Hooks/RandomsHooks";
import UserDashBoard from "../../components/adminComponents/usersDashboard";

export async function getServerSideProps(context) {
  const res = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/`,
    "GET"
  );

  return {
    props: {
      users: res.data.data,
    },
  };
}

export default function Users(props) {
  return <UserDashBoard {...props} />;
}
