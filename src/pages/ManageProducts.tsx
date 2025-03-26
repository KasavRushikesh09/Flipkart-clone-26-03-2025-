import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { Edit, Trash2, Plus } from 'lucide-react';

const ManageProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: 0,
    name: '',
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviewCount: 0,
    image: '',
    category: '',
    brand: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'rating' || name === 'reviewCount' ? Number(value) : value,
    }));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: formData.name || 'New Product',
      price: formData.price || 0,
      originalPrice: formData.originalPrice || 0,
      rating: formData.rating || 0,
      reviewCount: formData.reviewCount || 0,
      image: formData.image || 'https://via.placeholder.com/150',
      category: formData.category || 'Uncategorized',
      brand: formData.brand || 'Generic',
      description: formData.description || 'No description provided.',
    };
    addProduct(newProduct);
    setIsAdding(false);
    setFormData({
      id: 0,
      name: '',
      price: 0,
      originalPrice: 0,
      rating: 0,
      reviewCount: 0,
      image: '',
      category: '',
      brand: '',
      description: '',
    });
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(product.id);
    setFormData(product);
  };

  const handleUpdateProduct = () => {
    if (isEditing === null) return;
    const updatedProduct: Product = {
      ...formData,
      id: isEditing,
    } as Product;
    updateProduct(isEditing, updatedProduct);
    setIsEditing(null);
    setFormData({
      id: 0,
      name: '',
      price: 0,
      originalPrice: 0,
      rating: 0,
      reviewCount: 0,
      image: '',
      category: '',
      brand: '',
      description: '',
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-[#1a5dc7]"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Add/Edit Product Form */}
      {(isAdding || isEditing !== null) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">{isAdding ? 'Add Product' : 'Edit Product'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Product Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Original Price"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Rating (0-5)"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Review Count</label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Review Count"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Brand"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Description"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={isAdding ? handleAddProduct : handleUpdateProduct}
              className="px-4 py-2 bg-[#fb641b] text-white rounded-sm hover:bg-[#f85606]"
            >
              {isAdding ? 'Add Product' : 'Update Product'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setIsEditing(null);
                setFormData({
                  id: 0,
                  name: '',
                  price: 0,
                  originalPrice: 0,
                  rating: 0,
                  reviewCount: 0,
                  image: '',
                  category: '',
                  brand: '',
                  description: '',
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Product List</h3>
        {products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">ID</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />
                    </td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.brand}</td>
                    <td className="p-3">{product.rating}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 bg-[#2874f0] text-white rounded-sm hover:bg-[#1a5dc7]"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;