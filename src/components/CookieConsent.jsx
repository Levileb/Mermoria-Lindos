import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CookieConsent(){
  const [visible, setVisible] = useState(false)
  useEffect(()=>{ if(!localStorage.getItem('cookies-accepted')) setVisible(true) },[])
  const accept = ()=>{ localStorage.setItem('cookies-accepted','1'); setVisible(false) }
  if(!visible) return null
  return (
    <motion.div initial={{ y:40 }} animate={{ y:0 }} className="fixed left-6 right-6 bottom-6 bg-white text-black p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
      <div>
        <div className="font-semibold">We use cookies</div>
        <div className="text-sm text-midGray">We use cookies to improve site experience. By continuing you accept our cookie policy.</div>
      </div>
      <div className="flex gap-3">
        <button onClick={()=>setVisible(false)} className="px-4 py-2">Decline</button>
        <button onClick={accept} className="px-4 py-2 bg-dark text-white rounded">Accept</button>
      </div>
    </motion.div>
  )
}
