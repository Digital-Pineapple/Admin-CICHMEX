import { useEffect, memo } from 'react';

import { Routes, Route } from 'react-router-dom';
import PublicRoutes from '../routes/PublicRoutes';
import PrivateRoutes from '../routes/PrivateRoutes';
import LoadingScreen from './ui/LoadingScreen';
import Root from '../Pages/Root';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

import UsersRoutes from '../routes/UsersRoutes';
import ServicesRoutes from '../routes/ServicesRoutes';
import { useState } from 'react';

const App = () => {

    const { revalidateToken } = useAuth();
    const { loading } = useSelector(state => state.ui);

    useEffect(() => {
        setTimeout(async () => {
            await revalidateToken();
        }, 500);
    }, []);


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
                                        <Route path="/usuarios/*" element={<UsersRoutes />} />
                                        <Route path="/servicios/*" element={<ServicesRoutes />} />
                                        <Route path="/p" element={<h1>das</h1>} />
                                        <Route path="/*" element={<h1>esta no existe master xD</h1>} />
                                    </Routes>
                                </PrivateRoutes>}
                        />

                    </Routes>
                )
            }
        </>
    )
}

export default memo(App);