// User Router
import { Router } from "express"
import { PrismaClient }  from '@prisma/client'
import { RESPONSE , BAD_REQ_RESPONSE , PRISMA_ERROR_RESPONSE } from "../Helper/utilities.js" 
import { isValidDate , addSalt } from "../Helper/utilities.js"
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js"

// hackers === 💀 || users === 😍
import jwt from "jsonwebtoken"
import cookie from 'cookie'

export const userRouter = Router()
const prisma = new PrismaClient()

async function getAll (req , res) {
    const allUsers = await prisma.user.findMany({})
    res.send(Object.assign(RESPONSE , {data : allUsers}))
} 

async function getUnique (req , res) {
    const user = await prisma.user.findMany({where : {email : req.params.email}})
    
    if (user.length !== 0) {
     // creates token
    
     console.log(user[0])
     const token = jwt.sign ( user[0] , process.env.JWT_SECRET , {
        expiresIn : '24h'
     })

     console.log(process.env.COOKIE_NAME)
     
      res.setHeader ('Set-Cookie',  cookie.serialize (process.env.COOKIE_NAME,
          addSalt(token , 'http') , {
          httpOnly: false,
          sameSite : 'lax',
          maxAge : 24 * 60 * 60,
          path : '/',
          secure : process.env.NODE_ENV === 'production'
         }
      ))
    }

    res.send (Object.assign (RESPONSE 
    , {status : user.length == 0 ? 404 : 200 , data : user.length == 0 ? null : user}))
}

async function post (req , res) {
    var { user  } = req.body
    user = typeof user !== 'object' ? {} : user
    let error = null
    
    const newUser = await prisma.user.create ({
        data : {
            name : user.name  ,
            email : user.email , 
            auth : user.auth ,
            
            isAdmin : user.isAdmin === undefined ? false : user.isAdmin ,
            isStuff : user.isStuff === undefined ? false : user.isStuff ,
            isActive : user.isActive === undefined ? true : user.isActive,
            createdAt : isValidDate(new Date(user.createdAt)) ? user.createdAt : new Date().toString(),
            updatedAt : isValidDate(new Date(user.updatedAt)) ? user.updatedAt : new Date().toString(),
            
            reviews : { create : [] }
    }})
    .catch (e => { error = e })
    
    if (error){ 
        res.send(Object.assign(BAD_REQ_RESPONSE 
       , {error :  PRISMA_ERROR_RESPONSE(error)}))
       return
    }
    
    // creates token
    
    const token = jwt.sign (newUser , process.env.JWT_SECRET , {
        expiresIn : '24h'
    })

    res.setHeader ('Set-Cookie',  cookie.serialize (process.env.COOKIE_NAME,
        addSalt(token , 'http') , {
        httpOnly: true,
        sameSite : 'lax',
        maxAge : 24 * 60 * 60,
        path : '/',
        secure : process.env.NODE_ENV === 'production'
       }
    ))
    
    res.send(Object.assign(RESPONSE , { data : newUser , status : HTTP_RESPONSE.created}))
}

async function deleteUnique (req , res) {
    const id = parseInt(req.params.id)
    let error = null
    
    // delete reviews
    await prisma.review.deleteMany({where : {user_id : id }}).catch(e=>e)
    await prisma.user.delete ({ where : {id : id}}).catch(err => error = err)
    
    if (error) res.send(Object.assign(BAD_REQ_RESPONSE 
    , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : {} }))    
}

async function updateUnique (req , res) {
    const email = req.params.email
    var { user  } = req.body
    user = typeof user !== 'object' ? {} : user
    let error = null 
    
    const updatedUser = await prisma.user.update({
        where : {email : email} ,
        data : {
            name : user.name  ,
            email : user.email , 
            auth : user.auth ,
        
            isAdmin : user.isAdmin === undefined ? false : user.isAdmin ,
            isStuff : user.isStuff === undefined ? false : user.isStuff ,
            isActive : user.isActive === undefined ? true : user.isActive,
            createdAt : isValidDate(new Date(user.createdAt)) ? user.createdAt : new Date().toString(),
            updatedAt : isValidDate(new Date(user.updatedAt)) ? user.updatedAt : new Date().toString(),
        }
    })
    .catch (err => error = err)
    
    if (error) res.send(Object.assign(BAD_REQ_RESPONSE 
        , {error :  PRISMA_ERROR_RESPONSE(error)}))
    else res.send(Object.assign(RESPONSE , { data : updatedUser }))
}

// user CRUD
userRouter
.get ('/' , getAll)
.get ('/:email' , getUnique)
.post ('/' , post)
.delete('/:id' , deleteUnique)
.put ('/:email' , updateUnique )






