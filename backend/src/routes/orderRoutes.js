import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

export const orderRouter = Router ()
const prisma = new PrismaClient()

async function postOrder (req , res) {

    try {

       const { order , orderItems } = req.body
       
       // post order
      // Order => {totalBill }
       const postOrder = await prisma.order.create ({
         user_id : order.userId , 
         totalBill : order.totalBill ,
         createdAt : new Date().toString () ,
         deliveredAt : "NULLL" 
       })
       
       const orderId = parseInt(postOrder.id)
       
       // Order Items => { qt , name , price , product_id , order_id , totalBill }
       orderItems.forEach ( async (product) => {
         const res = await prisma.orderItem.create ({
            name : product.name ,
            qt : parseInt(product.qt) ,
            price : parseFloat (product.price) ,
            product_id : parseInt(product.id) ,
            order_id : orderId ,
            totalBill : parseFloat (product.totalBill)
         })
       })
       
       res.send ({...RESPONSE ,
        status : HTTP_RESPONSE.created ,
        message : 'success' ,
        data : postOrder
       })
        
       return
    } catch (err) {
        res.send ({...BAD_REQ_RESPONSE , status : HTTP_RESPONSE.bad_request , message : toString(err) , data : null })
    }
}

orderRouter
.post ('/' , postOrder)