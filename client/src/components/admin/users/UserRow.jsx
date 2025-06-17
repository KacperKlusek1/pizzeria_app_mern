import React from 'react';
import { Ban, Check } from 'lucide-react';

const UserRow = ({ user, index, onToggleStatus }) => {
    const getStatusBadge = (status) => {
        if (status === 1) return 'admin-users-status-active';
        if (status === 0) return 'admin-users-status-blocked';
        return 'admin-users-status-admin';
    };

    const getStatusText = (status) => {
        if (status === 1) return 'Aktywny';
        if (status === 0) return 'Zablokowany';
        return 'Administrator';
    };

    return (
        <tr className="admin-users-table-row">
            <td className="admin-users-table-cell">{index + 1}</td>
            <td className="admin-users-table-cell">{user.fullname}</td>
            <td className="admin-users-table-cell">{user.email}</td>
            <td className="admin-users-table-cell">
                <span className={`admin-users-status-badge ${getStatusBadge(user.status)}`}>
                    {getStatusText(user.status)}
                </span>
            </td>
            <td className="admin-users-table-cell">
                {new Date(user.date).toLocaleDateString()}
            </td>
            <td className="admin-users-action-cell">
                {user.status !== 2 && (
                    <button
                        onClick={() => onToggleStatus(user._id, user.status)}
                        className={`admin-users-action-button ${
                            user.status === 1
                                ? 'admin-users-block-button'
                                : 'admin-users-activate-button'
                        }`}
                        title={user.status === 1 ? 'Zablokuj użytkownika' : 'Aktywuj użytkownika'}
                    >
                        {user.status === 1
                            ? <Ban className="admin-users-button-icon" />
                            : <Check className="admin-users-button-icon" />
                        }
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserRow;