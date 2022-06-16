// category Router
import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { RESPONSE } from "../Helper/utilities.js"

export const categoryRouter = Router ()
const prisma = new PrismaClient()

// Get All 
async function getAll (req , res) {
   const categories = await prisma.category.findMany({})
   res.send(Object.assign(RESPONSE , {data : categories}))
}

// Get Unique
async function getUnique (req , res) {
    const category = await prisma.category.findMany({where : {name : req.params.name}})
    res.send (Object.assign(RESPONSE 
    , {status : user.length == 0 ? 404 : 200 , data : category.length == 0 ? null : category}))
}

categoryRouter
.get ('/' , getAll)
.get ('/:name' , getUnique)
