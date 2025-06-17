import React from 'react';
import useUsers from '../hooks/useAllUsers.js';
import AdminHeader from '../components/admin/AdminHeader';
import UserStats from '../components/admin/users/UserStats';
import UsersTable from '../components/admin/users/UsersTable';
import TitleCard from "../components/admin/TitleCard.jsx";
import {Users} from "lucide-react";
import {Helmet} from "react-helmet-async";

const AdminUsers = () => {
    const { users, loading, toggleUserStatus } = useUsers();

    if (loading) {
        return <p>Ładowanie użytkowników...</p>;
    }

    return (
        <>
            <Helmet>
                <title>Użytkownicy - PANEL ADMINISTRATORSKI</title>
                <meta name="description"
                      content="ZARZĄDZANIE UŻYTKOWNIKAMI."/>
            </Helmet>

        <div className="admin-users-container">
            <TitleCard
                icon={Users}
                title="Zarządzanie Użytkownikami"
            />
            <AdminHeader title={"ZARZĄDZANIE UŻYTKOWNIKAMI"} />

            <main className="admin-users-main">
                <div className="admin-users-main-content">
                    <UserStats users={users} />
                    <UsersTable users={users} onToggleStatus={toggleUserStatus} />
                </div>
            </main>
        </div>
        </>
    );
};

export default AdminUsers;