import React from 'react';

export default function PizzaSelector({
                                          products,
                                          selectedPizza,
                                          handlePizzaSelect,
                                          handleSizeSelect,
                                          addPizza,
                                          errors
                                      }) {
    return (
        <>
            <div className="form-group mb-4">
                <label>Wybierz Pizzę:</label>
                <select
                    className="form-control"
                    value={selectedPizza.name}
                    onChange={(e) => handlePizzaSelect(products, e.target.value)}
                >
                    <option value="" disabled>Wybierz pizzę</option>
                    {products.filter(p => p.available).map((product) => (
                        <option key={product._id} value={product.name}>
                            {product.name} - {product.description} - {product.price} zł
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-4">
                <label className="d-block mb-2">Rozmiar:</label>
                <div className="btn-group" role="group" aria-label="Wybór rozmiaru pizzy">
                    {['Mała', 'Familijna', 'Imprezowa'].map((size) => {
                        let multiplier = size === 'Familijna' ? 1.5 : size === 'Imprezowa' ? 1.9 : 1;
                        const basePizza = products.find((p) => p.name === selectedPizza.name);
                        const basePrice = basePizza ? basePizza.price : 0;
                        const calculatedPrice = (basePrice * multiplier).toFixed(2);

                        const isSelected = selectedPizza.size === size;

                        return (
                            <button
                                key={size}
                                type="button"
                                className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleSizeSelect(products, size)}
                                disabled={!selectedPizza.name}
                            >
                                {size} ({calculatedPrice} zł)
                            </button>
                        );
                    })}
                </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={addPizza}>
                Dodaj Pizzę
            </button>
            {errors.pizzaError && <div className="text-danger mt-2">{errors.pizzaError}</div>}
        </>
    );
}