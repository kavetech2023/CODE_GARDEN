import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const giftCards = [
  { id: 1, title: 'Birthday Wishes', category: 'Birthday', price: 0, image: '/placeholder.svg?height=400&width=600' },
  { id: 2, title: 'Wedding Bells', category: 'Wedding', price: 5, image: '/placeholder.svg?height=400&width=600' },
  // Add more gift cards here
]

export default function CardPreviewPage() {
  const { id } = useParams()
  const card = giftCards.find(c => c.id === parseInt(id))
  const [scheduledDate, setScheduledDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle scheduling logic here
    alert(`Card scheduled for ${scheduledDate}`)
  }

  if (!card) return <div>Card not found</div>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">{card.title} Preview</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img src={card.image} alt={card.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Schedule This Card</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Select Date to Send
              </label>
              <input
                type="date"
                id="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Schedule Card
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}