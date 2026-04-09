import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy load components để tránh lỗi import
const Hero = lazy(() => import('./components/Hero'))
const Promotions = lazy(() => import('./components/Promotions'))
const Products = lazy(() => import('./components/Products'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<div style={{padding: '20px', textAlign: 'center'}}>Loading...</div>}>
            <Hero />
            <Promotions />
            <Products />
          </Suspense>
        } />
        <Route path="/categories" element={<Suspense fallback={<div>Loading...</div>}><Categories /></Suspense>} />
        <Route path="/product/:id" element={<Suspense fallback={<div>Loading...</div>}><ProductDetail /></Suspense>} />
        <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<div>Loading...</div>}><Checkout /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
