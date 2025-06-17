import React from 'react';
import { useReservations } from '../hooks/useReservations.js';
import { useLawsuits } from '../hooks/useLawsuits.js';
import { useActiveView } from '../hooks/useActiveView.js';
import TitleCard from '../components/admin/TitleCard.jsx';
import SubNavigation from '../components/admin/SubNavigation.jsx';
import AdminHeader from '../components/admin/AdminHeader.jsx';
import ReservationsTable from '../components/admin/messages/ReservationsTable.jsx';
import LawsuitsTable from '../components/admin/messages/LawsuitsTable.jsx';
import AdminFooter from '../components/admin/AdminFooter.jsx';
import { MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AdminMessages = () => {
    const { activeView, setActiveView, isActive } = useActiveView('reservations');

    const {
        reservations,
        loading: reservationsLoading,
        error: reservationsError,
        markReservationAsRead
    } = useReservations();

    const {
        lawsuits,
        loading: lawsuitsLoading,
        error: lawsuitsError,
        markLawsuitAsRead
    } = useLawsuits();

    const views = [
        { key: 'reservations', label: 'Rezerwacje' },
        { key: 'lawsuits', label: 'Pozwy' }
    ];

    const getPageTitle = () => {
        return isActive('reservations') ? 'WIADOMOŚCI - Rezerwacje' : 'WIADOMOŚCI - Pozwy';
    };

    const currentError = isActive('reservations') ? reservationsError : lawsuitsError;

    // Obsługa błędów
    if (currentError) {
        return (
            <div className="admin-messages-container">
                <div>Błąd: {currentError}</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Wiadomości - PANEL ADMINISTRATORSKI</title>
                <meta name="description"
                      content="SKRZYNKA ODBIORCZA."/>
            </Helmet>

            <div className="admin-messages-container">
                <TitleCard
                    icon={MessageSquare}
                    title="Wiadomości"
                />
                <SubNavigation
                    activeView={activeView}
                    setActiveView={setActiveView}
                    views={views}
                />
                <AdminHeader title={getPageTitle()} />

                <main className="admin-messages-main">
                    <div className="admin-messages-main-content">
                        {isActive('reservations') ? (
                            <ReservationsTable
                                reservations={reservations}
                                onMarkAsRead={markReservationAsRead}
                                loading={reservationsLoading}
                            />
                        ) : (
                            <LawsuitsTable
                                lawsuits={lawsuits}
                                onMarkAsRead={markLawsuitAsRead}
                                loading={lawsuitsLoading}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default AdminMessages;