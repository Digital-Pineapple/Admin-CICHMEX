import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = ({children, redirectTo="/principal", isAllowed}) => {
  if( isAllowed )
{
  return (
    <Navigate to={redirectTo} />
  );
}
return children ? children : <Outlet/>
};