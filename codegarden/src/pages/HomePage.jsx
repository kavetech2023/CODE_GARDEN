import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GiftCard from '../components/GiftCard'

const giftCards = [
  { id: 1, title: 'Birthday Wishes', category: 'Birthday', price: 0, image: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'Wedding Bells', category: 'Wedding', price: 5, image: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Graduation Cheers', category: 'Graduation', price: 0, image: '/placeholder.svg?height=200&width=300' },
  { id: 4, title: 'Holiday Greetings', category: 'Holiday', price: 3, image: '/placeholder.svg?height=200&width=300' },
  // Add more gift cards here
]

const categories = ['All', 'Birthday', 'Wedding', 'Graduation', 'Holiday']

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredCards = selectedCategory === 'All'
    ? giftCards
    : giftCards.filter(card => card.category === selectedCategory)

  return (
    <div className="flex justify-center">
      <main className="w-full max-w-7xl p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Share a Gift, Support Education in Africa</h2>
          <p className="text-gray-600 text-lg">Choose a card below to make a difference.</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              #{category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCards.map(card => (
            <div key={card.id} className="transform hover:scale-105 transition-transform duration-200">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <GiftCard card={card} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}