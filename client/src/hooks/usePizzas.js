import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const usePizzas = () => {
    const { user } = useAuthContext();
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPizzas = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/products/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Błąd podczas pobierania menu');
            }

            const data = await res.json();
            const mapped = data.map((p) => ({
                id: p._id,
                name: p.name,
                description: p.description,
                price: p.price,
                available: p.available
            }));
            setPizzas(mapped);
        } catch (error) {
            console.error('Błąd podczas pobierania menu:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updatePizza = async (pizzaId, field, value) => {
        // Optymistyczna aktualizacja UI
        setPizzas(prevPizzas =>
            prevPizzas.map(pizza =>
                pizza.id === pizzaId ? { ...pizza, [field]: value } : pizza
            )
        );

        try {
            const pizzaToUpdate = pizzas.find(p => p.id === pizzaId);
            const updatedPizza = { ...pizzaToUpdate, [field]: value };

            const res = await fetch(`http://localhost:5000/api/products/${pizzaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedPizza)
            });

            if (!res.ok) throw new Error('Błąd aktualizacji pizzy');

            const data = await res.json();
            const normalizedPizza = {
                id: data._id,
                name: data.name,
                description: data.description,
                price: data.price,
                available: data.available
            };

            setPizzas(prevPizzas =>
                prevPizzas.map(p => p.id === pizzaId ? normalizedPizza : p)
            );
            return true;
        } catch (error) {
            console.error(error);
            setError('Nie udało się zaktualizować pizzy');
            // Przywróć poprzedni stan w przypadku błędu
            await fetchPizzas();
            return false;
        }
    };

    const addPizza = async (newPizza) => {
        try {
            const res = await fetch('http://localhost:5000/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    name: newPizza.name,
                    description: newPizza.description,
                    price: parseFloat(newPizza.price),
                    available: Boolean(newPizza.available)
                })
            });

            if (!res.ok) throw new Error('Błąd dodawania pizzy');

            const createdPizza = await res.json();
            const normalizedPizza = {
                id: createdPizza._id,
                name: createdPizza.name,
                description: createdPizza.description,
                price: createdPizza.price,
                available: createdPizza.available
            };

            setPizzas(prevPizzas => [...prevPizzas, normalizedPizza]);
            return true;
        } catch (error) {
            console.error(error);
            setError('Nie udało się dodać pizzy');
            return false;
        }
    };

    const deletePizza = async (pizzaId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${pizzaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!res.ok) {
                throw new Error('Błąd podczas usuwania pizzy');
            }

            setPizzas(prevPizzas => prevPizzas.filter(pizza => pizza.id !== pizzaId));
            return true;
        } catch (error) {
            console.error(error);
            setError('Nie udało się usunąć pizzy');
            return false;
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchPizzas();
        }
    }, [user?.token]);

    return {
        pizzas,
        loading,
        error,
        updatePizza,
        addPizza,
        deletePizza,
        refetchPizzas: fetchPizzas
    };
};
