import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
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
  }, []);

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
          <div className="flex flex-col items-center justify-center p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <motion.div
                  className="rounded-2xl shadow-lg overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/hero-image.jpg"
                    alt="Children in a classroom"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700" style={{ fontFamily: 'serif' }}>
                  About Our Mission
                </h3>
                <p className="text-gray-600 mb-4">We're on a mission to revolutionize education in Africa through the power of digital gift-giving. Our platform raises funds, creates awareness, and fosters a global community dedicated to empowering the next generation.</p>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700" style={{ fontFamily: 'serif' }}>
                    Join Our Cause
                  </p>
                  <p className="text-gray-600 mt-2">
                    Every gift card you choose, every share you make, contributes to our mission. Whether it's a paid card directly funding our initiatives or a free card spreading our message, you're making a difference.
                  </p>
                  <div className="mt-6">
                    <a href="/" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                      Choose a Card
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}