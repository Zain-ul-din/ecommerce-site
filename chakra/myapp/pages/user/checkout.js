
import { useContext } from "react"
import { cartContext } from "../../Hooks/RandomsHooks"
import { OrderDetails } from "../../components/Order"
import { Button, Center } from "@chakra-ui/react"

export default function CheckOut () {

   const context = useContext (cartContext)
   
   return (<> 
        <OrderDetails products = {context.products} cart = {context}/>
        <Center>
          <Button colorScheme={'facebook'}>Complete Check Out</Button>
        </Center>
   </>)
} 

