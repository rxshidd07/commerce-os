'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ProductsPage() {
  const { products, loading, fetchProducts, createProduct, deleteProduct } = useProductStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    sku: '',
    inventory: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createProduct({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        sku: formData.sku,
        inventory: parseInt(formData.inventory),
        category: formData.category,
        image: '/api/placeholder/400/300',
        status: 'active',
      });
      setFormData({ title: '', description: '', price: '', sku: '', inventory: '', category: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-slate-400">Manage your product catalog</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </Button>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Product Title"
                  placeholder="e.g., Wireless Headphones"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  label="SKU"
                  placeholder="e.g., WH-1000"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                />
                <Input
                  label="Price ($)"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <Input
                  label="Stock Quantity"
                  type="number"
                  placeholder="0"
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                  required
                />
                <Input
                  label="Category"
                  placeholder="e.g., Electronics"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Input
                  label="Description"
                  placeholder="Product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={submitting}
              >
                Create Product
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon="🔍"
        />
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-slate-700 border-t-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-400">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">No products found</p>
            <p className="text-slate-500 text-sm mt-2">Create your first product to get started</p>
          </div>
        ) : (
          filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 h-full flex flex-col overflow-hidden group">
                {/* Image */}
                <div className="mb-4 h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🛍️
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Price:</span>
                      <span className="text-blue-400 font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stock:</span>
                      <span className={product.inventory > 0 ? 'text-green-400' : 'text-red-400'}>
                        {product.inventory} units
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SKU:</span>
                      <span className="text-slate-300 font-mono text-xs">{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="text-slate-300">{product.category}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex-1"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
