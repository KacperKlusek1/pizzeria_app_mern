import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Błąd podczas pobierania produktów');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};