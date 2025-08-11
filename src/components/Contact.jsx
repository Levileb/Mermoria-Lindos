import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence, useInView } from 'framer-motion'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [honeypot, setHoneypot] = useState('') // simple bot trap

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-15% 0px -15% 0px', amount: 0.3 })

  const sendEmail = (e) => {
    e.preventDefault()
    if (honeypot) return // bot detected
    setStatus('sending')
    emailjs
      .send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
      .then(() => { setStatus('sent'); setForm({ name:'', email:'', phone:'', company:'', message:'' }) })
      .catch(() => { setStatus('error') })
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 md:px-20 bg-white text-black">
      <div className="mx-auto max-w-6xl">
        <AnimatePresence initial={false}>
          {inView && (
            <motion.div
              key="contact-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-3xl bg-white/70 shadow-xl ring-1 ring-black/10 supports-[backdrop-filter]:backdrop-blur-lg"
            >
              {/* decorative glows */}
              <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative grid gap-0 md:grid-cols-2">
                {/* Left: intro and details */}
                <div className="space-y-5 p-8 text-left md:p-12">
                  <h2 className="font-primary text-3xl md:text-4xl">Let’s work together</h2>
                  <p className="max-w-md text-midGray">Tell us about your date, vision, and location. We’ll get back within 24–48 hours with availability and packages.</p>

                  <div className="my-4 h-px w-24 bg-black/10" />

                  <div className="space-y-3 text-sm">
                    <a href="mailto:hello@studio.example" className="group flex items-center justify-start gap-3 text-left">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M1.5 8.67v8.58A2.25 2.25 0 0 0 3.75 19.5h16.5A2.25 2.25 0 0 0 22.5 17.25V8.67l-8.818 5.01a3.75 3.75 0 0 1-3.364 0L1.5 8.67Z"/><path d="M22.5 6.908v-.158A2.25 2.25 0 0 0 20.25 4.5H3.75A2.25 2.25 0 0 0 1.5 6.75v.158l9.318 5.296a2.25 2.25 0 0 0 2.364 0L22.5 6.908Z"/></svg></span>
                      <span>hello@studio.example</span>
                    </a>
                    <a href="tel:+639123456789" className="group flex items-center justify-start gap-3 text-left">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1.5 4.5A3 3 0 0 1 4.5 1.5h1.372a2.25 2.25 0 0 1 2.121 1.515l.724 2.171a2.25 2.25 0 0 1-.502 2.265l-.97.97a.75.75 0 0 0-.187.74 11.28 11.28 0 0 0 6.378 6.378.75.75 0 0 0 .74-.187l.97-.97a2.25 2.25 0 0 1 2.265-.502l2.171.724A2.25 2.25 0 0 1 22.5 18.128V19.5a3 3 0 0 1-3 3h-.75C8.3 22.5 1.5 15.7 1.5 7.5v-.75Z" clipRule="evenodd"/></svg></span>
                      <span>+63 912 345 6789</span>
                    </a>
                  </div>
                </div>

                {/* Right: form */}
                <form onSubmit={sendEmail} className="relative p-8 md:p-12">
                  {/* honeypot */}
                  <input type="text" autoComplete="off" tabIndex="-1" value={honeypot} onChange={(e)=>setHoneypot(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-black/70">Name</label>
                      <input
                        className="w-full rounded-xl bg-lightGray px-3 py-3 text-black outline-none ring-1 ring-black/10 placeholder-black/40 focus:bg-white focus:ring-2 focus:ring-black/20"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-black/70">Email</label>
                      <input
                        type="email"
                        className="w-full rounded-xl bg-lightGray px-3 py-3 text-black outline-none ring-1 ring-black/10 placeholder-black/40 focus:bg-white focus:ring-2 focus:ring-black/20"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e)=>setForm({...form,email:e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-black/70">Phone</label>
                      <input
                        className="w-full rounded-xl bg-lightGray px-3 py-3 text-black outline-none ring-1 ring-black/10 placeholder-black/40 focus:bg-white focus:ring-2 focus:ring-black/20"
                        placeholder="Optional"
                        value={form.phone}
                        onChange={(e)=>setForm({...form,phone:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-black/70">Company / Event</label>
                      <input
                        className="w-full rounded-xl bg-lightGray px-3 py-3 text-black outline-none ring-1 ring-black/10 placeholder-black/40 focus:bg-white focus:ring-2 focus:ring-black/20"
                        placeholder="Optional"
                        value={form.company}
                        onChange={(e)=>setForm({...form,company:e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-sm text-black/70">Message</label>
                      <textarea
                        className="h-32 w-full resize-none rounded-xl bg-lightGray px-3 py-3 text-black outline-none ring-1 ring-black/10 placeholder-black/40 focus:bg-white focus:ring-2 focus:ring-black/20"
                        placeholder="Share your date, location, and vision…"
                        value={form.message}
                        onChange={(e)=>setForm({...form,message:e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white ring-1 ring-black/10 transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={status==='sending'}
                    >
                      {status==='sending' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                      {status==='sending' ? 'Sending…' : 'Send Message'}
                    </button>
                    {status==='sent' && <span className="text-sm text-green-600">Message sent — we’ll reply shortly.</span>}
                    {status==='error' && <span className="text-sm text-red-600">There was an error sending. Please try again.</span>}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
