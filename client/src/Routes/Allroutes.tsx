import { Route , Routes } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

const UserPage = React.lazy(()=> import ('../pages/user'))
const AdminPage = React.lazy(()=> import('../pages/admin'));
const LoginPage = React.lazy(()=> import('../pages/login'));


const AllRoutes:React.FC = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Routes>
                <Route path='home'>
                   <Route index element={<UserPage/>}/>
                   <Route path='admin' element={<AdminPage/>}/>
                   <Route path='login' element={<LoginPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
};

export default AllRoutes;
