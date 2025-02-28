import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetUserDetailsByToken = () => {

    type userDetailsType = {
        name :string,
        email?:string,
        role:string
    };

    const [userDetails,setUserDetails] = useState<userDetailsType | null>(null);
    const [isLoading,setIsloading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function retriveUserDetails() {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/login');
            return;
        }

        setIsloading(true);
        try {
           const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/v1/userDetails?token=${token}`);
           const data = await response.json();
           const {role,name} = data;
           setUserDetails({name,role})
           if(role === 'User') {
            navigate('/')
           }else {
            navigate('/admin')
           }
        }catch(error) {
          navigate('/login');
          localStorage.removeItem('token');
        }finally{
            setIsloading(false);
        }
    };
   
    return {userDetails,retriveUserDetails,isLoading};
};
//http://localhost:3000