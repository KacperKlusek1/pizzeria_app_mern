import React from 'react';
import { Check, X, Trash } from 'lucide-react';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog.js';

const MenuRow = ({ pizza, index, onUpdatePizza, onDeletePizza }) => {
    const { confirm, showSuccess, showError } = useConfirmDialog();

    const handleDelete = async () => {
        const confirmed = await confirm({
            title: 'Czy na pewno chcesz usunąć tę pizzę?',
            text: 'Ta operacja jest nieodwracalna!',
            confirmText: 'Tak, usuń!',
            cancelText: 'Anuluj',
            onConfirm: async () => {
                const success = await onDeletePizza(pizza.id);
                if (success) {
                    showSuccess('Usunięto!', 'Pizza została usunięta.');
                } else {
                    showError('Błąd!', 'Nie udało się usunąć pizzy.');
                }
            }
        });
    };

    return (
        <tr className="table-row">
            <td className="table-cell">{index}</td>
            <td className="table-cell">{pizza.name}</td>
            <td className="table-cell">{pizza.description}</td>
            <td className="table-cell">
                <input
                    type="number"
                    value={pizza.price}
                    onChange={(e) => onUpdatePizza(pizza.id, 'price', e.target.value)}
                    className="input-price"
                    step="0.01"
                />
            </td>
            <td className="table-cell">
                <span className="status-icon">
                    {pizza.available ? (
                        <Check color="green" strokeWidth={3} style={{width: '18px', height: '18px'}}/>
                    ) : (
                        <X color="red" strokeWidth={3} style={{width: '18px', height: '18px'}}/>
                    )}
                </span>
                <select
                    value={pizza.available ? 1 : 0}
                    onChange={(e) => onUpdatePizza(pizza.id, 'available', Boolean(parseInt(e.target.value)))}
                    className="select-field"
                >
                    <option value={1}>Dostępna</option>
                    <option value={0}>Niedostępna</option>
                </select>
            </td>
            <td className="table-cell action-cell">
                <button
                    onClick={handleDelete}
                    className="btn btn-icon delete-btn btn-danger"
                    title="Usuń pizzę"
                >
                    <Trash style={{width: '18px', height: '18px'}}/>
                </button>
            </td>
        </tr>
    );
};

export default MenuRow;