import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin, Tiktok, } from 'lucide-react';
import { productImgs } from './productImgs';

export default function FooterLinks() {
  return (
    <div>
      <div className="bg-white text-black px-6 md:px-20 mx-0 py-12 mt-16">
        <div className="flex gap-8 items-start justify-start">
          {/* Logo */}
          <div className='w-[40%] relative'>
            <div className='flex items-center justify-start mb-4 ml-0 pl-0 gap-4'>
              <h1>{
              productImgs.map((item, i) => (
                  <img key={i} src={item.img2} alt="" className='w-[120px] ml-0 mr-2 pl-0' />
                ))
              }</h1>
              <h1 className='uppercase font-medium text-2xl'>Golden Choice <br /> Fashion Resort</h1>
            </div>
            <p>We are a modern menswear brand offering bespoke suits, <br /> kaftans & urban styles tailored for confident, stylish men.</p>
          </div>

          {/* Links */}
          <div className='w-[10%]'>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#e3a81e] hover:underline">Home</a></li>
              <li><a href="/collections/all" className="hover:text-[#e3a81e] hover:underline">Catalog</a></li>
              <li><a href="/collections" className="hover:text-[#e3a81e] hover:underline">Collections</a></li>
              <li><a href="/policies/privacy-policy" className="hover:text-[#e3a81e] hover:underline">Privacy Policy</a></li>
              <li><a href="/policies/terms-of-service" className="hover:text-[#e3a81e] hover:underline">Terms of Service</a></li>
              <li><a href="/contact" className="hover:text-[#e3a81e] hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='w-[20%]'>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start gap-2">
                <Mail size={16} />
                <span>goldenchoicefr@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={20} />
                <span>200 Commercial Road, Byker, Newcastle upon Tyne, NE6 2ED, United Kingdom.</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} />
                <span>07407728232</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='w-[30%]'>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <form
              className="flex flex-col sm:flex-row items-center justify-center gap-1"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle your newsletter integration here (e.g., Formspree or custom API)
                alert('Subscribed!');
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 m-0 rounded-lg text-black focus:outline-none bg-white"
              />
              <button
                type="submit"
                className="bg-[#febc22] border border-[#febc22] cursor-pointer text-black px-4 py-2 mt-0 rounded-lg hover:bg-gray-200 ease-in-out duration-700 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Social */}
          <div className='mt-6'>
            {/* <h3 className="text-lg font-semibold mb-4">Socials</h3> */}
            <div className='flex gap-3'>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black hover:text-[#e3a81e] text-md"
              >
                <Facebook size={30} />
              </a>
              <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-[#e3a81e] text-md"
            >
              <Instagram size={30} />
            </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black hover:text-[#e3a81e] text-md"
              >
                <Linkedin size={30} />
              </a>
            </div>
          </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-black text-center">
          &copy; {new Date().getFullYear()} Golden Choice Fashion Resort. All rights reserved.
        </div>
      </div>
     
    </div>
  );
}
