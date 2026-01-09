import { lazy } from "react";
import Loadable from "../components/global/Loadable";
import { Navigate } from "react-router-dom";
// import PublicRoute from "./PublicRoute";
// import ProtectedRoute from "./ProtectedRoute";



// LAYOUTS

import MainLayout  from   '../layouts/main'
import BlankLayout  from '../layouts/blank'
// auth
import Login from "../pages/auth/Login.jsx";

// APP
import Dashboard from "../pages/app/dashboard/index.jsx";
import AppUser  from '../pages/app/app-user'
import Donations  from '../pages/app/donations'
import Community   from '../pages/app/community';
import  Teams  from '../pages/app/teams';
import  Programs   from '../pages/app/programs';
import PerFundraising  from '../pages/app/per-fundraising'
import  FundraisnigDetail  from '../pages/app/per-fundraising/fundraisnigdetail'
import CreateFundraising   from '../pages/app/per-fundraising/create-fundraising'
import CreateImpact   from '../pages/app/per-fundraising/create-Impact'



// 404
import NotFound from '../pages/404'


const Router = [
    {
        path : '/' ,
        element : <BlankLayout  /> ,       
        children : [
            { path : '/' , exact : true , element : <Login />} ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }
        ]
    } ,
    {
        path : '/auth' ,
        element : <BlankLayout  /> ,       
        children : [
            { path : '/auth/login' , exact : true , element : <Login /> } ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }
        ]
    } ,
    {
        path : '/app' ,
        element : <MainLayout /> ,
        children : [
            { path : '/app/dashboard' , exact : true , element : <Dashboard /> } ,
          { path : '/app/app-user' , exact : true , element : <AppUser /> } ,
           { path : '/app/donations' , exact : true , element : <Donations /> } ,
          { path : '/app/community' , exact : true , element : <Community /> } ,
               { path : '/app/teams' , exact : true , element : <Teams /> } ,
        { path : '/app/Programs' , exact : true , element : <Programs /> } ,
            { path : '/app/peer-to-peer-fundraising' , exact : true , element : <PerFundraising /> } ,
              { path : '/app/peer-to-peer-fundraising/:id' , exact : true , element : <FundraisnigDetail /> } ,
            { path : '/app/create-fundraising' , exact : true , element : <CreateFundraising /> } ,
               { path : '/app/create-Impact/:id' , exact : true , element : <CreateImpact /> } ,
            
              
            

        

               
          
            
          
            { path : '*' , element : <Navigate to='/page-not-found' /> }

        ]
    } ,
    {
        path : '/page-not-found' ,
        element : <BlankLayout /> ,
        children : [
            { path : '/page-not-found' , element : <NotFound /> }
        ]
    }

]

export default Router;