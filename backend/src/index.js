import express from "express";
import cors from "cors";
import bp from "body-parser";
import { parserErrorHandler } from "./middlewares/customMiddleWare.js";
const { json, urlencoded } = bp;

const app = express();

// socket.io

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";
import { fileUploaderRouter } from "./routes/fileUploaderRoutes.js";
import { superCategoryRouter } from "./routes/superCategoryRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

app
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(json())
  .use(urlencoded({ extended: true }))
  //.use(express.static(__dirname))
  .use(parserErrorHandler) // error hanlder
  .use("/user/", userRouter)
  .use("/product/", productRouter)
  .use("/category/", superCategoryRouter)
  .use("/subcategory/", categoryRouter)
  .use("/review/", reviewRouter)
  .use("/static/", fileUploaderRouter)
  .use("/order/", orderRouter);

// socket.io connection
io.on("connection", (socket) => {
  socket.on("onProductChange", (message) => {
    io.emit("onProductChange", message);
  });
  socket.on("onUserChange", (email) => {
    io.emit("onUserChange", email);
  });
});

const PORT = 8000;

// Listen to server
server.listen(PORT, () => {
  console.log("Welcome to ecommerce apis");
  console.log(`server is running on port http://localhost:${PORT}/`);
});

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
