import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaFacebook, FaTwitter } from 'react-icons/fa'

export default function GiftCard({ card }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{card.title}</h3>
        <p className="text-gray-600 mb-4">
          {card.price === 0 ? 'Free' : `$${card.price.toFixed(2)}`}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/preview/${card.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Preview
          </Link>
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-gray-800">
              <FaEnvelope />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FaFacebook />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FaTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}