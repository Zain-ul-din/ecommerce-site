
import { Prisma } from "@prisma/client";

export const RESPONSE = {
    status : 200 ,
    message : 'success' ,
    data : undefined
}

export const BAD_REQ_RESPONSE = {
    status : 402 ,
    error : 'bad request' ,
    data : null
}

export function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export function PRISMA_ERROR_RESPONSE (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) 
        return `fail with error code ${err.code} learn more about it site : https://www.prisma.io/docs/reference/api-reference/error-reference`
    return `fail with unkown error`    
}
