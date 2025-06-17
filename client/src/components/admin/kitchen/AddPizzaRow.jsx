import React, { useState } from 'react';
import { Check, X, Plus } from 'lucide-react';

const AddPizzaRow = ({ onAddPizza }) => {
    const [newPizza, setNewPizza] = useState({
        name: '',
        description: '',
        price: '',
        available: 1
    });

    const handleAddPizza = async () => {
        if (newPizza.name && newPizza.description && newPizza.price) {
            const success = await onAddPizza(newPizza);
            if (success) {
                setNewPizza({ name: '', description: '', price: '', available: 1 });
            }
        } else {
            alert('Wypełnij wszystkie pola nowej pizzy');
        }
    };

    return (
        <tr className="add-row">
            <td className="table-cell add-label">DODAJ NOWĄ</td>
            <td className="table-cell">
                <input
                    type="text"
                    placeholder="Nazwa pizzy"
                    value={newPizza.name}
                    onChange={(e) => setNewPizza({...newPizza, name: e.target.value})}
                    className="input-field"
                />
            </td>
            <td className="table-cell">
                <input
                    type="text"
                    placeholder="Opis"
                    value={newPizza.description}
                    onChange={(e) => setNewPizza({...newPizza, description: e.target.value})}
                    className="input-field"
                />
            </td>
            <td className="table-cell">
                <input
                    type="number"
                    placeholder="Cena"
                    value={newPizza.price}
                    onChange={(e) => setNewPizza({...newPizza, price: e.target.value})}
                    className="input-price"
                    step="0.01"
                />
            </td>
            <td className="table-cell">
                <span className="status-icon">
                    {newPizza.available ? (
                        <Check color="green" strokeWidth={3} style={{width: '18px', height: '18px'}}/>
                    ) : (
                        <X color="red" strokeWidth={3} style={{width: '18px', height: '18px'}}/>
                    )}
                </span>
                <select
                    value={newPizza.available}
                    onChange={(e) => setNewPizza({...newPizza, available: parseInt(e.target.value)})}
                    className="select-field"
                >
                    <option value={1}>Dostępna</option>
                    <option value={0}>Niedostępna</option>
                </select>
            </td>
            <td className="table-cell">
                <button
                    onClick={handleAddPizza}
                    className="btn btn-success"
                >
                    <Plus style={{width: '18px', height: '18px'}}/>
                </button>
            </td>
        </tr>
    );
};

export default AddPizzaRow;