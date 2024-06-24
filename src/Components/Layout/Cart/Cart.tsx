import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleRemoveFromCart = (productId: number) => {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        const updatedCart = cart.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncrement = (productId: number) => {
        const updatedCart = cart.map((product) =>
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecrement = (productId: number) => {
        const updatedCart = cart.map((product) =>
            product.id === productId && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <div>
            <h1>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((product) => (
                        <div key={product.id}>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.quantity>=1?product.price*product.quantity:product.price}</p>
                            <p>{product.description}</p>
                            <img src={product.image} alt={product.title} width="100" />
                            <div>
                                <button onClick={() => handleDecrement(product.id)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleIncrement(product.id)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart(product.id)}>
                                Remove from Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
