import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const IMAGES = [
  '/images/about1.jpg',
  '/images/about2.jpg',
  '/images/about3.jpg',
  '/images/about4.jpg',
  '/images/about5.jpg',
  '/images/about6.jpg',
  '/images/about7.jpg',
  '/images/about8.jpg',
]

export default function About(){
  const items = [...IMAGES, ...IMAGES, ...IMAGES] // triple for seamless loop
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-15% 0px -15% 0px', amount: 0.3 })

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-20 bg-white text-black">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="font-primary text-3xl md:text-4xl">About The Studio</h2>
        <p className="mt-3 text-midGray">We craft modern, editorial stories through intentional imagery. Scroll, hover, and explore the moving gallery below.</p>
      </motion.div>

      {/* Slideshow: left-to-right marquee with Ken Burns pan on each image */}
      <motion.div
        className="relative mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="group overflow-hidden">
          <ul
            className="flex w-[300%] gap-6 animate-marquee-ltr-3 group-hover:[animation-duration:18s]"
            style={{ animationPlayState: inView ? 'running' : 'paused' }}
          >
            {items.map((src, i) => (
              <li key={i} className="h-[320px] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-black/5 shadow-xl ring-1 ring-black/10">
                <img
                  src={src}
                  alt={`about-${i}`}
                  className="h-full w-full object-cover animate-kenburns hover:[animation-play-state:paused]"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center text-xs text-midGray">Hover to speed up • Hover an image to pause its pan</div>
      </motion.div>
    </section>
  )
}
