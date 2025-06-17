import React from 'react';

const OrderHistory = ({ orders }) => {
    return (
        <div id="orderHistoryContainer">
            <h4>Historia zamówień</h4>
            {orders.length === 0 ? (
                <p>Brak zamówień.</p>
            ) : (
                <table className="table table-sm table-bordered">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produkty</th>
                        <th>Razem</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>
                                <ul className="mb-0">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} x {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.total.toFixed(2)} zł</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;