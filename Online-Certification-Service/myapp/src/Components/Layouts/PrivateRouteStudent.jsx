import React from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom'
import ProjectAuth from '../../firebase';
const PrivateRouteStudent = () => {
    const location = useLocation();
  return ProjectAuth.currentUser ?
   (<Outlet />) : (<Navigate to='/' state={{from:location}} replace />)
} 

export default PrivateRouteStudent; 
