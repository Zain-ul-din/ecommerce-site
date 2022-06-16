
import { Router } from "express"

export const productRouter = Router()



// Product Router
productRouter
.get ('/' , async  (req , res) => {
    res.send('Get All Products !!')
})
.get ('/:id' , (req , res) => {
    res.send(`product id : ${req.params.id}`)
})
.post ('/' , (req , res) => {
    res.send('Posted !!')
})
.delete ('/:id' , (req , res) => {
    res.send(`deleted product id : ${req.params.id}`)
})
.put ('/:id' , (req , res) => {
    res.send(`PUT product id : ${req.params.id}`)
})

const GetAll = function (req , res) {
   
    res.send ("Get All Products !!")
}