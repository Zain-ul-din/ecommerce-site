
import { useEffect, useRef } from 'react'
import { useHttpie as superPower } from "../../Hooks/RandomsHooks"
import Categories from "../../components/Categories"
import Products from '../../components/Products'



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
  
    const params = context.params.name
    let mode = ''
    var res = undefined
    
    // Category Page
    if (params.length === 1) {
       const category = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/category/${params[0]}` , 'GET')
       
       const { data } = category
       res = data.data 
       var _products = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/subcategory/super/${res[0].id}` , 'GET')
       
       var __products = _products.data.data

       var products = []

       __products && __products.forEach ( ele => products = products.concat (ele.products) )
       mode = 'category'
       if (res === null ) return redirectPayload
    }
    else if (params.length == 2) {
      const subcategory = await superPower (`${process.env.NEXT_PUBLIC_SERVER_URL}/subcategory/${params[1]}` , 'GET') 
      const { data } = subcategory
      res = data.data
      mode = 'subCategory'
      if (res === null ) return redirectPayload
    } 
    else return redirectPayload
    
    return  {   
      props : {
          data : res || null 
          , mode 
          , products : products || null
      }
    }
}


export default function Category (props) {
  
  const ref = useRef (null)

  useEffect (()=>{
    ref?.current?.scrollIntoView({behavior : 'smooth'})
  } , [])
  

  return (
    <>
    { props.mode == 'category' ?
        <>
          <Categories categories={props.data[0].categories} mode = 'subCategory' label={`${props.data[0].name}`} eleRef = {ref}/>
          <Products label={'Top Products'} products = {props.products}/>
        </>
        :
        <>
           <Products label={'Top Products'} products = {props.data[0].products} />
        </>
    }
    </>
  )
}