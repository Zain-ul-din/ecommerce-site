// category Router
import { Router } from "express"
import { PrismaClient }  from '@prisma/client'
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

export const superCategoryRouter = Router ()

const prisma = new PrismaClient()

async function getAll (req , res) {
   const categories = await prisma.superCategory.findMany({
    include : { categories : true }
   })
   res.send(Object.assign(RESPONSE , {data : categories}))
}

async function getUnique (req , res) {
    const category = await prisma.superCategory.findMany({where : {name : req.params.name} , include : {
        categories : true
    }})

    res.send (Object.assign(RESPONSE 
    , {status : category.length == 0 ? 404 : 200 , data : category.length == 0 ? null : category}))
}

async function post (req , res) {
    var { category } = req.body
    category = typeof category !== 'object'  ? {} : category
    let error = null
    
    const newCategory = await prisma.superCategory.create ({
        data : {
           name : category.name ,
           image : category.image ,
           categories : { create : [] }
        }
    })
    .catch (err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : newCategory , status : HTTP_RESPONSE.created}))
}

async function deleteUnique (req , res) {
    const id = parseInt(req.params.id)
    let error = null
    
    await prisma.superCategory.delete ({where : { id : id }})
    .catch(err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : {}}))
}

async function updateUnique (req , res) {
    var { category } = req.body
    category = typeof category !== 'object'  ? {} : category
    const id = parseInt(req.params.id)
    let error = null
    
    const updatedCategory = await prisma.superCategory.update ({
        where : {id : id} ,
        data : {
            name : category.name ,
            image : category.image 
        }
    })
    .catch (err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : updatedCategory}))
}

superCategoryRouter
.get ('/' , getAll)
.get ('/:name' , getUnique)
.post('/' , post)
.delete('/:id' , deleteUnique)
.put ('/:id' , updateUnique)


