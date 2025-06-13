import React from 'react'
// import { Disclosure } from '@headlessui/react'
// import { ChevronUpIcon } from 'lucide-react'

const faqs = [
  {
    question: 'Do you have a physical store or only an online presence?',
    answer: 'We offer both online and physical shopping experiences. Contact us to visit our store or place an order online.',
  },
  {
    question: "What types of men\'s wear do you specialize in?",
    answer: "Agbada, kaftans, suits, tuxedos",
  },
  {
    question: 'Do you offer custom-made outfits?',
    answer: 'Yes, all our outfits can be customized to your preferences, from fabric selection to design.',
  },
  {
    question: 'Can I provide my own design for you to make?',
    answer: "Yes, we accept custom designs. You can send us a picture or description, and we'll bring your vision to life.",
  },
  {
    question: 'How do I place an order?',
    answer: 'You can place an order via our website, WhatsApp, or social media. Simply send your measurements, style preference, and payment details to confirm your order.',
  },
  {
    question: 'Do you require a deposit before making an outfit?',
    answer: 'Yes, a deposit is required to confirm all custom orders. The balance is paid before delivery.',
  },
  {
    question: 'How do I provide my measurements?',
    answer: 'You can provide your measurements manually, or visit our store for professional measurement-taking. We also have a measurement guide for remote customers.',
  },
]

export default function FAQComponent() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {/* {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-base font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-700 bg-white rounded-b-lg">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))} */}
      </div>
    </div>
  )
}
