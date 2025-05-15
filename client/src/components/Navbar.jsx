import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Send, MessageSquare, Heart } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white border-b border-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and brand name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-extralight text-teal-600 hover:text-teal-700 transition-colors">
              <Heart className="w-5 h-5" />
              <span>Whispr</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/submit"
              className="group flex items-center px-4 py-2 rounded-full text-sm font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span>Write a Message</span>
            </Link>
            <Link
              to="/allmessage"
              className="group flex items-center px-4 py-2 rounded-full text-sm font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span>View Messages</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50/50 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                to="/submit"
                className="flex items-center px-4 py-3 rounded-lg text-sm font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-3" />
                Write a Message
              </Link>
              <Link
            to="/allmessage"
                className="flex items-center px-4 py-3 rounded-lg text-sm font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                View Messages
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar