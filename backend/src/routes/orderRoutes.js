import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

export const orderRouter = Router ()
const prisma = new PrismaClient()

async function postOrder (req , res) {

    try {

       const { order , orderItems , orderDetails } = req.body
       
       // post order
      // Order => {totalBill }
       const postOrder = await prisma.order.create ({
        data :{
         user_id : order.userId , 
         totalBill : order.totalBill ,
         createdAt : new Date().toString () ,
         deliveredAt : "undefined"  
       }})
       
       const orderId = parseInt(postOrder.id)
       
       // Order Items => { qt , name , price , product_id , order_id , totalBill }
      orderItems.forEach ( async (product) => {
         const res = await prisma.orderItem.create ({
          data : {
            name : product.name ,
            qt : parseInt(product.qt) ,
            price : parseFloat (product.price) ,
            product_id : parseInt(product.id) ,
            order_id : orderId ,
            totalBill : parseFloat (product.totalBill)
         }})
      })
       
      const orderDetail = await prisma.shippingAddress.create ({ 
        data :{
          user_id : order.userId ,
          orderId : orderId ,
          userName : orderDetails.userName ,
          address : orderDetails.address ,
          city : orderDetails.city ,
          country : orderDetails.country ,
          email : orderDetails.email ,
          contactNumber : orderDetails.contactNumber ,
          postalCode : !orderDetails.postalCode ? 1111 : parseInt(orderDetails.postalCode) ,
          addressGoogle : !orderDetails.addressGoogle ? '1,1' : orderDetails.addressGoogle
       }
      })
      
      res.send ({...RESPONSE ,
        status : HTTP_RESPONSE.created ,
        message : 'success' ,
        data : {postOrder , orderDetail}
      })
        
       return
    } catch (err) {
        console.log (err)
        res.send ({...BAD_REQ_RESPONSE , status : HTTP_RESPONSE.bad_request , message : toString(err) , data : null })
    }
}

async function getAll (req , res) {
  const orders = await prisma.order.findMany({ include : {
    shippingAddress : true ,
    orderItems : true ,
  }})
   res.send(Object.assign(RESPONSE , {data : orders}))
}

async function getSingle (req , res) {
  const id = parseInt (req.params.id)
  const order = await prisma.order.findMany( { where : { id : id } ,
    include : {
      shippingAddress : true ,
      orderItems : true ,
    }}
  )
  
  res.send (Object.assign(RESPONSE 
  , {status : order.length == 0 ? 404 : 200 , data : order.length == 0 ? null : order}))
}

orderRouter
.get ('/:id' , getSingle)
.get ('/' , getAll)
.post ('/' , postOrder)