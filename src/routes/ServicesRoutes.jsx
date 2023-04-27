
import { Routes, Route } from 'react-router-dom'
import Servicios from '../Pages/Services/Index'
import EditService from '../Pages/Services/Edit';

const ServicesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Servicios />} />
            <Route path=":id" element={<EditService />} />
        </Routes>
    )
}

export default ServicesRoutes