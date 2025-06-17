import React from 'react';
import LoadingSpinner from "../../LoadingSpinner.jsx";

const LawsuitsTable = ({ lawsuits, onMarkAsRead, loading }) => {
    if (loading) return <LoadingSpinner/>;

    return (
        <div className="admin-messages-table">
            <div className="admin-messages-table-container">
                <table className="admin-messages-table-element">
                    <thead className="admin-messages-table-head">
                    <tr>
                        <th className="admin-messages-table-header">Powód</th>
                        <th className="admin-messages-table-header">Numer sprawy</th>
                        <th className="admin-messages-table-header">Temat</th>
                        <th className="admin-messages-table-header">Treść pozwu</th>
                        <th className="admin-messages-table-header">Załączniki</th>
                        <th className="admin-messages-table-header">Data złożenia</th>
                    </tr>
                    </thead>
                    <tbody className="admin-messages-table-body">
                    {lawsuits.map((lawsuit) => (
                        <tr
                            key={lawsuit._id}
                            className={`admin-messages-table-row ${lawsuit.isRead ? 'read' : 'unread'}`}
                            onClick={() => onMarkAsRead(lawsuit._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td className="admin-messages-table-cell">{lawsuit.plaintiff}</td>
                            <td className="admin-messages-table-cell">{lawsuit.caseNumber}</td>
                            <td className="admin-messages-table-cell-wrap">{lawsuit.subject}</td>
                            <td className="admin-messages-table-cell-wrap">{lawsuit.message}</td>
                            <td className="admin-messages-table-cell-wrap">
                                {lawsuit.documents.map((doc, index) => (
                                    <div key={index}>
                                        <a
                                            href={`http://localhost:5000/api/${doc}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="admin-messages-link"
                                        >
                                            {doc.trim()}
                                        </a>
                                    </div>
                                ))}
                            </td>
                            <td className="admin-messages-table-cell">
                                {new Date(lawsuit.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LawsuitsTable;