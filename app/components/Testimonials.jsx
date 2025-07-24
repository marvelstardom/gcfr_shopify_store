import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'John Doe',
    title: 'Satisfied Customer',
    feedback: 'Absolutely love the quality and fit of the outfits. The craftsmanship is top-tier!',
  },
  {
    name: 'Amaka O.',
    title: 'Fashion Enthusiast',
    feedback: 'I felt like royalty wearing their kaftan! Excellent customer service too.',
  },
  {
    name: 'David K.',
    title: 'Groom-to-be',
    feedback: 'Their bespoke suit made my engagement shoot unforgettable. Highly recommended!',
  },
  {
    name: 'Fatima B.',
    title: 'Event Host',
    feedback: 'The outfit stole the spotlight at my event. Compliments all day!',
  },
  {
    name: 'Chinedu M.',
    title: 'Business Executive',
    feedback: 'Tailored to perfection. Wore mine to a board meeting and got instant respect.',
  },
  {
    name: 'Linda C.',
    title: 'Photographer',
    feedback: 'These pieces make every photoshoot pop. The fabric and fit? Chef’s kiss!',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Responsive check
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1); // mobile
      } else {
        setItemsPerSlide(3); // desktop
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="bg-gray-100 py-16 px-4 relative">
      <h2 className="text-3xl md:text-4xl font-semibold text-center">What Our Clients Say</h2>

      <div className="relative w-full overflow-hidden max-w-7xl mx-auto mt-10">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${(100 / totalSlides) * current}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-24"
            >
              {testimonials
                .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                .map((item, index) => (
                  <div
                    key={index}
                    className="relative group bg-white p-6 rounded-lg shadow-md h-full overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffe4a4] to-[#ffc642] opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10" />

                    {/* Testimonial content */}
                    <div className="relative z-20">
                      <p className="text-gray-800 italic mb-4">“{item.feedback}”</p>
                      <h4 className="font-semibold text-lg mt-3">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.title}</p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
