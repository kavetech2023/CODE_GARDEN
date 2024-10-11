import React from 'react'

export default function GiftCard({ card }) {
  return (
    <div 
      onClick={() => openModal(card)}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="absolute top-2 right-2 z-10">
        <div className={`px-2 py-1 text-xs font-bold text-white rounded ${card.price === 0 ? 'bg-green-500' : 'bg-red-500'}`}>
          {card.price === 0 ? 'Free' : 'Paid'}
        </div>
      </div>
      <div className="h-full">
        <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
      </div>
    </div>
  )
}