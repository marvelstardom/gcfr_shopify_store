import React from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import { Footer } from '~/components/Footer';
import FooterLinks from '~/components/FooterLinks';

export default function Contact() {
  return (
    <div className="w-full mt-32">
      {/* Hero Banner */}
      <section className="contact-img relative md:h-72 h-96 bg-cover bg-top flex items-center justify-center text-white rounded-none">
        <h1 className="relative lg:text-6xl text-4xl text-[#febc22] font-bold z-10">Contact Us</h1>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row px-12 md:px-20 lg:pl-24 py-24 mt-6 gap-16 bg-white">
        {/* Map */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2290.0924915230967!2d-1.5752516236452552!3d54.97147715189951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e708c9924af3f%3A0x495a4a041a9469fc!2s200%20Commercial%20Rd%2C%20Byker%2C%20Newcastle%20upon%20Tyne%20NE6%202ED%2C%20UK!5e0!3m2!1sen!2sng!4v1748608202012!5m2!1sen!2sng"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 rounded-2xl"
            title="Golden Choice Fashion Map"
          ></iframe>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 space-y-4 lg:pr-20 px-12">
          <h2 className="lg:text-4xl text-2xl font-normal mt-4">Questions or Comments? Get in touch and we'll be glad to help!</h2>
          <form className="space-y-4 mt-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="lg:w-[600px] w-full border rounded-lg px-4 py-2"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="text"
                className="lg:w-[600px] w-full border rounded-lg px-4 py-2"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                className="lg:w-[600px] w-full border rounded-lg px-4 py-2 h-32"
                placeholder="Leave a message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black lg:w-[600px] w-full text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
            Submit
            </button>
        </form>

          {/* Contact Info */}
        <div className="pt-6 border-t text-sm text-gray-700 space-y-1">
            <h2 className='text-2xl font-normal'>Contact Information</h2>
            <div className="mt-5 flex flex-col lg:flex-row gap-2">
                <div className='flex flex-col gap-1 lg:border-r lg:w-1/2'>
                    <div className='mb-2 pb-2 border-b'>
                        <p className='font-medium uppercase'>Phone</p> 
                        <p className='text-xl'>+234 703 917 7508</p>
                    </div>
                    <div className='border-b lg:border-none mb-2 pb-2 lg:mb-0 lg:pb-0'>
                      <p className='font-medium uppercase'>Email</p> 
                      <p className='text-xl'>goldenchoicefr@gmail.com</p>
                    </div>
                </div>
                <div className='lg:w-1/2 lg:pl-4'>
                  <p className='font-medium uppercase'>Address</p> 
                  <p className='text-xl'>United Kingdom.</p>
                </div>
            </div>
        </div>
        </div>
      </section>

      {/* <Footer /> */}
      <FooterLinks />
    </div>
  );
}
