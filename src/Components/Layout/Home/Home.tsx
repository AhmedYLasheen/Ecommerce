import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  href: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();
  // all and filrter
  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);
  // search
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, productToAdd]);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToAdd = () => {
    navigate("/addProduct");
  };

  return (
    <>
      <nav className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={navigateToCart}
                type="button"
                className="relative rounded-full p-1"
              >
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                <span className="bg-indigo-500 px-1 rounded-md  cartBadge">{cart.length}</span>
              </button>

              <div className="relative ml-10">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="header flex justify-between text-center">
            <div className="text-center">
              <label className=" text-center ">Filter by category</label>
              <select  className="px-10 mx-4 border-2 rounded-md text-center"  value={category} onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
            <div>
              <input className="w-full px-40 border-2 rounded-md" placeholder="Search by title" type="text" value={search} onChange={handleSearchChange} />
            </div>
          
          </div>
          <div className="flex justify-between items-center mt-5 ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>
          <button
              onClick={() => navigateToAdd()}
              type="button"
              className="mt-3 flex rounded-md border border-transparent bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-400"
            >
              Add New Product
            </button>

         
          </div>
        

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative m-6">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                {cart.some((item) => item.id === product.id) ? (
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    type="button"
                    className="mt-3 w-full rounded-md border border-transparent bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-400"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    type="button"
                    className="mt-3 w-full rounded-md border border-transparent bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-400"
                  >
                    Add to Cart
                  </button>
                )}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>{product.title}</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}$
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
