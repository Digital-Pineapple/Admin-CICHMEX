import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Usuarios from '../Pages/Usuarios/Index'
import EditUser from '../Pages/Usuarios/Edit';

const UsersRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Usuarios />} />
            <Route path=":id" element={<EditUser />} />
        </Routes>
    )
}

export default UsersRoutes