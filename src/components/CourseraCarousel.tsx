import React, { useState, useEffect, useRef } from 'react';

const CourseraCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const totalSlides = 4;

  // Determine items visible per view based on screen width
  const getItemsPerView = (): number => window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const handleResize = (): void => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      
      // Clamp index if window resizing causes out of bounds
      setCurrentIndex(prev => {
        const maxIndex = totalSlides - newItemsPerView;
        return prev > maxIndex ? maxIndex : prev;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateCarousel = (): void => {
    const itemsPerView = getItemsPerView();
    const maxIndex = totalSlides - itemsPerView;
    
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
      return;
    }
    if (currentIndex < 0) {
      setCurrentIndex(0);
      return;
    }

    if (trackRef.current) {
      // Calculate track width: totalSlides * (100 / itemsPerView) % of viewport
      const trackWidthPercent = totalSlides * (100 / itemsPerView);
      trackRef.current.style.width = `${trackWidthPercent}%`;
      
      // Calculate transform: move by currentIndex * (100 / itemsPerView) % of viewport
      const percentageToMove = currentIndex * (100 / itemsPerView);
      trackRef.current.style.transform = `translateX(-${percentageToMove}%)`;
    }

    // Update button states
    if (prevBtnRef.current) {
      prevBtnRef.current.disabled = currentIndex === 0;
      prevBtnRef.current.style.opacity = currentIndex === 0 ? '0' : '';
    }
    
    if (nextBtnRef.current) {
      nextBtnRef.current.disabled = currentIndex === maxIndex;
      nextBtnRef.current.style.opacity = currentIndex === maxIndex ? '0' : '';
    }
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex, itemsPerView]);

  const nextSlide = (): void => {
    const maxIndex = totalSlides - getItemsPerView();
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToSlide = (index: number): void => {
    const maxIndex = totalSlides - getItemsPerView();
    setCurrentIndex(index > maxIndex ? maxIndex : index);
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Main Carousel Section */}
      <main className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 relative overflow-hidden group">
        
        {/* Carousel Viewport */}
        <div className="overflow-hidden w-full relative">
          <div 
            ref={trackRef} 
            className="flex transition-transform duration-500 ease-out" 
            style={{ 
              transform: 'translateX(0%)'
            }}
          >
            
            {/* Slide 1: Personal (Beige/Pink) */}
            <div className="flex-shrink-0 p-3 select-none" style={{ width: `${100 / totalSlides}%` }}>
              <div className="bg-orange-50 rounded-2xl h-80 md:h-96 w-full relative overflow-hidden flex flex-row">
                {/* Decorative Pink Circle */}
                <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-pink-100 rounded-l-full translate-x-1/3 scale-110 z-0"></div>
                
                {/* Content */}
                <div className="w-1/2 lg:w-5/12 p-6 md:p-8 flex flex-col justify-center z-10 relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">Start, switch, or advance your career</h2>
                  <p className="text-gray-700 mb-6 text-sm md:text-base">Grow with 10,000+ courses from top organizations</p>
                  <div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold text-sm md:text-base hover:bg-blue-700 transition flex items-center gap-2">
                      Join for Free 
                      <span>→</span>
                    </button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="w-1/2 lg:w-7/12 relative z-10 flex items-end justify-center h-full">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT-kdJCP_LJi6KUludbr72lrRNxjhDTJgtKgCl2cgiBIaHxILw_O98Q9ujCDvGdP44bxaistuz3Wj6OgwQ" 
                    alt="Learner" 
                    className="object-cover h-4/5 w-auto object-bottom drop-shadow-xl" 
                  />
                </div>
              </div>
            </div>

            {/* Slide 2: Business (Light Blue) */}
            <div className="flex-shrink-0 p-3 select-none" style={{ width: `${100 / totalSlides}%` }}>
              <div className="bg-blue-50 rounded-2xl h-80 md:h-96 w-full relative overflow-hidden flex flex-row">
                {/* Decorative BG Shape */}
                <div className="absolute right-0 top-0 bottom-0 w-3/5 bg-white rounded-l-full z-0 shadow-lg"></div>
                
                {/* Content */}
                <div className="w-1/2 lg:w-5/12 p-6 md:p-8 flex flex-col justify-center z-10 relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">Drive your business forward and empower your talent</h2>
                  <p className="text-gray-700 mb-6 text-sm md:text-base">Train teams with industry-leading experts</p>
                  <div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold text-sm md:text-base hover:bg-blue-700 transition flex items-center gap-2">
                      Try Coursera for Business
                      <span>→</span>
                    </button>
                  </div>
                </div>
                
                {/* Image (Logos) */}
                <div className="w-1/2 lg:w-7/12 relative z-10 flex items-center justify-center h-full p-4">
                  {/* Recreating grid layout of logos visually */}
                  <div className="grid grid-cols-2 gap-4 opacity-80">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center p-2">
                      <img 
                        src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSDaqDjOZHJdcr3uE_mX4mCoAxnsWtMDPeFIo9-p8B0UX-VOY2veuhDajz8nYgH9W-h36-26fo4NZdTn2o" 
                        alt="Google" 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center p-2">
                      <img 
                        src="https://lh3.googleusercontent.com/gg-dl/ABS2GSmkkllypzvLX-zFJMx_mKKawHjGsU1klIa5FVyGcnOSdbFnmr0l0j7S56QnREAsPhMIcU1kVSNqECkX4Iz3un2-Z4r4J3GFyrrqWRBPCZSbd87dkkovgbloIsR53RUGNeqN3yJXpT2vBe3kbrKnc0TzwWxMIiulwgTApTChVjcijOL-jQ" 
                        alt="IBM" 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center p-2">
                      <img 
                        src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ3zHf1Yl0oyiKASxP_YJvRIJK7_ZY-GuN2PwdOoTDdbEUFHuCPxQy0TYtaaryX4fLEGgtYCeytcHwtDec" 
                        alt="Meta" 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center p-2">
                      <img 
                        src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcR91PELY1xVKNh8C0gbjAW4E7GMG_a4RfNRZKGNAoa4MWAWNunZak9yqigeLkkUVyHeYCD-GNBVdVFuDIU" 
                        alt="Salesforce" 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3: AI (Dark Blue) */}
            <div className="flex-shrink-0 p-3 select-none" style={{ width: `${100 / totalSlides}%` }}>
              <div className="bg-blue-950 rounded-2xl h-80 md:h-96 w-full relative overflow-hidden flex flex-row text-white">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950 to-transparent z-10"></div>
                
                {/* Content */}
                <div className="w-2/3 p-6 md:p-8 flex flex-col justify-center z-20 relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">Gain essential AI skills by learning from experts</h2>
                  <p className="text-blue-100 mb-6 text-sm md:text-base">Master Generative AI with top universities and companies</p>
                  <div>
                    <button className="border border-white text-white px-6 py-3 rounded-md font-bold text-sm md:text-base hover:bg-white hover:text-blue-600 transition flex items-center gap-2 w-fit">
                      Explore programs
                      <span>→</span>
                    </button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="absolute right-0 top-0 bottom-0 w-2/3 z-0">
                  <img 
                    src="https://lh3.googleusercontent.com/gg-dl/ABS2GSnD7AyGYTe8ss4LddAsfwA4Z_TIYsR2GsJJ5-RxYehlW8qNwwTyGt3TLXqp6vEqN5QaV6g07dlGz1-GNPpTB5mCGofFZymgg7ICVa89tDnydcQaSM8jB-IZpwal921pUS9lIIzwRTGi9STj5ld64G9IFQW2V1OtlRBAlEemntjdcHWe" 
                    alt="AI Background" 
                    className="w-full h-full object-cover opacity-60" 
                  />
                </div>
              </div>
            </div>

            {/* Slide 4: Degrees (Gradient) */}
            <div className="flex-shrink-0 p-3 select-none" style={{ width: `${100 / totalSlides}%` }}>
              <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-2xl h-80 md:h-96 w-full relative overflow-hidden flex flex-row text-white">
                {/* Content */}
                <div className="w-2/3 p-6 md:p-8 flex flex-col justify-center z-20 relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">Earn your degree online</h2>
                  <p className="text-purple-100 mb-6 text-sm md:text-base">Breakthrough pricing on 100% online degrees from top universities.</p>
                  <div>
                    <button className="bg-white text-purple-900 px-6 py-3 rounded-md font-bold text-sm md:text-base hover:bg-gray-100 transition flex items-center gap-2 w-fit">
                      Find a Degree
                      <span>🎓</span>
                    </button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 flex items-center justify-center">
                  <img 
                    src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRrrG6DvCvDVx_L60Z3DbWBUcvdwg5eziNBFyZnWYW22FlYZjnjyt8Uo3llHup5wPhEKv8LGp-qzJzlNn8" 
                    alt="Degree" 
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Controls (Floating) */}
        {/* Prev Button */}
        <button 
          ref={prevBtnRef}
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:ml-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 transition z-30 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed border border-gray-100"
          disabled={currentIndex === 0}
        >
          <span className="text-xl">‹</span>
        </button>
        {/* Next Button */}
        <button 
          ref={nextBtnRef}
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:mr-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 transition z-30 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed border border-gray-100"
          disabled={currentIndex === totalSlides - getItemsPerView()}
        >
          <span className="text-xl">›</span>
        </button>

        {/* Pagination Indicators */}
        <div className="flex justify-start md:justify-center mt-6 gap-2 px-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`pagination-dot h-1.5 rounded-full cursor-pointer transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              data-index={idx}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseraCarousel;
