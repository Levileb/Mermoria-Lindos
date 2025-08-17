import React, { useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

// Optional: use your own local image links placed under public/images. If empty, defaults below are used.
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
const USER_IMAGE_LINKS = shuffle([
  // Birthday
  '/images/birthday/services-birthday-1.jpg',
  '/images/birthday/services-birthday-2.jpg',
  '/images/birthday/services-birthday-3.jpg',
  '/images/birthday/services-birthday-4.jpg',
  '/images/birthday/services-birthday-5.jpg',
  '/images/birthday/services-birthday-6.jpeg',
  '/images/birthday/services-birthday-7.jpg',
  // Graduation
  '/images/graduation/services-graduation-1.jpg',
  '/images/graduation/services-graduation-2.jpg',
  '/images/graduation/services-graduation-3.jpg',
  '/images/graduation/services-graduation-4.jpg',
  '/images/graduation/services-graduation-5.jpg',
  '/images/graduation/services-graduation-6.jpg',
  '/images/graduation/services-graduation-7.jpg',
  '/images/graduation/services-graduation-8.jpg',
  '/images/graduation/services-graduation-9.jpg',
  '/images/graduation/services-graduation-10.jpg',
  // Wedding
  '/images/wedding/services-weddings-1.jpg',
  '/images/wedding/services-weddings-2.jpg',
  '/images/wedding/services-weddings-3.png',
  '/images/wedding/services-weddings-4.jpg',
  '/images/wedding/services-weddings-5.jpg',
  '/images/wedding/services-weddings-6.jpg',
  '/images/wedding/services-weddings-7.jpg',
  '/images/wedding/services-weddings-8.jpg',
  '/images/wedding/services-weddings-9.jpg',
])

function rand(min, max) { return Math.random() * (max - min) + min }
function randInt(min, max) { return Math.floor(rand(min, max)) }

function defaultSources() {
  return [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg',
    '/images/hero4.jpg',
    '/images/hero5.jpg',
    '/images/hero6.jpg',
    '/images/hero7.jpg',
    '/images/hero8.jpg',
    '/images/hero9.jpg',
    '/images/hero10.jpg',
  ]
}

// Responsive config (Tailwind-like breakpoints) with clamped image count [7..10]
function getResponsiveConfig(w){
  let cfg
  if (!w || w < 640) cfg = { count: 3, size: [120, 180] }     // < sm
  else if (w < 768) cfg = { count: 4, size: [140, 200] }       // sm
  else if (w < 1024) cfg = { count: 7, size: [150, 220] }      // md
  else if (w < 1280) cfg = { count: 9, size: [160, 240] }      // lg
  else if (w < 1536) cfg = { count: 10, size: [170, 260] }     // xl
  else cfg = { count: 10, size: [180, 280] }                   // 2xl+
  cfg.count = Math.max(7, Math.min(cfg.count, 10))
  return cfg
}

// Build photo data (size, rotation, etc.)
function buildPhotoMeta(count, sizeRange) {
  const [minS, maxS] = sizeRange
  const sources = (USER_IMAGE_LINKS && USER_IMAGE_LINKS.length > 0) ? USER_IMAGE_LINKS : defaultSources()
  return new Array(count).fill(0).map((_, i) => ({
    id: i,
    src: sources[i % sources.length], // local files; no cache-busting query
    size: rand(minS, maxS),
    rot: rand(-8, 8),
    delay: rand(0, 1),
    z: randInt(1, 3),
  }))
}

// Compute non-overlapping positions using simple rejection sampling
function computeLayout(width, height, photos, gap = 4, padding = 16) {
  const placed = []
  const maxTries = 1200
  for (const p of photos) {
    const w = p.size
    const h = p.size * 1.25
    let tries = 0
    let placedBox = null
    while (tries++ < maxTries) {
      const x = rand(padding, Math.max(padding, width - w - padding))
      const y = rand(padding, Math.max(padding, height - h - padding))
      const box = { x, y, w, h }
      const overlaps = placed.some(q => !(x + w + gap <= q.x || q.x + q.w + gap <= x || y + h + gap <= q.y || q.y + q.h + gap <= y))
      if (!overlaps) { placedBox = box; break }
    }
    // If not found, still push with clamped coords (rare)
    if (!placedBox) {
      placedBox = { x: padding, y: padding, w, h }
    }
    placed.push(placedBox)
  }
  return placed.map((b, i) => ({ id: photos[i].id, left: b.x, top: b.y }))
}

export default function Hero({ onExplore }){
  // mouse parallax (group-level)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 18 })
  const sy = useSpring(my, { stiffness: 70, damping: 18 })

  const { scrollY } = useScroll()

  // measure container and compute non-overlapping layout in pixels
  const sectionRef = useRef(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    function measure() {
      const r = sectionRef.current?.getBoundingClientRect()
      if (r) setDims({ w: Math.max(0, r.width), h: Math.max(0, r.height) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (sectionRef.current) ro.observe(sectionRef.current)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  // responsive config based on container width
  const [config, setConfig] = useState(getResponsiveConfig(typeof window !== 'undefined' ? window.innerWidth : 1024))
  useEffect(() => {
    setConfig(getResponsiveConfig(dims.w || (typeof window !== 'undefined' ? window.innerWidth : 1024)))
  }, [dims.w])

  const basePhotos = useMemo(() => buildPhotoMeta(config.count, config.size), [config])

  const positions = useMemo(() => {
    if (!dims.w || !dims.h) return []
    return computeLayout(dims.w, dims.h, basePhotos, 4, 24)
  }, [dims, basePhotos])

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    mx.set(Math.max(-0.5, Math.min(0.5, dx)))
    my.set(Math.max(-0.5, Math.min(0.5, dy)))
  }

  // Apply scroll + parallax to the whole collage group to keep relative positions (no inter-image overlap)
  const groupParallaxX = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const groupParallaxY = useTransform(sy, [-0.5, 0.5], [8, -8])
  const groupScrollY = useTransform(scrollY, [0, 1000], [0, -180])
  const groupY = useTransform([groupScrollY, groupParallaxY], ([gy, py]) => gy + py)

  return (
    <section ref={sectionRef} onMouseMove={handleMove} className="relative h-[160vh] overflow-hidden bg-gray-100">
      {/* Headline + CTA centered */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="px-6 text-center font-primary text-5xl tracking-tight text-black md:text-7xl">
          Memoria Lindos
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 max-w-xl px-6 text-center font-secondary text-midGray">
          A playful collage of memories drifting with your scroll.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 flex gap-3">
          <button onClick={onExplore} className="pointer-events-auto rounded-lg bg-black px-6 py-3 text-white hover:bg-black/90">Explore Services</button>
          <a href="#contact" className="pointer-events-auto rounded-lg bg-white px-6 py-3 text-black ring-1 ring-black/10 hover:bg-white/80">Contact</a>
        </motion.div>
      </div>

      {/* Collage group with non-overlapping items */}
      <motion.div style={{ x: groupParallaxX, y: groupY }} className="absolute inset-0 z-10">
        {basePhotos.map((p, i) => {
          const pos = positions[i]
          if (!pos) return null
          return (
            <motion.div
              key={p.id}
              style={{ left: pos.left, top: pos.top, rotate: p.rot, zIndex: p.z, position: 'absolute' }}
              className="pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: p.delay * 0.5 }}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10" style={{ width: p.size, height: p.size * 1.25 }}>
                <img src={p.src} alt="gallery" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-100 to-transparent" />
    </section>
  )
}
