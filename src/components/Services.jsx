import React from 'react'
import { motion } from 'framer-motion'

function shuffle(array) {
	let currentIndex = array.length, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

const SERVICE_DATA = [
	{
		id: 'weddings',
		title: 'Weddings',
		sample: shuffle([
			'/images/wedding/services-weddings-1.jpg',
			'/images/wedding/services-weddings-2.jpg',
			'/images/wedding/services-weddings-3.png',
			'/images/wedding/services-weddings-4.jpg',
			'/images/wedding/services-weddings-5.jpg',
			'/images/wedding/services-weddings-6.jpg',
			'/images/wedding/services-weddings-7.jpg',
			'/images/wedding/services-weddings-8.jpg',
			'/images/wedding/services-weddings-9.jpg',
		]),
	},
	{
		id: 'graduation',
		title: 'Graduation',
		sample: shuffle([
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
		]),
	},
	{
		id: 'birthday',
		title: 'Birthday',
		sample: shuffle([
			'/images/birthday/services-birthday-1.jpg',
			'/images/birthday/services-birthday-2.jpg',
			'/images/birthday/services-birthday-3.jpg',
			'/images/birthday/services-birthday-4.jpg',
			'/images/birthday/services-birthday-5.jpg',
			'/images/birthday/services-birthday-6.jpeg',
			'/images/birthday/services-birthday-7.jpg',
		]),
	},
	{
		id: 'other',
		title: 'Other',
		sample: [], // No images in /other
	},
]

const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08 } },
}
const item = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function Services() {
	return (
		<section id="services" className="py-20 px-6 md:px-20 bg-white text-black">
			<div className="mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false, margin: '-80px' }}
					transition={{ duration: 0.4 }}
					className="flex flex-col items-center gap-2 md:flex-row md:items-end md:justify-between"
				>
					<div>
						<h2 className="text-3xl md:text-4xl font-primary">Services</h2>
						<p className="text-midGray">
							Explore categories — open a full gallery for each.
						</p>
					</div>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, margin: '-80px' }}
					className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
				>
					{SERVICE_DATA.map((s) => (
						<motion.a
							key={s.id}
							variants={item}
							href={`#gallery?service=${s.id}`}
							title={`Open ${s.title} gallery`}
							className="group relative block overflow-hidden rounded-3xl bg-white/80 shadow-md ring-1 ring-black/10 transition-all hover:-translate-y-1.5 hover:shadow-2xl supports-[backdrop-filter]:bg-white/60"
							whileHover={{ rotate: 0.25 }}
						>
							<div className="relative h-56 w-full overflow-hidden md:h-64">
								<img
									src={s.sample[0]}
									alt={s.title}
									className="h-full w-full origin-center object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[1deg]"
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
								<div className="pointer-events-none absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-white/40 to-transparent" />
								<div className="absolute bottom-3 left-3">
									<span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-black ring-1 ring-black/10">
										View gallery
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-3.5 w-3.5"
										>
											<path d="M13.5 4.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V6.31l-7.22 7.22a.75.75 0 0 1-1.06-1.06l7.22-7.22h-3.19a.75.75 0 0 1-.75-.75Z" />
											<path d="M5.25 6A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V12a.75.75 0 0 0-1.5 0v6.75c0 .414-.336.75-.75.75H5.25a.75.75 0 0 1-.75-.75V8.25c0-.414.336-.75.75-.75H12a.75.75 0 0 0 0-1.5H5.25Z" />
										</svg>
									</span>
								</div>
							</div>

							<div className="flex items-center justify-between p-5">
								<div>
									<h3 className="text-lg font-semibold">{s.title}</h3>
									<p className="text-sm text-midGray">
										Timeless, editorial.
									</p>
								</div>
								<div className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M4.5 12a.75.75 0 0 1 .75-.75h11.69l-3.72-3.72a.75.75 0 1 1 1.06-1.06l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H5.25A.75.75 0 0 1 4.5 12Z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
						</motion.a>
					))}
				</motion.div>
			</div>
		</section>
	)
}
