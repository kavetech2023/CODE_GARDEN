import React from 'react'

const categories = ['All', 'Birthday', 'Wedding', 'Graduation', 'Holiday']

export default function Sidebar({ setSelectedCategory }) {
  return (
    <aside className="w-64 bg-gray-800 p-6">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category} className="mb-2">
            <button
              onClick={() => setSelectedCategory(category)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}