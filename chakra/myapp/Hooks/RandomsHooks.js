import httpiepower from 'axios'

// @ makes http Req 
/// @ params: url , method = 'GET' | 'POST' | 'DELETE' | 'PUT' , data ?
// returns promise 🦄
export async function useHttpie ( 
   url , 
   method = 'GET' | 'POST' | 'DELETE' | 'PUT' ,
   data = {}
) {

    return httpiepower ({
        url ,
        method ,
        headers : {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        withCredentials : true ,
        data
    })

} 

