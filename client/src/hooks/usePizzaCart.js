import { useState } from 'react';

export const usePizzaCart = () => {
    const [selectedPizza, setSelectedPizza] = useState({ name: '', size: '', price: 0 });
    const [pizzas, setPizzas] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const handlePizzaSelect = (products, pizzaName) => {
        const pizza = products.find((p) => p.name === pizzaName);
        if (pizza) {
            setSelectedPizza({ name: pizza.name, size: '', price: pizza.price });
        }
    };

    const handleSizeSelect = (products, size) => {
        let multiplier = size === 'Familijna' ? 1.5 : size === 'Imprezowa' ? 1.9 : 1;
        const basePizza = products.find((p) => p.name === selectedPizza.name);
        const basePrice = basePizza ? basePizza.price : 0;

        setSelectedPizza(prev => ({
            ...prev,
            size,
            price: parseFloat((basePrice * multiplier).toFixed(2))
        }));
    };

    const addPizza = () => {
        if (!selectedPizza.name || !selectedPizza.size) {
            setErrors(prev => ({ ...prev, pizzaError: 'Proszę wybrać pizzę i rozmiar.' }));
            return;
        }

        setPizzas(prev => [...prev, selectedPizza]);
        setTotalPrice(prev => parseFloat((prev + selectedPizza.price).toFixed(2)));

        setSelectedPizza({ name: '', size: '', price: 0 });
        setErrors(prev => ({ ...prev, pizzaError: '' }));
    };

    const removePizza = (index) => {
        const pizzaToRemove = pizzas[index];
        setPizzas(prev => prev.filter((_, i) => i !== index));
        setTotalPrice(prev => parseFloat((prev - pizzaToRemove.price).toFixed(2)));
    };

    const clearCart = () => {
        setPizzas([]);
        setTotalPrice(0);
        setSelectedPizza({ name: '', size: '', price: 0 });
    };

    return {
        selectedPizza,
        pizzas,
        totalPrice,
        errors,
        handlePizzaSelect,
        handleSizeSelect,
        addPizza,
        removePizza,
        clearCart
    };
};