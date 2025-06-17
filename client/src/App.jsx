import React from "react"
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import {useAuthContext} from "./hooks/useAuthContext.js";

import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import Store from "./pages/Store.jsx";

import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminKitchen from "./pages/AdminKitchen.jsx";
import AdminMessages from "./pages/AdminMessages.jsx";
function App() {
    const { user } = useAuthContext()
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/menu" element={<Menu/>} />
                        <Route path="/store" element={<Store/>} />
                        <Route path="/orders" element={<Order/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={!user ? <Login/> : <Navigate to="/account"/> }/>
                        <Route path="/register" element={!user ? <Register/> : <Navigate to="/account"/> }/>
                        <Route path="/account" element={user ? <Account/> : <Navigate to="/login"/> }/>
                    </Route>
                    <Route element={<AdminLayout/>}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUsers/>} />
                        <Route path="/admin/kitchen" element={<AdminKitchen/>} />
                        <Route path="/admin/msg" element={<AdminMessages/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;