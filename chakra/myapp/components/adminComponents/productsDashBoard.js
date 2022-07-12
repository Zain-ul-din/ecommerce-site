import { 
    Table  ,
     TableContainer ,
     Thead ,
     Th ,
     Td ,
     Tbody,
     Tr ,
     Grid ,
     Button,
     Badge ,
     Image,
     Popover ,
     PopoverTrigger ,
     PopoverContent,
     PopoverHeader,
     Stack
} from "@chakra-ui/react"

import { useEffect, useState } from "react"

import { EVENT_NAME , socket } from "../../Hooks/RandomsHooks"

import Link from "next/link"

import { useHttpie as superPower } from "../../Hooks/RandomsHooks"

export default function ProductsDashBoard (props) {

  
  const [products , setProducts] = useState (props.products)
    
  function reRenderHook (id) { setProducts ( products.filter (product_itr => product_itr.id !== id) ) }

  return (
        <>
        <Grid  gridAutoFlow={'column'} 
         mt = {2}
         gap = {1}
         p = {2}
         overflowX = {'auto'}
         overscrollBehaviorX = {'contain'}
         className = {'boardslist'}
         >
    <TableContainer>
    <Table size='md' variant={'striped'}>
     <Thead>
      <Tr>
        <Th>Image</Th>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>brand</Th>
        <Th>rating</Th>
        <Th>CountInStock</Th>
        <Th>ReviewsCount</Th>
        <Th>CreatedAt</Th>
        <Th>UpdatedAt</Th>
      </Tr>
    </Thead>
    <Tbody>
      {products && products.map ((product , idx)=> <ProductColumn product={product} key = {idx}  reRenderHook = {reRenderHook}/>)}
    </Tbody>
    </Table>
    </TableContainer>
    </Grid></>
)
}

function ProductColumn ({product , reRenderHook}) {

  const [ createdAt , setCreatedAt ] = useState ('')
  const [ updatedAt , setUpdatedAt ] = useState ('')

  const [loading , setLoading] = useState (false)

  useEffect (() => {
    setCreatedAt (new Date (product.createdAt).toLocaleDateString())
    setUpdatedAt (new Date(product.updatedAt).toLocaleDateString())
  } , [])
  return (
    <Tr >
        <Td>
         <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.image}`} target = {'_blank'}>
          <Image src = {`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.image}`} 
           alt = {'loading'} width = {30} height = {30}
           cursor = {'pointer'}
          />
          </Link>
        </Td>
        <Td>{product.name}</Td>
        <Td>{product.price}</Td>
        <Td><Badge>{product.brand}</Badge></Td>
        <Td>{product.rating}</Td>
        <Td>{product.countInStock}</Td>
        <Td>{product.reviewsCount}</Td>
        <Td>{createdAt}</Td>
        <Td>{updatedAt}</Td>
        <Td>
          <Link href = {`/product/upload/${product.id}`}>
           <Button colorScheme={'whatsapp'} size = {'sm'} >Edit</Button>
          </Link>
        </Td>
        <Td>
          <Popover trigger={'hover'} placement = {`left`}>
          <PopoverTrigger >  
          <Button colorScheme={'red'} size = {'sm'}>Delete</Button>
          </PopoverTrigger>
          <PopoverContent w = {'100%'}>
            <PopoverHeader>
              Are You Sure to Delete Product ` {product.name} ` ?
            </PopoverHeader>
            <Stack p ={5}>
              <Stack>
                <Button colorScheme={`red`} size = {'md'} 
                isLoading = {loading}
                onClick = {async (e)=>{
                  e.preventDefault ()
                  setLoading (true)
                  await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${product.id}` ,'DELETE')
                  setLoading (false)
                  socket.emit (EVENT_NAME , '🧐')
                  reRenderHook(product.id)
                }}>Delete</Button>
              </Stack>
            </Stack>
          </PopoverContent>
          </Popover>
        </Td>
    </Tr>
  )
}