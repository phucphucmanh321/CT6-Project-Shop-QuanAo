// API endpoints
import mockProducts, { filterProducts } from './mockProductsData';

const PRODUCTS_API_BASE_URL_1 = 'https://api.lehuuminhquan.id.vn'; // Main API
const PRODUCTS_API_BASE_URL_2 = 'https://django-thayhung-thu6chieu.onrender.com/api'; // Django API (fallback)

const productsAPI = {
  // Lấy danh sách sản phẩm
  getAllProducts: async (options = {}) => {
    try {
      let url = `${PRODUCTS_API_BASE_URL_1}/products`;
      
      // Build query parameters
      const params = new URLSearchParams();
      if (options.search) params.append('q', options.search);
      if (options.minPrice) params.append('min_price', options.minPrice);
      if (options.maxPrice) params.append('max_price', options.maxPrice);
      if (options.category) params.append('category', options.category);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Fetching products from:', url);
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (!response.ok) {
        throw new Error(`Products API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products fetched from main API:', data);
      
      // Handle different response formats
      let productsList = [];
      if (Array.isArray(data)) {
        productsList = data;
      } else if (data && Array.isArray(data.data)) {
        // Format: { page, limit, total, data: [...] }
        productsList = data.data;
      } else if (data && data.results && Array.isArray(data.results)) {
        // Format: { results: [...] }
        productsList = data.results;
      } else if (data && typeof data === 'object') {
        // Try to extract array from object
        productsList = Object.values(data).find(v => Array.isArray(v)) || [];
      }
      
      // Map API fields to component fields
      productsList = productsList.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price) || 0,
        description: p.description,
        category: p.category_name || p.category || 'Áo',
        image: p.main_image ? `https://via.placeholder.com/400x400?text=${encodeURIComponent(p.name)}` : null,
        color: p.color,
        size: p.size,
        material: p.material,
        stock: p.stock !== undefined ? p.stock : 999,
        cate_id: p.cate_id,
        created_at: p.created_at
      }));
      
      return productsList;
    } catch (error) {
      console.warn('Primary API failed, trying fallback:', error.message);
      
      try {
        // Fallback to Django API
        console.log('Trying Django API...');
        const response = await fetch(`${PRODUCTS_API_BASE_URL_2}/products`, 
          { signal: AbortSignal.timeout(5000) });
        
        if (!response.ok) {
          throw new Error('Fallback API also failed');
        }
        
        const data = await response.json();
        console.log('Products fetched from Django API:', data);
        
        // Handle different response formats
        let productsList = [];
        if (Array.isArray(data)) {
          productsList = data;
        } else if (data && Array.isArray(data.data)) {
          productsList = data.data;
        } else if (data && data.results && Array.isArray(data.results)) {
          productsList = data.results;
        } else if (data && typeof data === 'object') {
          productsList = Object.values(data).find(v => Array.isArray(v)) || [];
        }
        
        return productsList;
      } catch (fallbackError) {
        console.warn('All real APIs failed, using mock data:', fallbackError.message);
        
        // Use mock data as last resort
        if (options.search || options.minPrice || options.maxPrice) {
          return filterProducts(mockProducts, options);
        }
        return mockProducts;
      }
    }
  },

  // Lấy sản phẩm theo ID
  getProductById: async (productId) => {
    try {
      // Try main API first
      const url = `${PRODUCTS_API_BASE_URL_1}/products/${productId}`;
      console.log('Fetching product from:', url);
      
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (!response.ok) {
        throw new Error(`Product API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Product fetched from main API:', data);
      
      // Map API fields to component fields
      const product = data.data || data;
      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        description: product.description,
        category: product.category_name || product.category || 'Áo',
        image: product.main_image ? `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}` : null,
        color: product.color,
        size: product.size,
        material: product.material,
        stock: product.stock !== undefined ? product.stock : 999,
        cate_id: product.cate_id,
        created_at: product.created_at
      };
    } catch (error) {
      console.warn('Primary API failed, trying fallback:', error.message);
      
      try {
        // Fallback to Django API
        console.log('Trying Django API for product...');
        const response = await fetch(`${PRODUCTS_API_BASE_URL_2}/products/${productId}`,
          { signal: AbortSignal.timeout(5000) });
        
        if (!response.ok) {
          throw new Error('Fallback API also failed');
        }
        
        const data = await response.json();
        console.log('Product fetched from Django API:', data);
        return data;
      } catch (fallbackError) {
        console.warn('All real APIs failed, using mock data:', fallbackError.message);
        
        // Use mock data as last resort
        const product = mockProducts.find(p => p.id == productId);
        if (!product) {
          throw new Error('Sản phẩm không tìm thấy');
        }
        return product;
      }
    }
  },

  // Tìm kiếm sản phẩm
  searchProducts: async (searchQuery) => {
    return productsAPI.getAllProducts({ search: searchQuery });
  },

  // Lọc sản phẩm theo giá
  filterByPrice: async (minPrice, maxPrice) => {
    return productsAPI.getAllProducts({ minPrice, maxPrice });
  },

  // Lọc sản phẩm theo category
  filterByCategory: async (category) => {
    return productsAPI.getAllProducts({ category });
  },
};

export default productsAPI;
