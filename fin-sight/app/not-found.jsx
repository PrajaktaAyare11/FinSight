"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Zap, Eye, RotateCcw } from 'lucide-react'

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setIsVisible(true)
    
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4
    }))
    setParticles(newParticles)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  return (
    <div 
      className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite alternate`
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto mt-20 md:mt-29">
        {/* Glitch effect 404 */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 glitch-text">
              404
            </h1>
            {/* Glitch layers */}
            <h1 className="absolute top-0 left-0 text-8xl md:text-9xl font-black text-red-500 opacity-70 glitch-layer-1">
              404
            </h1>
            <h1 className="absolute top-0 left-0 text-8xl md:text-9xl font-black text-blue-500 opacity-70 glitch-layer-2">
              404
            </h1>
          </div>
        </div>

        {/* Animated eyes */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center gap-8 mb-6">
            <div className="relative">
              <Eye size={40} className="text-white animate-pulse" />
              <div 
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full transition-all duration-200"
                style={{
                  transform: `translate(${-50 + (mousePosition.x - 50) * 0.1}%, ${-50 + (mousePosition.y - 50) * 0.1}%)`
                }}
              />
            </div>
            <div className="relative">
              <Eye size={40} className="text-white animate-pulse" />
              <div 
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full transition-all duration-200"
                style={{
                  transform: `translate(${-50 + (mousePosition.x - 50) * 0.1}%, ${-50 + (mousePosition.y - 50) * 0.1}%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 typing-animation">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Looks like this page decided to take a vacation 🏖️<br />
            Don't worry, we're still watching over you!
          </p>
        </div>

        {/* Pulsing orb */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"/>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-30"/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Zap className="text-white animate-bounce" size={32} />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-200 flex items-center gap-2"
              >
                <Home size={20} />
                Take Me Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.history.back()}
              className="border-purple-400 text-purple-300 hover:bg-purple-800 hover:text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 hover:-rotate-3 transition-all duration-200 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
          </div>

          {/* Refresh suggestion */}
          <div className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <RotateCcw size={16} className="animate-spin" />
            Try refreshing the page, or maybe it'll magically appear! ✨
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        .glitch-text {
          animation: glitch 2s infinite;
        }
        
        .glitch-layer-1 {
          animation: glitch 2s infinite;
          animation-delay: 0.1s;
          clip-path: polygon(0 0%, 100% 0%, 100% 35%, 0 35%);
        }
        
        .glitch-layer-2 {
          animation: glitch 2s infinite;
          animation-delay: 0.2s;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .typing-animation {
          overflow: hidden;
          border-right: 3px solid;
          white-space: nowrap;
          margin: 0 auto;
          animation: typing 2s steps(40, end), blink 1s infinite;
        }
        
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>
    </div>
  )
}

export default NotFound