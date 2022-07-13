import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

export const orderRouter = Router ()
const prisma = new PrismaClient()

async function postOrder (req , res) {

    try {
        
       const { order } = req.body
       
       // post order
      // Order => {totalBill , deliveredAt , createdAt }
       const postOrder = await prisma.order.create ({
         totalBill : order.totalBill ,
         createdAt : new Date().toString () ,
         deliveredAt : "NULLL" 
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