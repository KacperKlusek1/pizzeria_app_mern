import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthContext} from "../hooks/useAuthContext.js";

const Navbar = () => {
    const {user} = useAuthContext()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
            <div className="container">
                <Link className="navbar-brand text-uppercase fw-bold d-lg-none" to="/">PIZZERIA MISIA FRYDERYKA</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/">Strona Główna</Link></li>
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/about">O nas</Link></li>
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/menu">Menu</Link></li>
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/store">Godziny otwarcia</Link></li>
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/orders">Złóż zamówienie</Link></li>
                        <li className="nav-item px-lg-4"><Link className="nav-link text-uppercase" to="/contact">Kontakt</Link></li>
                        {user && (
                            <li className="nav-item px-lg-4">
                                <Link className="nav-link text-uppercase" to="/account">{user.username}</Link>
                            </li>
                        )}
                        {!user && (
                            <>
                                <li className="nav-item px-lg-4">
                                    <Link className="nav-link text-uppercase" to="/login">Zaloguj się</Link>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <Link className="nav-link text-uppercase" to="/register">Zarejestruj się</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
