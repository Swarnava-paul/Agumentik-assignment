import React from 'react'
import { useEffect } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'

const AdminPage:React.FC = () => {
    const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken();

    useEffect(()=>{
      retriveUserDetails();
    },[])


  return (
    <div>
      {
       ( isLoading == true ? (<h1>Loading</h1>): ('Admin Page'))
      }
    </div>
  )
}

export default AdminPage;
