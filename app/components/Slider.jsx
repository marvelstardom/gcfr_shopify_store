import React, { useState, useEffect } from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';
import { sliderContent } from './sliderContent';


export default function Slider() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev + 1) % sliderContent.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [count]);

  const handlePrevSlide = () => {
    setCount((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  };

  const handleNextSlide = () => {
    setCount((prev) => (prev + 1) % sliderContent.length);
  };

  return (
    <div className="">
      <div className="overflow-hidden w-full relative h-[700px] sm:h-[600px] md:h-[570px]">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${count * (100 / sliderContent.length)}%)`, 
          width: `${sliderContent.length * 100}%` 
        }}
        >
          {sliderContent.map((item, id) => (
            <div key={id} className="w-full flex-shrink-0 relative" style={{ width: `${100 / sliderContent.length}%` }}>
              <img alt="slide" src={item.image} className="w-full h-[700px] md:h-[570px] sm:h-[600px] object-cover rounded-none" />

              <div className="absolute top-[20%] left-10 text-white pl-24 pr-40">
                <h1 className="lg:text-7xl text-5xl font-bold mb-4 w-1/2">{item.title}</h1>
                <p className="lg:text-xl text-sm w-1/2">{item.slug}</p>
                <div className="mt-6">
                  <Link to='/collections/all' className="bg-white border-2 border-white text-black px-4 py-3 rounded-lg hover:bg-transparent hover:text-white transition">
                    Browse Our Catalog
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous and Next Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-10">
          <button onClick={handlePrevSlide} className="bg-white text-black px-2 py-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="lg:w-8 lg:h-6 sm:w-6 sm:h-12 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-10">
          <button onClick={handleNextSlide} className="bg-white text-black px-2 py-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="lg:w-8 lg:h-6 sm:w-6 sm:h-12 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2 relative bottom-12">
        {sliderContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCount(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              count === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
