import { useHttpie as superPower } from "../../Hooks/RandomsHooks";
import OrderRenderer from "../../components/adminComponents/order";

export async function getServerSideProps(context) {
  const res = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/order/`,
    "GET"
  );

  return {
    props: { orders: res.data.data },
  };
}

export default function Orders(props) {
  return <OrderRenderer {...props} />;
}
