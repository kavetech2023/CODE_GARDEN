import React from 'react'

export default function AboutPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Empowering Education Through Love</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Our Mission</h2>
          <p className="text-lg mb-4 text-gray-600 leading-relaxed">
            We are on a mission to revolutionize education in Africa through the power of gift-giving and shared love. Our platform aims to raise funds, create awareness, and foster a global community dedicated to empowering the next generation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Our Values</h2>
          <ul className="grid grid-cols-2 gap-4">
            {['Compassion', 'Education', 'Community', 'Transparency'].map((value) => (
              <li key={value} className="flex items-center">
                <svg className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-blue-700">$10 Million</h3>
              <p className="text-gray-600">We aim to raise $10 million by 2025 to build schools, provide learning materials, and train teachers across Africa.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-green-700">1 Million Shares</h3>
              <p className="text-gray-600">Our goal is to have our gift cards shared 1 million times, spreading awareness and love across the globe.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Join Our Cause</h2>
          <p className="text-lg mb-4 text-gray-600 leading-relaxed">
            Every gift card you choose, every share you make, contributes to our mission. Whether it's a paid card directly funding our initiatives or a free card spreading our message, you're making a difference.
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Together, we can create lasting change and empower the next generation through education. Join us in this journey of love, giving, and transformation.
          </p>
        </section>
      </div>
    </div>
  )
}