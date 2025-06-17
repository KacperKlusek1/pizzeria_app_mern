import React, { useState } from 'react';
import MenuRow from './MenuRow.jsx';
import AddPizzaRow from './AddPizzaRow.jsx';

const MenuTable = ({ pizzas, onUpdatePizza, onAddPizza, onDeletePizza }) => {
    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table className="data-table">
                    <thead className="table-header">
                    <tr>
                        <th className="table-cell-header">ID</th>
                        <th className="table-cell-header">Nazwa</th>
                        <th className="table-cell-header">Opis</th>
                        <th className="table-cell-header">Cena</th>
                        <th className="table-cell-header">Dostępność</th>
                        <th className="table-cell-header"></th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    {pizzas.map((pizza, i) => (
                        <MenuRow
                            key={pizza.id}
                            pizza={pizza}
                            index={i + 1}
                            onUpdatePizza={onUpdatePizza}
                            onDeletePizza={onDeletePizza}
                        />
                    ))}
                    <AddPizzaRow onAddPizza={onAddPizza} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuTable;