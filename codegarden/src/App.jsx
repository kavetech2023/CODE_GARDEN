import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CardPreviewPage from './pages/CardPreviewPage'
import AboutPage from '../pages/AboutPage'
import SupportUsPage from '../pages/SupportUsPage'
import Navbar from '../components/Navbar'

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card-preview/:id" element={<CardPreviewPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support-us" element={<SupportUsPage />} />
        </Routes>
      </div>
    </Router>
  )
}