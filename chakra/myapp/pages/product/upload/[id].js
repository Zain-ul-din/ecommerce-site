import { useHttpie as superPower } from "../../../Hooks/RandomsHooks";
import UploadProduct from "../../../components/ProductForm";

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
  const { data } = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
    "GET"
  );

  if (!data.data) return redirectPayload;

  return {
    props: {
      data: data.data,
    },
  };
}

export default function UpdateProduct(props) {
  return (
    <UploadProduct
      {...props}
      payload={{ ...props.data[0], image: null }}
      mode={"update"}
    />
  );
}
