import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GiftCard from '../components/GiftCard'
import { giftCards } from '../data/cardData'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const categories = ['All', 'Love','Anniversary', 'Congratulate','Celebrate', 'Birthday', 'Baby', 'Concern', 'Appreciate', 'Tribute']

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isExploded, setIsExploded] = useState(false)
  const [heartfeltMessage, setHeartfeltMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(12) // Assuming 8 cards per page for efficient bandwidth management
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')

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

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsExploded(false)
  }

  const closeModal = () => {
    setSelectedCard(null)
    setIsExploded(false)
  }

  const handleExplode = () => {
    setIsExploded(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }))
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }))
    }, 250)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const paginatedCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when category changes
  }, [selectedCategory])

  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600">
      <main className="w-full max-w-7xl p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Warm Hearts, Bright Futures</h2>
          <p className="text-gray-600 text-lg">Send love with a card and fuel education in Africa. Choose below to make a dual impact.</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {paginatedCards.map(card => (
            <div key={card.id} className="transform hover:scale-105 transition-transform duration-200" onClick={() => handleCardClick(card)}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <GiftCard card={card} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
          >
            Prev
          </button>
          <span className="mx-4">{currentPage} of {Math.ceil(filteredCards.length / cardsPerPage)}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </main>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white  rounded-lg max-w-3xl w-full m-4 relative overflow-auto"
              style={{ maxHeight: '100vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-4">
                  <motion.img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full rounded-lg shadow-lg"
                    animate={{
                      scale: isExploded ? [1, 1.2, 0.8, 1] : 1,
                      rotate: isExploded ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ cursor: 'default' }}
                    whileLoading={{ filter: "blur(5px)" }}
                    onLoad={() => {
                      // Dynamically resize the image for faster loading
                      const img = document.querySelector('motion.img');
                      if (img) {
                        img.style.width = '100%';
                        img.style.height = 'auto';
                      }
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-4">
                  <div className="mb-4">
                    <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">Send To: (name)</label>
                    <input
                      id="recipientName"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg"
                      placeholder="Recipient's Name"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="heartfeltMessage" className="block text-sm font-medium text-gray-700 mb-2">Heartfelt Message</label>
                    <textarea
                      id="heartfeltMessage"
                      value={heartfeltMessage}
                      onChange={(e) => setHeartfeltMessage(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg"
                      rows="7"
                      placeholder="Enter your heartwarming message here"
                      maxLength="140"
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {heartfeltMessage.length} / 140
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      id="senderName"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <motion.button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleExplode}
                    >
                      {isExploded ? 'Woohoo! 🎉' : 'Select This Card'}
                    </motion.button>
                  </div>
                  <Link to={`/card-preview/${selectedCard.id}`} state={{ heartfeltMessage, recipientName, senderName }}>
                      <motion.button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Share
                      </motion.button>
                    </Link>
                </div>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 z-10"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}