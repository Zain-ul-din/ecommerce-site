import { 
    Table  ,
     TableContainer ,
     Thead ,
     Th ,
     Td ,
     Tbody,
     Tr ,
     Grid ,
     Button,
     Avatar
} from "@chakra-ui/react"

import { useEffect, useState } from "react"

import Link from "next/link"

export default function UserDashBoard (props) { 

  const [createdAt , setCreatedAt] = useState ('')
  const [updatedAt , setUpdatedAt] = useState ('')
  
  return (
        <>
        <Grid  gridAutoFlow={'column'} 
         mt = {2}
         gap = {1}
         p = {2}
         overflowX = {'auto'}
         overscrollBehaviorX = {'contain'}
         className = {'boardslist'}
         >
  <TableContainer>
   <Table size='md' variant={'striped'}>
    <Thead>
      <Tr>
        <Th>Profile Pic</Th>
        <Th>Email</Th>
        <Th>Name</Th>
        <Th>auth</Th>
        <Th>IsActive</Th>
        <Th>isAdmin</Th>
        <Th>isStuff</Th>
        <Th>CreatedAt</Th>
        <Th>UpdatedAt</Th>
        <Th>Edit</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.users && props.users.map ((user , idx)=>{
        
        useEffect (()=>{
             setCreatedAt (new Date (user.createdAt).toLocaleDateString())
             setUpdatedAt (new Date(user.updatedAt).toLocaleDateString())
        } , [])

        return (
          <Tr key = {idx}>
              <Td><Avatar name = {user.name} src = {user.avatar} /></Td>
              <Td>{user.email}</Td>
              <Td>{user.name}</Td>
              <Td>{user.auth}</Td>
              <Td>{user.isActive ? 'true' : 'false'}</Td>
              <Td>{user.isAdmin ? 'true' : 'false'}</Td>
              <Td>{user.isStuff ? 'true' : 'false'}</Td>
              <Td>{createdAt}</Td>
              <Td>{updatedAt}</Td>
              <Td> <Link href = {`/user/update/${user.id}/`}>
                <Button colorScheme={'whatsapp'}>Edit</Button>  
              </Link></Td>
              <Td><Button colorScheme={'red'}>Delete</Button></Td>
          </Tr>
        )
      })}
    </Tbody>
  </Table>
</TableContainer>
</Grid>
    </>
    )
}

