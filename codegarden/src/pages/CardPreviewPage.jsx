import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaEnvelope, FaLink, FaWhatsapp, FaSms } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useParams, useLocation } from 'react-router-dom';
import giftBox from '../assets/box/gift-box.svg';

// Assuming you have a giftCards array defined somewhere in your project
import { giftCards } from '../data/cardData';

export default function CardPreviewPage() {
  const { id } = useParams();
  const location = useLocation();
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [heartfeltMessage, setHeartfeltMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');

  const card = giftCards.find(c => c.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const searchParams = new URLSearchParams(location.search);
    const encodedMessage = searchParams.get('m');
    const encodedRecipientName = searchParams.get('r');
    const encodedSenderName = searchParams.get('s');
    if (encodedMessage) {
      setHeartfeltMessage(atob(encodedMessage));
    } else if (location.state?.heartfeltMessage) {
      setHeartfeltMessage(location.state.heartfeltMessage);
    }
    if (encodedRecipientName) {
      setRecipientName(atob(encodedRecipientName));
    } else if (location.state?.recipientName) {
      setRecipientName(location.state.recipientName);
    }
    if (encodedSenderName) {
      setSenderName(atob(encodedSenderName));
    } else if (location.state?.senderName) {
      setSenderName(location.state.senderName);
    }

    // Automatically trigger the card opening and confetti animation
    setTimeout(() => {
      setIsBoxVisible(false);
      triggerConfetti();
      setIsExploded(true);
    }, 1000);
  }, [location]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);
  };

  const getShareUrl = () => {
    const encodedMessage = btoa(heartfeltMessage);
    const encodedRecipientName = btoa(recipientName);
    const encodedSenderName = btoa(senderName);
    return `${window.location.origin}/card-preview/${id}?m=${encodedMessage}&r=${encodedRecipientName}&s=${encodedSenderName}`;
  };

  const handleShare = (platform) => {
    const shareUrl = getShareUrl();
    const shareText = `Hey ${recipientName}: check out this amazing surprise I have for you!`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Share link copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'sms':
        window.location.href = `sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        console.error('Unknown share platform');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="flex space-x-4 mb-6">
        <button onClick={() => handleShare('facebook')} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaFacebook size={24} />
        </button>
        <button onClick={() => handleShare('twitter')} className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaTwitter size={24} />
        </button>
        <button onClick={() => handleShare('email')} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaEnvelope size={24} />
        </button>
        <button onClick={() => handleShare('copy')} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaLink size={24} />
        </button>
        <button onClick={() => handleShare('whatsapp')} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaWhatsapp size={24} />
        </button>
        <button onClick={() => handleShare('sms')} className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full transition-transform hover:scale-110">
          <FaSms size={24} />
        </button>
      </div>

      <div className="relative w-full max-w-4xl">
        <AnimatePresence>
          {isBoxVisible && (
            <motion.div
              className="w-full h-64 md:h-96 flex items-center justify-center"
              initial={false}
              animate={isExploded ? { scale: 0, opacity: 0 } : { scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={giftBox}
                alt="Gift Box"
                className="w-full h-full max-w-xs"
                animate={{ 
                  rotate: isExploded ? '0deg' : [ '-10deg', '10deg', '-10deg', '10deg', '-10deg' ], 
                  scale: isExploded ? 1 : [ 0.95, 1.05, 0.95, 1.05, 0.95 ] 
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExploded && (
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: isBoxVisible ? -30 : 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex transform w-full max-w-4xl h-auto"
            >
              <div className="w-full h-full bg-white shadow-2xl overflow-hidden rounded-lg flex flex-col md:flex-row">
                <motion.div
                  className="w-full md:w-1/2 h-full md:h-full relative "
                  animate={{
                    scale: isExploded ? [1, 1.2, 0.8, 1] : 1,
                    rotate: isExploded ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                    style={{ imageRendering: 'auto' }}
                  />
                 
                </motion.div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="text-center space-y-4">
                    {recipientName && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-purple-800 font-serif"
                      >
                        To: {recipientName}
                      </motion.p>
                    )}
                    {heartfeltMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-pink-700 italic font-light"
                      >
                        "{heartfeltMessage}"
                      </motion.p>
                    )}
                    {senderName && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl font-semibold text-purple-800 font-serif"
                      >
                        From: {senderName}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
           
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}