
// Custom Toaster
export function Toaster (toast , title , status = 'success' | 'error' | 'warning' , description = '') {
    return toast({
        title,
        description,
        status,
        position: 'top',
        duration: 9000,
        isClosable: true,
    })
}

