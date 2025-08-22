'use client';

import { useState } from 'react';
import { MailIcon, MessageSquare, Truck, HelpCircle, Home } from 'lucide-react';
import { IoLogoWhatsapp, IoIosArrowDropdownCircle } from "react-icons/io";
import { MdEmail } from "react-icons/md";

// FAQ database
const faqList = [
  { q: "what is gcfr", a: "GCFR is an urban and bespoke fashion brand specializing in men's wear, including three-piece suits, senator wear, kaftans, agbadas, pant trousers, shirts, tuxedos, mafia suits, and more." },
  { q: "do you have a physical store", a: "We offer both online and physical shopping experiences. Contact us to visit our store or place an order online." },
  { q: "how can i contact gcfr", a: "You can reach us via WhatsApp or phone call via +234 703 917 7508, our social media pages, or email via goldenchoicefr@gmail.com." },
  { q: "working hours", a: "Our working hours are between 8am - 8pm everyday. We also take online inquiries 24/7." },
  { q: "what types of men's wear", a: "We create high-quality men’s wear, including three-piece suits, senator wear, kaftans, agbada, pant trousers, shirts, tuxedos, mafia suits and more." },
  { q: "custom outfit", a: "Yes, all our outfits can be customized to your preferences, from fabric selection to design." },
  { q: "provide my own design", a: "Yes, we accept custom designs. You can send us a picture or description, and we'll bring your vision to life." },
  { q: "place an order", a: "You can place an order via our website, WhatsApp, or social media. Simply send your measurements, style preference, and payment details to confirm your order." },
  { q: "deposit", a: "Yes, a deposit is required to confirm all custom orders. The balance is paid before delivery." },
  { q: "provide my measurements", a: "You can provide your measurements manually, or visit our store for professional measurement-taking. We also have a measurement guide for remote customers." },
  { q: "outfit doesn’t fit", a: "Yes, we offer free minor adjustments. Major alterations may incur additional charges." },
  { q: "standard sizes", a: "Yes, we have standard size options for customers who prefer them." },
  { q: "nationwide and international delivery", a: "Yes, we deliver across Nigeria and internationally. Shipping fees apply based on location." },
  { q: "how long does it take", a: "Our standard production time is one week, plus delivery time. Express options are available upon request." },
  { q: "delivery charges", a: "Delivery charges depend on your location. Contact us for a shipping quote." },
  { q: "track my order", a: "Yes, we provide tracking details for shipped orders." },
  { q: "return and refund policy", a: "SALES ITEMS ARE ONLY ELIGIBLE FOR STORE CREDIT OR EXCHANGE, THEY ARE ALL NON-REFUNDABLE." },
  { q: "exchange", a: "Exchanges are only allowed for ready-made outfits within 2 weeks. Custom outfits cannot be exchanged." },
  { q: "damaged or incorrect order", a: "If you receive a damaged or incorrect outfit, please contact us within 24 hours for a resolution." },
  { q: "free shipping", a: "Yes! We offer free shipping on orders above $200." }
];

const quickReplies = [
  'How long does it take to receive my order?',
  'Do you offer custom outfits?',
  'What is your return and refund policy?'
];

const GCFRChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ type: "bot", text: "Hello, I'm GCFR's assistant. How can I help you?" }]);

  // Simple FAQ matching
  const getFAQAnswer = (userMsg) => {
    const msg = userMsg.toLowerCase();
    const found = faqList.find(f => msg.includes(f.q));
    return found ? found.a : "Sorry, I don’t have an exact answer for that. Please contact us on WhatsApp or Email for more help.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    // Check FAQ list
    const reply = getFAQAnswer(userMessage);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
      setLoading(false);
    }, 800);
  };

  const handleQuickReply = (text) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[400px] h-[32rem] flex flex-col justify-end items-end gap-2">
          <div className='bg-gradient-to-b from-orange-300 to-[#e3a81e] text-sm shadow-2xl rounded-xl flex flex-col overflow-hidden'>
            <div className="bg-gradient-to-b from-orange-400 to-[#e3a81e] text-white px-6 py-3 flex justify-between items-center">
              <div className='flex flex-col'>
                <div className="font-medium text-3xl">Hi <span className="text-2xl">😃</span></div>
                <h2 className='text-[18px]'>What are you buying today?</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg cursor-pointer">✖</button>
            </div>

            {/* Chat Area */}
            <div className="bg-white text-black px-6 py-5 space-y-4 flex flex-col flex-1 overflow-y-auto">
              {/* Whatsapp & Email */}
              <div>
                <h3 className="font-normal text-lg">Contact us</h3>
                <p className="text-green-500 text-md mb-2">● <span className='text-black'>We are online</span></p>
                <div className="flex gap-4 mt-2 items-center">
                  <a href="https://api.whatsapp.com/send/?phone=2347039177508&text&type=phone_number&app_absent=0" target="_blank" className="text-green-500 text-3xl rounded-full"><IoLogoWhatsapp /></a>
                  <a href="mailto:goldenchoicefr@gmail.com" className="text-yellow-400 text-3xl rounded-full"><MdEmail /></a>
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-md max-w-[80%] ${msg.type === 'user' ? 'bg-yellow-100 self-end' : 'bg-gray-100 self-start text-[16px]'}`}>
                  {msg.text}
                </div>
              ))}

              {loading && <p className="text-gray-400 text-xs">Typing...</p>}

              {/* Quick Replies */}
              <div className="space-y-1">
                {quickReplies.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(text)}
                    className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex border-t py-3 px-5 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 text-xs border rounded-l-lg outline-none"
                placeholder="Ask a question"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-[#d09a1b] text-white border border-[#d09a1b] px-4 rounded-r-lg text-md cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>

          {/* Footer */}
          <div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#e3a81e] bg-white text-6xl border-none p-0 m-0 rounded-full cursor-pointer"
            >
              <IoIosArrowDropdownCircle />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#e3a81e] text-white px-3 py-3 rounded-full shadow-lg cursor-pointer transform -scale-x-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-12"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" /></svg>
          </button>
          <span className="text-green-400 text-2xl relative right-[21px] top-3">●</span>
        </div>
      )}
    </div>
  );
};

export default GCFRChatbot;


// 'use client';

// import { useState } from 'react';
// import { MailIcon, MessageSquare, Truck, HelpCircle, Home } from 'lucide-react';
// import { IoLogoWhatsapp } from "react-icons/io";
// import { MdEmail } from "react-icons/md";

// const quickReplies = [
//   'How long will it take to receive my order?',
//   'Do you offer custom outfits?',
//   'What is your return policy?'
// ];

// const GCFRChatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage })
//       });
//       const data = await response.json();
//       setMessages((prev) => [...prev, { type: 'bot', text: data.reply }]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { type: 'bot', text: 'Oops! Something went wrong. Please try again.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuickReply = (text) => {
//     setInput(text);
//     setTimeout(() => handleSend(), 100);
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {isOpen ? (
//         <div className="w-[400px] h-[32rem] bg-gradient-to-b from-orange-300 to-[#e3a81e] text-sm shadow-2xl rounded-xl flex flex-col overflow-hidden">
//           <div className="bg-gradient-to-b from-orange-400 to-[#e3a81e] text-white px-6 py-3 flex justify-between items-center">
//             <div className='flex flex-col'>
//                 <div className="font-medium text-3xl">Hi <span className="text-2xl">😃</span></div>
//                 <h2 className='text-[18px]'>What are you buying today?</h2>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg cursor-pointer">✖</button>
//           </div>

//           <div className="bg-white text-black px-6 py-5 space-y-4 flex flex-col flex-1 overflow-y-auto">
//             <div>
//               <h3 className="font-normal text-lg">Contact us</h3>
//               <p className="text-green-500 text-md mb-2">● <span className='text-black'>We are online</span></p>
//               <div className="flex gap-4 mt-2 items-center">
//                 <a href="https://api.whatsapp.com/send/?phone=2347039177508&text&type=phone_number&app_absent=0" target="_blank" className="text-green-500 text-3xl rounded-full"><IoLogoWhatsapp /></a>
//                 <a href="mailto:goldenchoicefr@gmail.com" className="text-yellow-400 text-3xl rounded-full"><MdEmail /></a>
//               </div>
//             </div>

//             {/* <div className="border-t pt-2">
//               <h3 className="font-semibold mb-1">Order tracking</h3>
//               <p className="text-gray-500 text-xs">Track your orders</p>
//             </div> */}

//             {/* <div className="border-t pt-2">
//               <input
//                 type="text"
//                 placeholder="Search for help"
//                 className="w-full p-2 border rounded-md text-xs"
//               />
//             </div> */}

//             <div className="space-y-1">
//               {quickReplies.map((text, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleQuickReply(text)}
//                   className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
//                 >
//                   {text}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex border-t py-3 px-5 bg-white">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               className="flex-1 p-2 text-xs border rounded-l-lg outline-none"
//               placeholder="Ask a question"
//             />
//             <button
//               onClick={handleSend}
//               disabled={loading}
//               className="bg-[#d09a1b] text-white border border-[#d09a1b] px-4 rounded-r-lg text-md cursor-pointer"
//             >
//               Send
//             </button>
//           </div>

//           <div className="flex justify-around text-white text-sm bg-[#d09a1b] py-3">
//             <div className="flex flex-col items-center cursor-pointer">
//               <Home size={20} />
//               <span>Home</span>
//             </div>
//             <div className="flex flex-col items-center cursor-pointer">
//               <MessageSquare size={20} />
//               <span>Message</span>
//             </div>
//             <div className="flex flex-col items-center cursor-pointer">
//               <Truck size={20} />
//               <span>Track</span>
//             </div>
//             <div className="flex flex-col items-center cursor-pointer">
//               <HelpCircle size={20} />
//               <span>Help</span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//             <button
//           onClick={() => setIsOpen(true)}
//           className="bg-[#e3a81e] text-white px-3 py-3 rounded-full shadow-lg cursor-pointer transform -scale-x-100"
//         >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" /></svg>
//         </button>
//         <span className="text-green-400 text-2xl relative right-[21px] top-3">●</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GCFRChatbot;

