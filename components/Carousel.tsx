import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  title: string;
  items: Product[];
};

export default function Carousel({ title, items }: Props) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  const nextIndex = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
  };

  const prevIndex = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  return (
    <>
      <div className="carousel-title-line">
        <button
          className="carousel-button"
          onClick={prevIndex}
          disabled={isDisabled('prev')}
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>
        <h2 className="bestsellers-title">{title}</h2>
        <button
          className="carousel-button"
          onClick={nextIndex}
          disabled={isDisabled('next')}
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="carousel">
        <div ref={carousel} className="carousel-container">
          {items.map((item, index) => (
            <div key={item._id} className="item">
              <div className="img-wrapper">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill={true}
                  className="img"
                  priority={index < 8}
                  sizes="45vw, (min-width: 500px) 25vw, (min-width: 768px) 20vw"
                />
              </div>
              <h3 className="item-title">{item.title}</h3>
              <p className="item-price">{item.price}$</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
