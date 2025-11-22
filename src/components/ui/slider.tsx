import React, { useState, useEffect } from 'react';
import './slider.css';

interface SliderProps {
  children: React.ReactNode[];
  autoplayInterval?: number;
}

export function HeroSlider({ children, autoplayInterval = 5000 }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      const timer = setTimeout(() => {
        slideNext();
        setSlideDone(true);
      }, autoplayInterval);
      setTimeID(timer);
    }
    return () => {
      if (timeID) {
        clearTimeout(timeID);
      }
    };
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const autoPlayStop = () => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const autoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={autoPlayStop}
      onMouseLeave={autoPlayStart}
    >
      {children.map((item, index) => {
        return (
          <div
            className={`slider__item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            {item}
          </div>
        );
      })}

      <div className="container__slider__links">
        {children.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? 'container__slider__links-small container__slider__links-small-active'
                  : 'container__slider__links-small'
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
