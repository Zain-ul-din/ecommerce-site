import { useHttpie as power } from "../Hooks/RandomsHooks"
import ProductsComponent from "../components/Products"

export async function getServerSideProps (context) {
    const res = await power (`${process.env.NEXT_PUBLIC_SERVER_URL}/product` , 'GET')
    
    return {
        props :  { products : res.data.data }
    }
} 

export default function Products (props) {
    return (
        <>
           <ProductsComponent label={'All Products'} products = {props.products} />
        </>
    )
}

