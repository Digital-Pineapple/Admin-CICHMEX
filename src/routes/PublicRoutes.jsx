import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = ({children, redirectTo="/principal", logged}) => {
  if( logged )
{
  return (
    <Navigate to={redirectTo} />
  );
}
return children ? children : <Outlet/>
};