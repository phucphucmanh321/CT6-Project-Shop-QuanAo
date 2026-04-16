import api from './axiosConfig';

// Demo accounts (kept for local/dev fallback)
const demoAccounts = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'Password123',
    name: 'Nguyễn Văn A',
    phone: '0901234567'
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'Password456',
    name: 'Trần Thị B',
    phone: '0987654321'
  }
];

const authAPI = {
  // Đăng ký
  register: async (userData) => {
    // first check demo accounts (local dev)
    const existingAccount = demoAccounts.find(acc => acc.email === userData.email);
    if (existingAccount && existingAccount.password === userData.password) {
      return {
        success: true,
        message: 'Đăng ký thành công (demo)',
        user: {
          id: existingAccount.id,
          email: existingAccount.email,
          name: userData.fullName || existingAccount.name,
          phone: userData.phone || existingAccount.phone,
        },
        token: `token_${existingAccount.id}_${Date.now()}`,
      };
    }

    try {
      const res = await api.post('/auth/register', userData);
      return res.data;
    } catch (err) {
      // Fallback: create local account if API is unavailable
      console.error('Registration API error:', err.message || err);
      return {
        success: true,
        message: 'Đăng ký thành công (local-fallback)',
        user: {
          id: Date.now(),
          email: userData.email,
          name: userData.fullName,
          phone: userData.phone,
        },
        token: `token_local_${Date.now()}`,
      };
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    // demo account check
    const demoAccount = demoAccounts.find(
      acc => acc.email === credentials.email && acc.password === credentials.password
    );

    if (demoAccount) {
      return {
        success: true,
        message: 'Đăng nhập thành công (demo)',
        user: {
          id: demoAccount.id,
          email: demoAccount.email,
          name: demoAccount.name,
          phone: demoAccount.phone,
        },
        token: `token_${demoAccount.id}_${Date.now()}`,
      };
    }

    try {
      const res = await api.post('/auth/login', credentials);
      return res.data;
    } catch (err) {
      console.error('Login API error:', err.response?.data || err.message || err);
      // rethrow to let caller handle it
      throw err;
    }
  },

  // Lấy thông tin user theo ID
  getUserById: async (userId) => {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      console.error('Get user API error:', err.response?.data || err.message || err);
      throw err;
    }
  },

  // Lấy tất cả users
  getAllUsers: async () => {
    try {
      const res = await api.get('/users');
      return res.data;
    } catch (err) {
      console.error('Get all users API error:', err.response?.data || err.message || err);
      throw err;
    }
  },
};

export default authAPI;
