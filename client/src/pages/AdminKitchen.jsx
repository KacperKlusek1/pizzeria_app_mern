import React from 'react';
import { ChefHat } from 'lucide-react';
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useOrders } from '../hooks/useOrders.js';
import { usePizzas } from '../hooks/usePizzas.js';
import { useActiveView } from '../hooks/useActiveView.js';
import TitleCard from '../components/admin/TitleCard.jsx';
import SubNavigation from '../components/admin/SubNavigation';
import AdminHeader from '../components/admin/AdminHeader.jsx';
import OrdersTable from '../components/admin/kitchen/OrdersTable.jsx';
import MenuTable from '../components/admin/kitchen/MenuTable.jsx';
import ErrorMessage from '../components/admin/kitchen/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import {Helmet} from "react-helmet-async";

const AdminKitchen = () => {
    const { user } = useAuthContext();
    const { activeView, setActiveView, isActive } = useActiveView('orders');
    const {
        orders,
        loading: ordersLoading,
        error: ordersError,
        changeOrderStatus
    } = useOrders();
    const {
        pizzas,
        loading: pizzasLoading,
        error: pizzasError,
        updatePizza,
        addPizza,
        deletePizza
    } = usePizzas();

    const views = [
        { key: 'orders', label: 'Zamówienia' },
        { key: 'menu', label: 'Oferta' }
    ];

    const currentError = isActive('orders') ? ordersError : pizzasError;
    const currentLoading = isActive('orders') ? ordersLoading : pizzasLoading;

    return (
        <>
            <Helmet>
                <title>Kuchnia - PANEL ADMINISTRATORSKI</title>
                <meta name="description"
                      content="ZARZĄDZANIE KUCHNIĄ."/>
            </Helmet>
        <div className="app-container">
            <TitleCard
                icon={ChefHat}
                title="Kuchnia"
            />

            <SubNavigation
                activeView={activeView}
                setActiveView={setActiveView}
                views={views}
            />

            <AdminHeader
                title={isActive('orders') ? 'KUCHNIA - Zamówienia' : 'KUCHNIA - Oferta'}
            />

            <main className="main-content">
                {currentError && <ErrorMessage message={currentError} />}

                {currentLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {isActive('orders') ? (
                            <OrdersTable
                                orders={orders}
                                onStatusChange={changeOrderStatus}
                            />
                        ) : (
                            <MenuTable
                                pizzas={pizzas}
                                onUpdatePizza={updatePizza}
                                onAddPizza={addPizza}
                                onDeletePizza={deletePizza}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
        </>
    );
};

export default AdminKitchen;