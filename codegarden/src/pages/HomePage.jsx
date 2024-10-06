import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import GiftCard from '../components/GiftCard'

const giftCards = [
  { id: 1, title: 'Birthday Wishes', category: 'Birthday', price: 0, image: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'Wedding Bells', category: 'Wedding', price: 5, image: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Graduation Cheers', category: 'Graduation', price: 0, image: '/placeholder.svg?height=200&width=300' },
  { id: 4, title: 'Holiday Greetings', category: 'Holiday', price: 3, image: '/placeholder.svg?height=200&width=300' },
  // Add more gift cards here
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCards = selectedCategory === 'All'
    ? giftCards
    : giftCards.filter(card => card.category === selectedCategory)

  return (
    <div className="flex">
      <Sidebar setSelectedCategory={setSelectedCategory} />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Share a Gift, Support Education in Africa</h2>
          <p className="text-gray-300">Choose a card below to make a difference.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map(card => (
            <GiftCard key={card.id} card={card} />
          ))}
        </div>
      </main>
    </div>
  )
}