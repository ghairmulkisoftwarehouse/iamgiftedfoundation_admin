import { Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";



// LAYOUTS

import MainLayout  from   '../layouts/main'
import BlankLayout  from '../layouts/blank'
// auth
import Login from "../pages/auth/Login.jsx";

// APP
import Dashboard from "../pages/app/dashboard/index.jsx";
import AppUser  from '../pages/app/app-user'
import  Events  from '../pages/app/events';
import  CreateEvents    from '../pages/app/events/create-events'
import EventsDetail   from '../pages/app/events/events-detail'
import Donations  from '../pages/app/donations'
import Community   from '../pages/app/community';
import  Teams  from '../pages/app/teams';
import  Programs   from '../pages/app/programs';
import ProgramDetail   from '../pages/app/programs/program-detail'
import CreatePrograms  from '../pages/app/programs/create-programs'
import PerFundraising  from '../pages/app/per-fundraising'
import  FundraisnigDetail  from '../pages/app/per-fundraising/fundraisnigdetail'
import CreateFundraising   from '../pages/app/per-fundraising/create-fundraising'
import CreateImpact   from '../pages/app/per-fundraising/create-Impact'
import  Createteam  from  '../pages/app/teams/create-team';
import PanelUser   from '../pages/app/panel-user';
import CreateNewUser   from '../pages/app/panel-user/create-new-user';



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
            { path : '/auth/login' , exact : true , element : <PublicRoute element={<Login />} /> } ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }
        ]
    } ,
  {
  path: '/app',
  element: <MainLayout />,
  children: [
    { path: 'dashboard', element: <ProtectedRoute element={<Dashboard />} /> },

    { path: 'app-user', element: <ProtectedRoute element={<AppUser />} /> },

    { path: 'events', element: <ProtectedRoute element={<Events />} /> },
    { path: 'events/:id', element: <ProtectedRoute element={<EventsDetail />} /> },
    { path: 'create-events', element: <ProtectedRoute element={<CreateEvents />} /> },

    { path: 'donations', element: <ProtectedRoute element={<Donations />} /> },
    { path: 'community', element: <ProtectedRoute element={<Community />} /> },

    { path: 'teams', element: <ProtectedRoute element={<Teams />} /> },

    { path: 'Programs', element: <ProtectedRoute element={<Programs />} /> },
    { path: 'Programs/:id', element: <ProtectedRoute element={<ProgramDetail />} /> },
    { path: 'create-programs', element: <ProtectedRoute element={<CreatePrograms />} /> },

    {
      path: 'peer-to-peer-fundraising',
      element: <ProtectedRoute element={<PerFundraising />} />,
    },
    {
      path: 'peer-to-peer-fundraising/:id',
      element: <ProtectedRoute element={<FundraisnigDetail />} />,
    },
    {
      path: 'create-fundraising',
      element: <ProtectedRoute element={<CreateFundraising />} />,
    },

    {
      path: 'create-Impact/:id',
      element: <ProtectedRoute element={<CreateImpact />} />,
    },
    {
      path: 'create-team/:id',
      element: <ProtectedRoute element={<Createteam />} />,
    },

    {
      path: 'panel-user',
      element: <ProtectedRoute element={<PanelUser />} />,
    },
    {
      path: 'create-new-user',
      element: <ProtectedRoute element={<CreateNewUser />} />,
    },

    { path: '*', element: <Navigate to="/page-not-found" /> },
  ],
}
,
    {
        path : '/page-not-found' ,
        element : <BlankLayout /> ,
        children : [
            { path : '/page-not-found' , element : <NotFound /> }
        ]
    }

]

export default Router;