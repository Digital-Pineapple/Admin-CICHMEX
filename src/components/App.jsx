import { useEffect } from 'react';

import { Routes,Route } from 'react-router-dom';
import PublicRoutes from '../routes/PublicRoutes';
import PrivateRoutes from '../routes/PrivateRoutes';
import Root from '../Pages/Root';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import LoadingScreen from './ui/LoadingScreen';

import Usuarios from '../Pages/Usuarios/Index'
import Layout from './ui/Layout';

const App = () => {

    const { revalidateToken } = useAuth();
    const { loading } = useSelector(state => state.ui)

    useEffect(() => {
        setTimeout(async () => {
            await revalidateToken();
        },800)
    },[]);

    return (
        <>
            {
                loading ? <LoadingScreen /> : (
                    <Routes>
                        <Route path="/" element={
                            <PublicRoutes>
                                <Root />
                            </PublicRoutes>
                        } />
                            <Route
                                path="/*"
                                element={
                                <PrivateRoutes>
                                    <Routes>
                                        <Route path="/usuarios" element={<Usuarios />} />
                                        <Route path="/p" element={<h1>das</h1>} />
                                    </Routes>
                                </PrivateRoutes>}
                            />

                        
                    </Routes>
                )
            }
        </>
    )
}

export default App