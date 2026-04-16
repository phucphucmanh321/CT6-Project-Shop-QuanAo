// Script để thêm 2 tài khoản demo vào localStorage
// Chạy script này trong browser console (F12 > Console)

const demoAccounts = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'Password123',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'Password456',
    name: 'Trần Thị B',
    phone: '0987654321',
    createdAt: new Date().toISOString()
  }
];

// Lưu vào localStorage
localStorage.setItem('demoAccounts', JSON.stringify(demoAccounts));

console.log('✅ Đã thêm 2 tài khoản demo!');
console.log('📧 Tài khoản 1: user1@example.com / Password123');
console.log('📧 Tài khoản 2: user2@example.com / Password456');
