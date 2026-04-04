import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../styles/Promotions.css';

const promotionImages = [
  {
    id: 1,
    title: 'Mùa Hè - Giảm 40%',
    color: '#f97316'
  },
  {
    id: 2,
    title: 'Bộ Sưu Tập Nữ',
    color: '#ec4899'
  },
  {
    id: 3,
    title: 'Áo Sơ Mi Nam',
    color: '#3b82f6'
  },
  {
    id: 4,
    title: 'Quần Denim',
    color: '#1e40af'
  },
  {
    id: 5,
    title: 'Đầm Dạo Phố',
    color: '#a855f7'
  },
];

export default function Promotions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionImages.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? promotionImages.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <section className="promotions-section">
      <Container>
        <div className="carousel-wrapper">
          <div className="carousel-container">
            {/* Main Carousel */}
            <div className="carousel-main" style={{backgroundColor: promotionImages[currentIndex].color}}>
              <div className="carousel-slide">
                <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" className="carousel-image">
                  <defs>
                    <linearGradient id="promoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: promotionImages[currentIndex].color, stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: promotionImages[currentIndex].color, stopOpacity: 0.8}} />
                    </linearGradient>
                  </defs>
                  <rect width="1200" height="400" fill="url(#promoGradient)" />
                  <circle cx="200" cy="100" r="80" fill="rgba(255,255,255,0.2)" />
                  <circle cx="1000" cy="300" r="120" fill="rgba(255,255,255,0.15)" />
                  <circle cx="600" cy="400" r="100" fill="rgba(255,255,255,0.1)" />
                </svg>
                <div className="slide-overlay">
                  <h3 className="slide-title">{promotionImages[currentIndex].title}</h3>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button 
                className="carousel-btn carousel-btn-prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button 
                className="carousel-btn carousel-btn-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>

            {/* Thumbnails / Indicators */}
            <div className="carousel-indicators">
              {promotionImages.map((promo, index) => (
                <button
                  key={promo.id}
                  className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails Slider */}
          <div className="thumbnails-container">
            <div className="thumbnails-scroll">
              {promotionImages.map((promo, index) => (
                <div
                  key={promo.id}
                  className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  style={{backgroundColor: promo.color}}
                >
                  <div className="thumbnail-content">
                    <span className="thumbnail-icon">🎁</span>
                  </div>
                  <div className="thumbnail-label">{promo.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
