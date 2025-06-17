import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Users, MessageSquare, LogOut, Menu, X, Home } from 'lucide-react'; // Dodaj ikonę Home
import {useLogout} from "../../hooks/useLogout.js";

const Navbar = () => {
    const logout = useLogout();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-main">
                    <div className="navbar-brand">
                        {/* Logo/Brand */}
                        <div>
                            <Link to="/admin" className="navbar-title">
                                Pizzeria Fryderyka
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="navbar-desktop-menu">
                            <div className="navbar-desktop-items">
                                <Link to="/account" className="navbar-link">
                                    <Home className="navbar-link-icon" />
                                    Powrót do pizzerii
                                </Link>

                                <Link to="/admin/kitchen" className="navbar-link">
                                    <ChefHat className="navbar-link-icon" />
                                    Kuchnia
                                </Link>
                                <Link to="/admin/users" className="navbar-link">
                                    <Users className="navbar-link-icon" />
                                    Użytkownicy
                                </Link>
                                <Link to="/admin/msg" className="navbar-link">
                                    <MessageSquare className="navbar-link-icon" />
                                    Wiadomości
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Logout button - Desktop */}
                    <div className="navbar-desktop-logout">
                        <button onClick={logout} className="navbar-logout-btn">
                            <LogOut className="navbar-link-icon" />
                            Wyloguj się
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="navbar-mobile-toggle">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="navbar-mobile-btn"
                        >
                            {mobileMenuOpen ?
                                <X className="navbar-mobile-icon" /> :
                                <Menu className="navbar-mobile-icon" />
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="navbar-mobile-menu">
                    <Link
                        to="/"
                        onClick={handleMobileMenuClose}
                        className="navbar-mobile-link"
                    >
                        <Home className="navbar-link-icon" />
                        Powrót do pizzerii
                    </Link>

                    <Link
                        to="/admin/kitchen"
                        onClick={handleMobileMenuClose}
                        className="navbar-mobile-link"
                    >
                        <ChefHat className="navbar-link-icon" />
                        Kuchnia
                    </Link>
                    <Link
                        to="/admin/users"
                        onClick={handleMobileMenuClose}
                        className="navbar-mobile-link"
                    >
                        <Users className="navbar-link-icon" />
                        Użytkownicy
                    </Link>
                    <Link
                        to="/admin/msg"
                        onClick={handleMobileMenuClose}
                        className="navbar-mobile-link"
                    >
                        <MessageSquare className="navbar-link-icon" />
                        Wiadomości
                    </Link>
                    <hr className="navbar-mobile-divider" />
                    <button onClick={handleLogout} className="navbar-mobile-logout">
                        <LogOut className="navbar-link-icon" />
                        Wyloguj się
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
