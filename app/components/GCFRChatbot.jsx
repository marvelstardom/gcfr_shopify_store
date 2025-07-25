'use client';

import { useState } from 'react';
import { MailIcon, MessageSquare, Truck, HelpCircle, Home } from 'lucide-react';

const quickReplies = [
  'How long will it take to receive my order?',
  'I never got my order, what to do?',
  'Do you offer custom outfits?',
  'Can I track my order?',
  'What is your return policy?'
];

const GCFRChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { type: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { type: 'bot', text: 'Oops! Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (text) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[400px] h-[32rem] bg-gradient-to-b from-orange-300 to-[#e3a81e] text-sm shadow-2xl rounded-xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-b from-orange-400 to-[#e3a81e] text-white px-6 py-3 flex justify-between items-center">
            <div className='flex flex-col'>
                <div className="font-medium text-3xl">Hi <span className="text-2xl">😃</span></div>
                <h2 className='text-[18px]'>What are you buying today?</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg cursor-pointer">✖</button>
          </div>

          <div className="bg-white text-black px-6 py-5 space-y-4 flex flex-col flex-1 overflow-y-auto">
            <div>
              <h3 className="font-normal text-lg">Contact us</h3>
              <p className="text-green-500 text-md mb-2">● <span className='text-black'>We are online</span></p>
              <div className="flex gap-2 mt-2">
                <a href="https://api.whatsapp.com/send/?phone=2347039177508&text&type=phone_number&app_absent=0" target="_blank" className="bg-green-500 text-white px-3 py-1 rounded-full text-xs"><img src="/assets/logo/2.png" alt="" srcset="" /> WhatsApp</a>
                <a href="mailto:goldenchoicefr@gmail.com" className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs">Email</a>
              </div>
            </div>

            {/* <div className="border-t pt-2">
              <h3 className="font-semibold mb-1">Order tracking</h3>
              <p className="text-gray-500 text-xs">Track your orders</p>
            </div> */}

            {/* <div className="border-t pt-2">
              <input
                type="text"
                placeholder="Search for help"
                className="w-full p-2 border rounded-md text-xs"
              />
            </div> */}

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

          <div className="flex justify-around text-white text-sm bg-[#d09a1b] py-3">
            <div className="flex flex-col items-center cursor-pointer">
              <Home size={20} />
              <span>Home</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
              <MessageSquare size={20} />
              <span>Message</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
              <Truck size={20} />
              <span>Track</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
            <button
          onClick={() => setIsOpen(true)}
          className="bg-[#e3a81e] text-white px-3 py-3 rounded-full shadow-lg cursor-pointer transform -scale-x-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" /></svg>
        </button>
        <span className="text-green-400 text-2xl relative right-[21px] top-3">●</span>
        </div>
      )}
    </div>
  );
};

export default GCFRChatbot;

