import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

function PrivateRoutes({}: Props) {
  let auth = {'token': localStorage.getItem("jsonwebtoken")}
  return (
    auth.token ? <Outlet/> : <Navigate to={"/login"}/>
  )
}

export default PrivateRoutes