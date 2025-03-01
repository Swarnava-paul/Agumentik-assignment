import React from 'react'
import { useEffect ,useState } from 'react'
import { useGetUserDetailsByToken } from '../customhooks/userDetails'
import { Button , Grid , Text} from '@chakra-ui/react'
import {io} from 'socket.io-client'

const socket = io(`${import.meta.env.VITE_BACKEND_BASE_URL}/admin`,{autoConnect:false});

const AdminPage:React.FC = () => {

    const [postView,setPostView] = useState<boolean>(false)
    const {userDetails,retriveUserDetails,isLoading} = useGetUserDetailsByToken()

    socket.on('connect',()=>{
      console.log('Admin connected to Global room',socket.id)
    })

    useEffect(()=>{
      retriveUserDetails();
      socket.connect();
      return ()=>{
        socket.disconnect();
      }
    },[])


  return (
    <div>
      {
       ( isLoading == true ? (<h1>Loading</h1>): (
         (postView == true ? (<CreatePost setPostView={setPostView} socket={socket}/>) : (
          <>
          <Text fontSize='xl' mt={2} textAlign='center'>Exclusive Admin Dashboard</Text>
          <Grid h='80vh' placeContent='center' display='grid' templateColumns={['repeat(1,90%)','repeat(1,80%)','repeat(1,50%)','repeat(1,50%)']}>
          
          <Button h='35vh' onClick={()=>setPostView(true)}>
            <Text fontSize='xl'>Create news Post</Text>
          </Button>
          <Button h='35vh'>
            <Text fontSize='xl'>View Created News</Text>
          </Button>
          </Grid>
          </>
         ))
       ))
      }
    </div>
  )
};


interface CreatePostProps {
  setPostView: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PostDetails {
  title:string,
  thumbnailUrl:string,
  description:string
}

const CreatePost:React.FC<CreatePostProps> = ({setPostView,socket}) => {

  const [postDetails,setPostDetails] = useState<PostDetails>();

  function handleChange(e:React.ChangeEvent<HTMLFormElement>){
    
       setPostDetails({
        ...postDetails,
        [e.target.name]:e.target.value
       });

  };

  return (
    <Grid placeContent='center' width="617px" p={4} margin='auto' mt={3}  border='1px solid grey'>
      <Text fontSize='xl'>Create Post</Text>
      <form action="" style={{display:"grid",rowGap:"50px",width:"600px"}}
      onChange={(e)=>handleChange(e)}>
      <input type="text" placeholder='Post Title' name='title' />
      <input type="text" placeholder='Post Image Thumbnail' name='thumbnailUrl'/>
      <textarea placeholder='Post Description' name='description'/>
      </form>
      <Button onClick={()=>{
         socket.emit('post-news',postDetails);
         //alert("post successful")
      }}>Post News</Button>
      <Button onClick={()=>setPostView(false)}>{'< Back'}</Button>
    </Grid>
  )
}

export default AdminPage;


