import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/types";
import { useSelectAuthUser } from "../store/authStore";

const GuestGuard = () => {
  const authUser: User = useSelectAuthUser() 

  return !authUser ? <Outlet/> : <Navigate to={'/'} replace/>
}

export default GuestGuard