import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const appearVariants = {
  hidden: { opacity: 0, y: -16, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
}

function useScrollAppear(threshold = 40) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0
      setVisible(y > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return visible
}

export default function Navbar({ onNavigate }){
  const [open, setOpen] = useState(false)
  const visible = useScrollAppear(30)

  return (
    <motion.div
      className="fixed top-5 left-5 z-50"
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={appearVariants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-label="menu"
        className="p-3 bg-black text-white rounded-full shadow-lg ring-1 ring-black/10 hover:bg-black/90"
      >
        ☰
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 bg-black text-white p-5 rounded-xl w-44 shadow-2xl ring-1 ring-black/20"
          >
            <ul className="space-y-3 font-primary">
              <li><button onClick={() => { setOpen(false); onNavigate('home') }} className="hover:underline">Home</button></li>
              <li><button onClick={() => { setOpen(false); onNavigate('about') }} className="hover:underline">About</button></li>
              <li><button onClick={() => { setOpen(false); onNavigate('services') }} className="hover:underline">Services</button></li>
              <li><button onClick={() => { setOpen(false); onNavigate('contact') }} className="hover:underline">Contact</button></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
