import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = {
  weddings: {
    title: 'Weddings',
    sources: [
      '/images/gallery-weddings-1.jpg',
      '/images/gallery-weddings-2.jpg',
      '/images/gallery-weddings-3.jpg',
      '/images/gallery-weddings-4.jpg',
      '/images/gallery-weddings-5.jpg',
    ],
  },
  graduation: {
    title: 'Graduation',
    sources: [
      '/images/gallery-graduation-1.jpg',
      '/images/gallery-graduation-2.jpg',
      '/images/gallery-graduation-3.jpg',
      '/images/gallery-graduation-4.jpg',
    ],
  },
  birthday: {
    title: 'Birthday',
    sources: [
      '/images/gallery-birthday-1.jpg',
      '/images/gallery-birthday-2.jpg',
      '/images/gallery-birthday-3.jpg',
      '/images/gallery-birthday-4.jpg',
    ],
  },
  other: {
    title: 'Other',
    sources: [
      '/images/gallery-other-1.jpg',
      '/images/gallery-other-2.jpg',
      '/images/gallery-other-3.jpg',
      '/images/gallery-other-4.jpg',
    ],
  },
}

function rand(min, max) { return Math.random() * (max - min) + min }
function randInt(min, max) { return Math.floor(rand(min, max)) }

function buildRows(srcs, totalRows = 10) {
  const rows = []
  let imgIdx = 0
  for (let r = 0; r < totalRows; r++) {
    const cols = r === 0 ? 3 : r === 1 ? 2 : randInt(1, 4) // 1..3
    const weights = Array.from({ length: cols }, () => rand(1, 2))
    const items = Array.from({ length: cols }).map((_, i) => {
      const src = srcs[imgIdx % srcs.length]
      imgIdx++
      return {
        id: `${r}-${i}-${imgIdx}`,
        src,
        weight: weights[i],
        h: Math.round(rand(220, 360)),
        rot: rand(-2.5, 2.5),
      }
    })
    rows.push({ id: r, items })
  }
  return rows
}

export default function Gallery(){
  const [serviceId, setServiceId] = useState('')
  const [zoomSrc, setZoomSrc] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    const s = params.get('service') || 'weddings'
    setServiceId(s)
  }, [])

  const gallery = SERVICES[serviceId] || SERVICES.weddings
  const rows = useMemo(() => buildRows(gallery.sources), [gallery])

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.hash = 'services'
    }
  }

  return (
    <section className="min-h-screen bg-white py-16">
      <motion.header
        className="mx-auto mb-8 flex max-w-6xl items-center justify-between px-6 md:px-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <div>
          <h1 className="font-primary text-3xl md:text-4xl">{gallery.title}</h1>
          <p className="text-midGray">Curated samples in an adaptive, row-based collage. Click any image to enlarge.</p>
        </div>
        <button onClick={goBack} className="rounded-lg border border-black/10 px-4 py-2 text-sm hover:bg-black/5">← Back</button>
      </motion.header>

      <div className="mx-auto max-w-6xl px-6 md:px-16">
        {rows.map((row) => (
          <motion.div
            key={row.id}
            className="mb-6 flex items-end gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {row.items.map((it) => (
              <button
                key={it.id}
                onClick={() => setZoomSrc(it.src)}
                className="group relative block shrink-0 overflow-hidden rounded-2xl shadow ring-1 ring-black/10 focus:outline-none"
                style={{ flex: it.weight, height: it.h, transform: `rotate(${it.rot}deg)` }}
                title="View larger"
              >
                <img
                  src={it.src}
                  alt="gallery"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10" />
              </button>
            ))}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={() => setZoomSrc('')}
          >
            <motion.img
              key={zoomSrc}
              src={zoomSrc}
              alt="zoom"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
