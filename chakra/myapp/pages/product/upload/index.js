import UploadProduct from "../../../components/ProductForm";
import { useHttpie as superPower } from "../../../Hooks/RandomsHooks";

export async function getServerSideProps(context) {
  const { data } = await superPower(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,
    "GET"
  );

  return {
    props: {
      categories: data.data,
    },
  };
}

export default function ProductUpload(props) {
  return (
    <>
      <UploadProduct {...props} payload={{}} />
    </>
  );
}
