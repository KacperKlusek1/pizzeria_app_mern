import React from 'react';

const OrderRow = ({ order, index, onStatusChange }) => {
    const statusLabels = {
        waiting: 'Oczekuje na realizację',
        prepared: 'W trakcie realizacji',
        ready: 'Zrealizowane',
    };

    const statusClasses = {
        waiting: 'status-progress',
        prepared: 'status-pending',
        ready: 'status-completed',
    };

    return (
        <tr className="table-row">
            <td className="table-cell">{index}</td>
            <td className="table-cell">{order.fullName}</td>
            <td className="table-cell">{order.contactInfo}</td>
            <td className="table-cell">{order.address}</td>
            <td className="table-cell">
                {order.pizzas.map((p, idx) => (
                    <div key={idx}>{`${p.name} (${p.size}) - ${p.price} zł`}</div>
                ))}
            </td>
            <td className="table-cell">{new Date(order.date).toLocaleString()}</td>
            <td className="table-cell">
                <span className={`status-badge ${statusClasses[order.status]}`}>
                    {statusLabels[order.status] || 'Nieznany'}
                </span>
            </td>
            <td className="table-cell">
                {order.status !== 'ready' && (
                    <button
                        onClick={() => onStatusChange(order._id, order.status)}
                        className="btn btn-primary"
                    >
                        Następny etap
                    </button>
                )}
            </td>
        </tr>
    );
};

export default OrderRow;