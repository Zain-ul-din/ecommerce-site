

/*
// User Table
model User {
  id Int @id @default(autoincrement()) 
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  
  name String @default("NULL")
  email String @unique
  isActive Boolean @default(false)
  isAdmin  Boolean @default(false)
  isStuff Boolean @default(false)
  auth  Auth @default(Google)

  // one to many
  reviews Review[]
}
*/

export const userData = [
    
    {
        name : "zain ul din" ,
        email : "zain.personal47@gmail.com",
        isAdmin : true ,
        auth : "Google" ,
        reviews : []
    }
    ,
    {
        name : "rana huzaifa" ,
        email : "ranagee512@gmail.com",
        auth : "Facebook" ,
        reviews : []
    }
    ,
    {
        name : "raveel nadeem" ,
        email : "raveel.lguCR@gmail.com",
        auth : "Twitter" ,
        reviews : []
    }
    
]

export const categoryData = [
    {
        name : "electronics" ,
        image : "URL" ,
        products : [] 
    } ,
    {
        name : "beauty products" ,
        image : "URL" ,
        products : [] 
    } ,
    {
        name : "vehicals" ,
        image : "URL" ,
        products : [] 
    } ,
]

/*
model Category {
  id Int @id @default(autoincrement())
  name String @unique 
  image String
  product_id Int
  
  // @ Relations
  // one to many
  products Product[] 
}
*/