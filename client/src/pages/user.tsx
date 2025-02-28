import React, { useState } from 'react'
import { useEffect } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000',{autoConnect:false});

const UserPage:React.FC = () => {
   
  type NewsProps = {
    title:string,
    thumbnailUrl:string,
    description:string,
    likes? : number,
    comments? : number
  }
  const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken();
  const [news,setNews]= useState<NewsProps>()


  useEffect(()=>{

    retriveUserDetails()

    socket.connect();
     
    socket.on('connect', () => {
    console.log(socket.id)
   });

   
   socket.on('news',(data)=>{
    console.log('new news' ,data);
   })

    return () => {
      socket.off('news');
      socket.disconnect();
    };
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
