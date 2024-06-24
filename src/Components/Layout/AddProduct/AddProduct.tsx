import React, { useState } from 'react';

interface Product {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

const AddProduct: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const product: Product = {
            title,
            price: parseFloat(price),
            description,
            image,
            category,
        };

        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-20'>
            <h1 className='my-16'>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title : </label>
                    <input 
                    className="w-full my-6  border-2 rounded-md"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Price : </label>
                    <input 
                    className="w-full my-6  border-2 rounded-md"
                        type="text" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description : </label>
                    <input 
                    className="w-full my-6  border-2 rounded-md"
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Image URL : </label>
                    <input 
                    className="w-full my-6  border-2 rounded-md"
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Category : </label>
                    <input 
                    className="w-full my-6 px-40 border-2 rounded-md"
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                    />
                </div>
                <button className="mt-3 flex rounded-md border border-transparent bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-400" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProduct;