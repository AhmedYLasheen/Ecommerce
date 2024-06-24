import React, { useState, useEffect, ChangeEvent } from "react";

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
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedCart = cart.map((product) =>
      product.id === productId ? { ...product, quantity: quantity } : product
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <button>
        {" "}
        <h4 className="text-center font-bold ml-4 mt-1 "> Back to product</h4>
      </button>
      <h1 className="text-center font-bold m-14 text-red-600">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center font-bold ">Your cart is empty</p>
      ) : (
        <div className="mx-28 grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {cart.map((product) => (
            <div
              className="my-6"
              key={product.id}
              style={{ position: "relative", height: "35vh" }}
            >
              <div className="">
                <img src={product.image} alt={product.title} width="100" />
              </div>
              <h2>{product.title}</h2>
              <p>Price: ${product.price * product.quantity}</p>

              <label>
                Quantity:
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </label>
              <div style={{ position: "absolute", bottom: "0" }}>
                <button
                  className="mt-3 w-full  rounded-md border border-transparent bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-400"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
