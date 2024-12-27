import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({children, redirectTo="/login", logged}) => {

  if( !logged )
{
  return (
    <Navigate to={redirectTo} />
  );
}
return children ? children : <Outlet/>
};
