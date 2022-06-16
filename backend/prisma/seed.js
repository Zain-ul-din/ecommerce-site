import { userData } from './Models/Models.js'
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
            auth : user.auth ,

            reviews : {
                create : user.reviews.map (review=>({
                    rating : review.rating ,
                    comment : review.comment ,
                    user_id : review.user_id ,
                    product_id : review.product_id
                }))
            }

           }
         })
       })
    )   
}

uploadUsersData()
.catch(err => {
    console.log(err)
    process.exit(1) // status code 1 
})
.finally( async ()=>{
    prisma.$disconnect()
})

console.log('executed !!')