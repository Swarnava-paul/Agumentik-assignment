import React, { useState } from 'react'
import { useEffect } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'
import {io} from 'socket.io-client'
import { Grid,Image,Text } from '@chakra-ui/react'
const socket = io(import.meta.env.VITE_BACKEND_BASE_URL,{autoConnect:false});

const UserPage:React.FC = () => {
   

  const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken();
  const [news,setNews]= useState([])

  useEffect(()=>{

    retriveUserDetails()

    socket.connect();
     
    socket.on('connect', () => {
    console.log(socket.id)
   });

   
   socket.on('news',(data)=>{
      setNews((prev)=>[data,...prev])
   })

    return () => {
      socket.off('news');
      socket.disconnect();
    };
  },[]);

  return (
    <div>
       {
       ( isLoading == true ? (<h1>Loading</h1>): (
        <Grid templateColumns='repeat(1,40%)' placeContent='center' rowGap={40}>
          <Text mt='5%' textAlign='center'>Live News Feed</Text>
         {
          news.map((news,index)=>(
            <Grid key={index} border='1px solid grey' placeItems='center'>
              <Image src={news.thumbnailUrl} alt={news.title} />
              <Text>{'Title:   '}{news.title}</Text>
              <Text>{"Description:  "}{news.description}</Text> 
            </Grid>
          ))
         }
        </Grid>
       ))
      }
    </div>
  )
}

export default UserPage
