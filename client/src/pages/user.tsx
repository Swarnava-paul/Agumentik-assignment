import React from 'react'
import { useEffect } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'

const UserPage:React.FC = () => {

  const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken();
  console.log(userDetails,'frmo user page')

  useEffect(()=>{
    retriveUserDetails();
  },[]);

  return (
    <div>
       {
       ( isLoading == true ? (<h1>Loading</h1>): ('user Page'))
      }
    </div>
  )
}

export default UserPage
