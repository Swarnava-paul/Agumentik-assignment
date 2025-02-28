import React from 'react'
import { useEffect } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'
import { Button , Grid , Text} from '@chakra-ui/react'

const AdminPage:React.FC = () => {
    const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken();

    useEffect(()=>{
      retriveUserDetails();
    },[])


  return (
    <div>
      {
       ( isLoading == true ? (<h1>Loading</h1>): (
        <>
        <Text fontSize='xl' mt={2} textAlign='center'>Exclusive Admin Dashboard</Text>
        <Grid h='80vh' placeContent='center' display='grid' templateColumns={['repeat(1,90%)','repeat(1,80%)','repeat(1,50%)','repeat(1,50%)']}>
        
        <Button h='35vh'>
          <Text fontSize='xl'>Create news Post</Text>
        </Button>
        <Button h='35vh'>
          <Text fontSize='xl'>View Created News</Text>
        </Button>
        </Grid>
        </>
       ))
      }
    </div>
  )
}

export default AdminPage;
