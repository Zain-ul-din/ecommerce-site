import express from "express"

const app = express()

// Listen to server

console.log('Welcome to ecommerce apis')

app.listen(8000 , () => {
    console.log(`server is running on port 8000`)
})


// Routing

// npx prisma db push -- to submit changes
// npx prisma migrate dev

// install @prisma/client also
// add seed script to package.JSON
  // prisma : {"seed" : "node ./prisma/seed.js"}
  // run : npx prisma db seed

// PRISMA STUDIO
// npx prisma studio 


// HTTP 

/* 
 ** PRODUCT CRUD || HTTP REQ **

  METHOD : GET
    %URL%/products
    %URL%/product/:id
    %URL%/products/:name
    %URL%/products/category/:category
    %URL%/products/orderby/:order
    %URL%/products/limit/:limit
  
  METHOD : POST
    %URL%/product/post
  
  METHOD : DELETE
    %URL%/product/delete/:id
  
  METHOD : UPDATE
    %URL%/product/update/:id  
  
*/

/* 
 ** USER CRUD || HTTP REQ **

  METHOD : GET
    %URL%/users
    %URL%/user/:email
    %URL%/users/:name
    %URL%/users/auth/:auth
    %URL%/users/limit/:limit
  
  METHOD : POST
    %URL%/user/post
  
  METHOD : DELETE
    %URL%/user/delete/:email
  
  METHOD : UPDATE
    %URL%/user/update/:id  
  
*/

/* 
 ** CATEGORIES CRUD || HTTP REQ **

  METHOD : GET
    %URL%/categories
    %URL%/category/:name
  
  METHOD : POST
    %URL%/category/post
  
  METHOD : DELETE
    %URL%/category/delete/:id
  
  METHOD : UPDATE
    %URL%/category/update/:id  
  
*/

