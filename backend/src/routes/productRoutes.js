// product routes
import { Router } from "express"
import { PrismaClient }  from '@prisma/client'
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { isValidDate } from "../Helper/utilities.js"
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

export const productRouter = Router()
const prisma = new PrismaClient()

async function getAll (req , res) {
   var products = await prisma.product.findMany({})
   
   products = await Promise.all (products.map( async (p) => {
       return Object.assign(p , {reviews : await prisma.review.findMany({where : {product_id : p.id }})}) 
   }))
   
   res.send(Object.assign(RESPONSE , {data : products}))
}

async function getUnique (req , res) {
   const id = parseInt (req.params.id)
   var product = await prisma.product.findMany({where : {id : id } })
   if ( Array.isArray(product) )
        product = await Promise.all (product.map( async (p) => {
         return Object.assign(p , {reviews : await prisma.review.findMany({where : {product_id : p.id }})}) 
        }))
      
    res.send (Object.assign(RESPONSE 
    , {status : product.length == 0 ? 404 : 200 , data : product.length == 0 ? null : product}))
}

async function post (req , res) {
    var {product} = req.body 
    product = typeof product !== 'object' ? {} : product
    let error = null
    
    const categoryName = await prisma.category.findUnique ({where : {id : parseInt(product.category_id)}}).catch(e=>e)
    
    const newProduct = await prisma.product.create ({
       data : {
        createdAt : isValidDate(new Date(product.createdAt)) ? product.createdAt : new Date().toString(),
        updatedAt : isValidDate(new Date(product.updatedAt)) ? product.updatedAt : new Date().toString(),
        name : product.name ,
        price : parseFloat(product.price) ,
        description : product.description === undefined ? "no description added" : product.description ,
        image : product.image ,
        brand : product.brand === undefined ? "unkown" : product.brand ,
        rating : product.rating === undefined ? 0 : parseFloat(product.rating),
        countInStock : parseInt(product.countInStock ),
        category_id : parseInt(product.category_id ),
        categoryName : categoryName.name,
        tags : product.tags === undefined ? "" : product.tags ,
        reviews : { create : [] }
       }
    })
    .catch (err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : newProduct , status : HTTP_RESPONSE.created}))
}

async function deleteUnique (req , res) {
    const id = parseInt(req.params.id)
    let error = null
    
    // delete review
    await prisma.review.deleteMany({where : {product_id : id}}).catch(e=>e)
    
    await prisma.product.delete ({where : { id : id }})
    .catch(err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : {}}))
}

async function updateUnique (req , res) {
    var {product} = req.body 
    product = typeof product !== 'object' ? {} : product
    const id = parseInt(req.params.id)
    let error = null
    let ratingCount = 0
    
     
    const updatedProduct = await prisma.product.update({
        where : {id : id} ,
        data : {
            createdAt : isValidDate(new Date(product.createdAt)) ? product.createdAt : new Date().toString(),
            updatedAt : isValidDate(new Date(product.updatedAt)) ? product.updatedAt : new Date().toString(),
            name : product.name ,
            price : parseFloat(product.price) ,
            description : product.description ,
            image : product.image ,
            brand : product.brand ,
            rating : product.rating === undefined ? 
            (
                prisma.review.findMany({where : {id : id}}) === [] ?
                parseFloat ((await prisma.review.findMany({where : {id : id}})).reduce((prev , acc)=>{
                    ratingCount += 1
                    return prev.rating + acc.rating
                },0) / ratingCount ) : 0
            )
            : parseFloat(product.rating),
            countInStock : parseInt(product.countInStock ),
            category_id : parseInt(product.category_id ),
            reviewsCount : parseInt(product.reviewsCount) ,
            veiws : parseInt(product.veiws)
        }
    })
    .catch(err => error = err)
    
    if(error) 
        res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : updatedProduct}))
}

// Product Router
productRouter
.get ('/' , getAll)
.get ('/:id' , getUnique)
.post ('/' , post)
.delete ('/:id' , deleteUnique)
.put ('/:id' , updateUnique)


