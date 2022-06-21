
import React from 'react'

import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
} from "@chakra-ui/react"


export default function ProductForm (
    {
        product
    }
) {
    return (
        <>
           <Editable defaultValue='Take some chakra' isDisabled = {true}>
             <EditablePreview />
             <EditableInput />
           </Editable>
        </>
    )
}





