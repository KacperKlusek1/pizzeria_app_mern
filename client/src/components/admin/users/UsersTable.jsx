import React from 'react';
import UserRow from './UserRow';

const UsersTable = ({ users, onToggleStatus }) => {
    return (
        <div className="admin-users-table-container">
            <div className="admin-users-table-wrapper">
                <table className="admin-users-table">
                    <thead className="admin-users-table-head">
                    <tr>
                        <th className="admin-users-table-header">ID</th>
                        <th className="admin-users-table-header">Imię i nazwisko</th>
                        <th className="admin-users-table-header">Email</th>
                        <th className="admin-users-table-header">Status</th>
                        <th className="admin-users-table-header">Data rejestracji</th>
                        <th className="admin-users-table-header">Akcje</th>
                    </tr>
                    </thead>
                    <tbody className="admin-users-table-body">
                    {users.map((user, index) => (
                        <UserRow
                            key={user._id}
                            user={user}
                            index={index}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;