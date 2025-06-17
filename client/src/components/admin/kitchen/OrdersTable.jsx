import React from 'react';
import OrderRow from './OrderRow.jsx';

const OrdersTable = ({ orders, onStatusChange }) => {
    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table className="data-table">
                    <thead className="table-header">
                    <tr>
                        <th className="table-cell-header">ID</th>
                        <th className="table-cell-header">Imię i nazwisko</th>
                        <th className="table-cell-header">Kontakt</th>
                        <th className="table-cell-header">Adres</th>
                        <th className="table-cell-header">Pizze</th>
                        <th className="table-cell-header">Data zamówienia</th>
                        <th className="table-cell-header">Status</th>
                        <th className="table-cell-header"></th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    {orders.map((order, i) => (
                        <OrderRow
                            key={order._id}
                            order={order}
                            index={i + 1}
                            onStatusChange={onStatusChange}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;