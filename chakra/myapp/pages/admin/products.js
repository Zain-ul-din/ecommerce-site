
import ProductsDashBoard from "../../components/adminComponents/productsDashBoard"
import { useHttpie as superPower } from "../../Hooks/RandomsHooks"

export async  function getServerSideProps (context) {
    
    const res = await superPower(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/` , 'GET')

    console.log(res.data)
    return { props : {products : res.data.data}}
}

export default function Products (props) {
    return <ProductsDashBoard {...props} />
}