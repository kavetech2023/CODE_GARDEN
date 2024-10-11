import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { giftCards } from '../data/cardData';
import { FaFacebook, FaTwitter, FaEnvelope, FaLink, FaWhatsapp, FaSms } from 'react-icons/fa';

export default function CardPreviewPage() {
  const { id } = useParams();
  const location = useLocation();
  const card = giftCards.find(c => c.id === parseInt(id));
  const [isExploded, setIsExploded] = useState(false);
  const [heartfeltMessage, setHeartfeltMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse the URL for the encoded heartfelt message, recipientName, and senderName
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

    // Automatically trigger confetti explosion
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

    return () => clearInterval(interval);
  }, [location]);

  const getShareUrl = () => {
    const encodedMessage = btoa(heartfeltMessage);
    const encodedRecipientName = btoa(recipientName);
    const encodedSenderName = btoa(senderName);
    return `${window.location.origin}/card-preview/${id}?m=${encodedMessage}&r=${encodedRecipientName}&s=${encodedSenderName}`;
  };

  const handleShare = (platform) => {
    const shareUrl = getShareUrl();
    const shareText = `Hey ${recipientName}: check out this amazing suprise i have for you for your   ${card.category}`;
    const imageUrl = encodeURIComponent(card.image);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&picture=${imageUrl}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&media=${imageUrl}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareUrl}\n\nCheck out the card image: ${card.image}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareUrl}\n\nCheck out the card image: <img src='${card.image}'>`).then(() => {
          alert('Share link and image URL copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'sms':
        window.location.href = `sms:?body=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        console.error('Unknown share platform');
    }
  };

  if (!card) return <div>Card not found</div>;

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-4">
      <main className="w-full max-w-4xl">
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <motion.img
                src={card.image}
                alt={card.title}
                className="w-full rounded-lg shadow-lg"
                animate={{
                  scale: isExploded ? [1, 1.2, 0.8, 1] : 1,
                  rotate: isExploded ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="md:w-1/2 p-4">
           
              
              {recipientName && (
                <p className="text-xl italic text-yellow-600 mb-5">to: {recipientName}</p>
              )}
              {heartfeltMessage && (
                <div className="mb-4">
                  <p className="text-xl italic text-yellow-600">
                    "{heartfeltMessage}"
                  </p>
                </div>
              )}
              {senderName && (
                <p className="text-xl italic text-yellow-600 mb-5">from: {senderName}</p>
              )}
              <div className="flex space-x-4">
                <motion.button
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('facebook')}
                >
                  <FaFacebook size={20} />
                </motion.button>
                <motion.button
                  className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('twitter')}
                >
                  <FaTwitter size={20} />
                </motion.button>
                <motion.button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('email')}
                >
                  <FaEnvelope size={20} />
                </motion.button>
                <motion.button
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('copy')}
                >
                  <FaLink size={20} />
                </motion.button>
                <motion.button
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('whatsapp')}
                >
                  <FaWhatsapp size={20} />
                </motion.button>
                <motion.button
                  className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('sms')}
                >
                  <FaSms size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}