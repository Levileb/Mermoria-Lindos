import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
const IMAGES = shuffle([
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
