import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import Layout from "../components/ui/Layout";

const PrivateRoutes = ({ children }) => {

    const { logged } = useSelector(state => state.auth);

    return logged ? <Layout>{ children }</Layout> : (<Navigate to="/" replace />)

}

export default PrivateRoutes