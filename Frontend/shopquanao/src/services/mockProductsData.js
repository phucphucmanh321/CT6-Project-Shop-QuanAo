// Mock Products Data - TPNQT Collection
// All 20 products from real product images

const IMAGE_BASE_PATH = '/src/assets/images/products/';

const mockProducts = [
  {
    id: 1,
    name: 'Big SS Long Tee Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 199000,
    image: IMAGE_BASE_PATH + 'product-1-big-ss-long-tee-black.jpg',
    description: 'Áo thun dài tay cổ tròn màu đen với in chữ "BIG SS LONG TEE" nổi bật. Chất cotton mềm mại, thoáng khí.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '100% Cotton',
    stock: 25
  },
  {
    id: 2,
    name: 'Striped Sweatshirt Navy',
    category: 'Áo',
    category_name: 'Áo',
    price: 349000,
    image: IMAGE_BASE_PATH + 'product-2-striped-sweatshirt-navy.jpg',
    description: 'Áo nỉ cổ tròn với sọc navy và trắng, thiết kế hiện đại. Chất nỉ ấm áp, thoải mái.',
    color: 'Trắng/Navy',
    size: 'M, L, XL',
    material: '80% Cotton, 20% Polyester',
    stock: 18
  },
  {
    id: 3,
    name: 'Striped Long Sleeve Tee',
    category: 'Áo',
    category_name: 'Áo',
    price: 279000,
    image: IMAGE_BASE_PATH + 'product-3-striped-long-sleeve-tee.jpg',
    description: 'Áo thun dài tay với sọc đa màu (navy, trắng, xanh nhạt, ghi). Thiết kế độc đáo, nổi bật.',
    color: 'Sọc đa màu',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 20
  },
  {
    id: 4,
    name: 'Sweatshirt Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 399000,
    image: IMAGE_BASE_PATH + 'product-4-sweatshirt-black.jpg',
    description: 'Áo nỉ cổ tròn màu đen trơn, chất liệu nỉ cao cấp. Thoải mái cho mọi hoạt động.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '70% Cotton, 30% Polyester',
    stock: 15
  },
  {
    id: 5,
    name: 'Long Sleeve Tee White',
    category: 'Áo',
    category_name: 'Áo',
    price: 189000,
    image: IMAGE_BASE_PATH + 'product-5-long-sleeve-tee-white.jpg',
    description: 'Áo thun dài tay cổ tròn màu trắng sạch, chất cotton mềm mại. Đơn giản nhưng thanh lịch.',
    color: 'Trắng',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 35
  },
  {
    id: 6,
    name: 'Knit Sweater Navy',
    category: 'Áo',
    category_name: 'Áo',
    price: 449000,
    image: IMAGE_BASE_PATH + 'product-6-knit-sweater-navy.jpg',
    description: 'Áo len dệt kim cổ tròn màu xanh navy, ấm áp. Phù hợp cho mùa thu đông.',
    color: 'Xanh Navy',
    size: 'M, L, XL',
    material: '100% Acrylic',
    stock: 12
  },
  {
    id: 7,
    name: 'Numbered Tee 9',
    category: 'Áo',
    category_name: 'Áo',
    price: 219000,
    image: IMAGE_BASE_PATH + 'product-7-numbered-tee-9.jpg',
    description: 'Áo thun cổ tròn màu đen với in số 9 to nổi bật. Thiết kế thể thao, cá tính.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '100% Cotton',
    stock: 22
  },
  {
    id: 8,
    name: 'Doc Tee Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 229000,
    image: IMAGE_BASE_PATH + 'product-8-doc-tee-black.jpg',
    description: 'Áo thun cổ tròn màu đen với in hình bác sĩ độc đáo. Phong cách vui nhộn.',
    color: 'Đen',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 28
  },
  {
    id: 9,
    name: 'Golf Tee Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 219000,
    image: IMAGE_BASE_PATH + 'product-9-golf-tee-black.jpg',
    description: 'Áo thun cổ tròn màu đen với in hình golf độc đáo. Dành cho những người yêu thể thao.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '100% Cotton',
    stock: 18
  },
  {
    id: 10,
    name: 'DNA Gradient Tee',
    category: 'Áo',
    category_name: 'Áo',
    price: 249000,
    image: IMAGE_BASE_PATH + 'product-10-dna-gradient-tee.jpg',
    description: 'Áo thun cổ tròn màu đen với in DNA gradient xanh lục. Thiết kế khoa học hiện đại.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '100% Cotton',
    stock: 16
  },
  {
    id: 11,
    name: 'DNA Neon Tee',
    category: 'Áo',
    category_name: 'Áo',
    price: 259000,
    image: IMAGE_BASE_PATH + 'product-11-dna-neon-tee.jpg',
    description: 'Áo thun cổ tròn màu đen với in DNA neon gradient (xanh/hồng). Bắt mắt và nổi bật.',
    color: 'Đen',
    size: 'M, L, XL, XXL',
    material: '100% Cotton',
    stock: 19
  },
  {
    id: 12,
    name: 'Colorblock Tee',
    category: 'Áo',
    category_name: 'Áo',
    price: 279000,
    image: IMAGE_BASE_PATH + 'product-12-colorblock-tee.jpg',
    description: 'Áo thun cổ tròn tổ chức màu (xanh/đỏ/trắng/navy). Thiết kế tổ chức rực rỡ.',
    color: 'Đa sắc',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 21
  },
  {
    id: 13,
    name: 'Queen Mouse Tee White',
    category: 'Áo',
    category_name: 'Áo',
    price: 209000,
    image: IMAGE_BASE_PATH + 'product-13-queen-mouse-tee-white.jpg',
    description: 'Áo thun cổ tròn màu trắng với in hình chuột hoàng gia ngộ nghĩnh. Dễ thương và vui tính.',
    color: 'Trắng',
    size: 'XS, S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 24
  },
  {
    id: 14,
    name: 'Spider Baby Gray',
    category: 'Áo',
    category_name: 'Áo',
    price: 199000,
    image: IMAGE_BASE_PATH + 'product-14-spider-baby-gray.jpg',
    description: 'Áo thun cổ tròn màu xám với in hình nhện con dễ thương. Thiết kế ngộ nghĩnh cho mọi lứa tuổi.',
    color: 'Xám',
    size: 'S, M, L, XL',
    material: '100% Cotton',
    stock: 20
  },
  {
    id: 15,
    name: 'Spider Baby Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 199000,
    image: IMAGE_BASE_PATH + 'product-15-spider-baby-black.jpg',
    description: 'Áo thun cổ tròn màu đen với in hình nhện con dễ thương. Phiên bản đen sang trọng hơn.',
    color: 'Đen',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 26
  },
  {
    id: 16,
    name: 'Plain Tee Gray',
    category: 'Áo',
    category_name: 'Áo',
    price: 169000,
    image: IMAGE_BASE_PATH + 'product-16-plain-tee-gray.jpg',
    description: 'Áo thun cổ tròn màu xám nhạt trơn đơn giản. Có thể mix and match với bất kỳ outfit nào.',
    color: 'Xám nhạt',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton',
    stock: 30
  },
  {
    id: 17,
    name: 'Plain Tee Gray Large',
    category: 'Áo',
    category_name: 'Áo',
    price: 169000,
    image: IMAGE_BASE_PATH + 'product-17-plain-tee-gray-large.jpg',
    description: 'Áo thun cổ tròn màu xám đậm trơn, vải dày dặn bền chắc.',
    color: 'Xám',
    size: 'M, L, XL, XXL, XXXL',
    material: '100% Cotton',
    stock: 28
  },
  {
    id: 18,
    name: 'Polo Shirt Tan',
    category: 'Áo',
    category_name: 'Áo',
    price: 299000,
    image: IMAGE_BASE_PATH + 'product-18-polo-shirt-tan.jpg',
    description: 'Áo polo cổ sơ mi màu vàng nâu, vải piqué cao cấp. Phù hợp cho công sở lẫn thường ngày.',
    color: 'Vàng nâu',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton Piqué',
    stock: 17
  },
  {
    id: 19,
    name: 'Polo Shirt White',
    category: 'Áo',
    category_name: 'Áo',
    price: 299000,
    image: IMAGE_BASE_PATH + 'product-19-polo-shirt-white.jpg',
    description: 'Áo polo cổ sơ mi màu trắng, vải piqué mềm mại. Thanh lịch và thoáng khí.',
    color: 'Trắng',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton Piqué',
    stock: 19
  },
  {
    id: 20,
    name: 'Polo Shirt Black',
    category: 'Áo',
    category_name: 'Áo',
    price: 299000,
    image: IMAGE_BASE_PATH + 'product-20-polo-shirt-black.jpg',
    description: 'Áo polo cổ sơ mi màu đen, vải piqué bền chắc. Sang trọng và chuyên nghiệp.',
    color: 'Đen',
    size: 'S, M, L, XL, XXL',
    material: '100% Cotton Piqué',
    stock: 21
  }
];

// Function để filter sản phẩm
function filterProducts(products, options = {}) {
  let filtered = [...products];
  
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (options.minPrice || options.maxPrice) {
    const min = options.minPrice || 0;
    const max = options.maxPrice || Infinity;
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }
  
  if (options.category) {
    filtered = filtered.filter(p => p.category_name === options.category);
  }
  
  return filtered;
}

export { filterProducts };
export default mockProducts;
