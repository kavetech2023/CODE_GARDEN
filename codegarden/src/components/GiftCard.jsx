import React from 'react'

export default function GiftCard({ card }) {
  return (
    <div 
      onClick={() => openModal(card)}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="h-full relative">
        <img src={card.image} alt={card.title} className="w-full h-full object-contain" /> 
      </div>
    </div>
  )
}