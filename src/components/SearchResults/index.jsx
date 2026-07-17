import React from 'react'

export const SearchResults = ({ results, onSelect, type }) => {
  if (!results || results.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Available {type}s</h3>
      {results.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-bold text-gray-800">{item.name || item.title}</h4>
              <p className="text-gray-600 mt-1">{item.from || item.city} → {item.to}</p>
              <p className="text-gray-500 text-sm mt-1">{item.time} • {item.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">₹{item.price}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default SearchResults