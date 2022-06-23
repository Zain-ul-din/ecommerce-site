import { NextResponse } from 'next/server'
import getUserAuth from '../Helpers/Auth'
import { cookieName } from '../Helpers/constants'

const userPages = ['/user/profile' , '/user/orders']
const stuffPages = ['/product/upload' , 'category/upload']

export default function middleware (req) {
    
    // user pages redirects
    if (userPages.find ( p => p === req.nextUrl.pathname)) 
        if ( getUserAuth(req.cookies[cookieName]) === 'unkown' )
          return NextResponse.redirect( new URL(`/login`, req.url) )
    
    // stuff admin pages
    if (stuffPages.find (p => p === req.nextUrl.pathname))  {
        const authUser = getUserAuth (req.cookies[cookieName])
        console.log(authUser)
        if (authUser !== 'admin' && authUser !== 'stuff')
          return NextResponse.redirect( new URL(`/login`, req.url) )
    }
    
}


// looking ok