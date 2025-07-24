import { useState } from 'react'

const faqs = [
  {
    question: 'Do you have a physical store or only an online presence?',
    answer:
      'We offer both online and physical shopping experiences. Contact us to visit our store or place an order online.',
  },
  {
    question: "What types of men's wear do you specialize in?",
    answer: 'Agbada, kaftans, suits, tuxedos',
  },
  {
    question: 'Do you offer custom-made outfits?',
    answer:
      'Yes, all our outfits can be customized to your preferences, from fabric selection to design.',
  },
  {
    question: 'Can I provide my own design for you to make?',
    answer:
      "Yes, we accept custom designs. You can send us a picture or description, and we'll bring your vision to life.",
  },
  {
    question: 'How do I place an order?',
    answer:
      'You can place an order via our website, WhatsApp, or social media. Simply send your measurements, style preference, and payment details to confirm your order.',
  },
  {
    question: 'Do you require a deposit before making an outfit?',
    answer:
      'Yes, a deposit is required to confirm all custom orders. The balance is paid before delivery.',
  },
  {
    question: 'How do I provide my measurements?',
    answer:
      'You can provide your measurements manually, or visit our store for professional measurement-taking. We also have a measurement guide for remote customers.',
  },
]

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-base font-medium bg-gray-100 hover:bg-[#ffd165] transition rounded-lg cursor-pointer"
            >
              <span>{faq.question}</span>
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-gray-700 bg-white border-t rounded-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
