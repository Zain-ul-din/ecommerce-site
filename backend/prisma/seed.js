import { userData , categoryData , productData , reviewData} from './Models/Models.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function uploadUsersData () {
    await Promise.all(
       userData.map (async (user)=>{
         return prisma.user.upsert({
           where : {email : user.email} ,
           update : {} ,
           create : {
            name : user.name ,
            email : user.email ,
            isAdmin : user.isAdmin ,
            createdAt : new Date().toString() ,
            updatedAt : new Date().toString(),
            auth : user.auth ,            
           }
         })
       })
    )   
}

async function UploadCategoryData () {
    await Promise.all (
        categoryData.map(async (category) => {
            return prisma.category.upsert ({
                where : {name : category.name} ,
                update : {} ,
                create : {
                    name : category.name ,
                    image : category.image ,
                    products : {create : [] }
                }
            })
        })
    )
}

async function UploadProductData () {
    await Promise.all (
        productData.map(async (product) => {
            return prisma.product.upsert ({
                where : {id : product.id} ,
                update : {} ,
                create : {
                    createdAt : new Date().toString(),
                    updatedAt : new Date().toString(),
                    name : product.name ,
                    price : parseFloat(product.price) ,
                    description : product.description === undefined ? "no description added" : product.description ,
                    image : product.image ,
                    brand : product.brand === undefined ? "unkown" : product.brand ,
                    rating : product.rating === undefined ? 0 : parseFloat(product.rating),
                    countInStock : parseInt(product.countInStock ),
                    category_id : parseInt(product.category_id ),
                }
            })
        })
    )
}

async function UploadReviews () {
    await Promise.all(
      reviewData.map ((review)=>{
        return prisma.review.upsert({
            where : {id : review.id},
            update : {},
            create : {
                createdAt :  new Date().toString(),
                updatedAt : new Date().toString(),
                rating : parseFloat(review.rating) ,
                comment : review.comment ,
                product_id : parseInt(review.product_id) ,
                user_id : parseInt (review.user_id) ,
            }
        })
      })
    )
}


async function deleteUser () {
    await prisma.user.delete ({where : {id : 3}})
}

await deleteUser()
.catch (err => {
    console.log(err)
    process.exit(1)
}).finally(()=> prisma.$disconnect())

await UploadCategoryData()
.catch (err => {
    console.log(err)
    process.exit(1)
})

await UploadProductData()
.catch (err => {
    console.log(err)
    process.exit(1)
})

uploadUsersData()
.catch(err => {
    console.log(err)
    process.exit(1) // status code 1 
})

UploadReviews()
.catch(err =>{
    console.log (err)
    process.exit (1)
})
.finally (()=> prisma.$disconnect())

console.log('executed !!')
