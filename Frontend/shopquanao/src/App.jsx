import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load pages để tránh lỗi import
const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main className="main-content">
        <Suspense fallback={
          <div style={{padding: '40px', textAlign: 'center', fontSize: '18px'}}>
            ⏳ Đang tải...
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </ErrorBoundary>
  )
}

export default App
