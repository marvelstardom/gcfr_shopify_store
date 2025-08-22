import React from 'react';
import { Mail, MapPin, Phone, } from 'lucide-react';
import { FaTiktok, FaFacebook, FaInstagram, FaInstagramSquare } from "react-icons/fa";
import { productImgs } from './productImgs';

export default function FooterLinks() {
  return (
    <div>
      <div className="bg-white text-black px-10 sm:px-10 md:px-20 py-12 mt-16 border-t border-gray-700">
      <div className='flex flex-col md:flex-row lg:flex-row lg:w-full items-start justify-start lg:justify-between lg:gap-y-0 gap-y-6'>
        {/* Logo */}
        <div className='w-full lg:w-[30%]'>
          <div className='flex items-center justify-start mb-4 gap-4'>
            <div >
              {productImgs.map((item, i) => (
                <img key={i} src={item.img2} alt="" className='w-[100px] ml-0 m-0' />
              ))}
            </div>
            <h1 className='relative uppercase font-medium text-xl sm:text-2xl top-2'>
              Golden Choice <br /> Fashion Resort
            </h1>
          </div>
          <p className='text-sm'>
            We are a modern menswear brand offering bespoke suits, kaftans & urban styles tailored for confident, stylish men.
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-nowrap gap-x-4 gap-y-6 items-start justify-start lg:justify-end w-[60%]">
          {/* Links */}
          <div className='w-full md:w-full lg:w-[15%]'>
            <h3 className="lg:text-lg font-semibold lg:mb-4 md:mb-4 mb-2">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#e3a81e] ">Home</a></li>
              <li><a href="/collections/all" className="hover:text-[#e3a81e] ">Catalog</a></li>
              <li><a href="/collections" className="hover:text-[#e3a81e] ">Collections</a></li>
              <li><a href="/policies/privacy-policy" className="hover:text-[#e3a81e] ">Privacy Policy</a></li>
              {/* <li><a href="/policies/terms-of-service" className="hover:text-[#e3a81e] ">Terms of Service</a></li> */}
              <li><a href="/contact" className="hover:text-[#e3a81e] ">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='w-full md:w-full lg:w-[30%]'>
            <h3 className="lg:text-lg font-semibold lg:mb-4 md:mb-4 mb-2">Contact</h3>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start gap-2">
                <Mail size={16} />
                <span>goldenchoicefr@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 lg:w-auto w-[300px]">
                <MapPin size={20} />
                <span className=''>United Kingdom.</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} />
                <span>07407728232</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='w-full md:w-full lg:w-[45%]'>
            <h3 className="lg:text-lg font-semibold lg:mb-4 md:mb-4 mb-2">Subscribe to Our Newsletter</h3>
            <form
              className="flex flex-row sm:flex-row items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for Subscribing!');
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-[300px] lg:w-full px-4 py-2 rounded-lg text-black focus:outline-none bg-white"
              />
              <button
                type="submit"
                className="bg-[#febc22] border border-[#febc22] hover:border hover:border-black hover:text-white text-black px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className='mt-6'>
              <div className='flex gap-3'>
                <a href="https://www.facebook.com/share/1CKnx5pwLZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a81e] text-2xl ">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/g_c_f_r?igsh=amU1OG9pMXQ5djc2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a81e] text-2xl ">
                  <FaInstagramSquare />
                </a>
                <a href="https://www.tiktok.com/@g_c_f_r?_t=ZN-8xAnFY342jO&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a81e] text-2xl ">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()} Golden Choice Fashion Resort. All rights reserved.
          <br />
          <span>
            Developed by <a href="https://stardomdigital.netlify.app/" className='text-[#db9900]'>Stardom Digital</a>
          </span>
        </div>
      </div>
    </div>
  );
}
