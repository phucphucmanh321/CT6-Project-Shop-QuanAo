import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../styles/Promotions.css';
import promoSummer from '../assets/images/promo-summer.svg';
import promoWomen from '../assets/images/promo-women.svg';
import promoMen from '../assets/images/promo-men.svg';
import promoJeans from '../assets/images/promo-jeans.svg';
import promoDress from '../assets/images/promo-dress.svg';

const promotionImages = [
  {
    id: 1,
    title: 'Mùa Hè - Giảm 40%',
    image: promoSummer
  },
  {
    id: 2,
    title: 'Bộ Sưu Tập Nữ',
    image: promoWomen
  },
  {
    id: 3,
    title: 'Áo Sơ Mi Nam',
    image: promoMen
  },
  {
    id: 4,
    title: 'Quần Denim',
    image: promoJeans
  },
  {
    id: 5,
    title: 'Đầm Dạo Phố',
    image: promoDress
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
            <div className="carousel-main">
              <div className="carousel-slide">
                <img src={promotionImages[currentIndex].image} alt={promotionImages[currentIndex].title} className="carousel-image" />
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
                >
                  <div className="thumbnail-content">
                    <img src={promo.image} alt={promo.title} style={{width: '80%', height: '80%', objectFit: 'cover'}} />
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
