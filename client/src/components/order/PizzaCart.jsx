import React from 'react';

export default function PizzaCart({ pizzas, removePizza, totalPrice }) {
    return (
        <>
            <div className="form-group mt-4">
                <label>Dodane Pizze:</label>
                {pizzas.length === 0 ? (
                    <p>Brak dodanych pizz</p>
                ) : (
                    <ul className="list-unstyled">
                        {pizzas.map((pizza, index) => (
                            <li key={index} className="d-flex justify-content-between mb-2">
                                <span>{pizza.name} ({pizza.size}) - {pizza.price.toFixed(2)} zł</span>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removePizza(index)}
                                >
                                    Usuń
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="form-group mt-3">
                <strong>Łączna cena: {totalPrice.toFixed(2)} zł</strong>
            </div>
        </>
    );
}