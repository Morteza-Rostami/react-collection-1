import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/types";
import { useSelectAuthUser } from "../store/authStore";

const AuthGuard = () => {
  const authUser: User = useSelectAuthUser() 

  console.log('auth:::  ', authUser)
  return authUser ? <Outlet/> : <Navigate to={'/login'} replace/>
}

export default AuthGuard