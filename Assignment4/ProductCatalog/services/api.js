const BASE_URL = 'https://dummyjson.com';

export const productApi = {
  // Fetch all products with optional limit and skip for pagination
  async getAllProducts(limit = 30, skip = 0) {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Fetch a single product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products by query
  async searchProducts(query) {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}; 