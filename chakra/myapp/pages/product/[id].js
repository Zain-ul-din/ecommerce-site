import ProductDetail from "../../components/ProductDetail"
import { useHttpie as superPower } from "../../Hooks/RandomsHooks"


export async function getServerSideProps (context) {
  const redirectPayload = {
    redirect: {
      permanent: false,
      destination: "/notFound",
    },    
    props : {
        data : {} 
    }
  }

  const id = context.params.id
  const {data} = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}` , 'GET')
  
  if (!data.data) return redirectPayload

  return {
    props : {
      data : data.data
    }
  }
}

export default function productDetail (props) {
    return (
        <>
          <ProductDetail product = {props.data[0]} />
        </>
    )
}

