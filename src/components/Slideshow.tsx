import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { slides as defaultSlides } from '../data/slidesData'; // src/data/slidesData.ts

interface SlideData {
	image: string;
	title: string;
	description: string;
	quote: string;
	author: string;
}

interface SlideshowProps {
	slides?: SlideData[]; // Made slides optional
	autoplayInterval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({
	slides = defaultSlides, // Use defaultSlides to avoid naming conflict
	autoplayInterval = 8000,
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, autoplayInterval);
		return () => clearInterval(interval);
	}, [autoplayInterval, nextSlide]);

	useEffect(() => {
		const easeOutQuart = (t: number): number => 1 - (1 - t) ** 4;

		const handleScroll = () => {
			const slideshowContainer = document.getElementById('slideshow-container');
			if (slideshowContainer) {
				const scrollPosition = window.scrollY;
				const windowHeight = window.innerHeight;

				const fadeStart = windowHeight * 0.05;
				const fadeEnd = windowHeight * 0.6;
				const fadeRange = fadeEnd - fadeStart;

				if (scrollPosition <= fadeStart) {
					slideshowContainer.style.opacity = '1';
					slideshowContainer.style.transform = 'scale(1) translateY(0px)';
				} else if (scrollPosition >= fadeEnd) {
					slideshowContainer.style.opacity = '0';
					slideshowContainer.style.transform = 'scale(1.08) translateY(-20px)';
				} else {
					const progress = (scrollPosition - fadeStart) / fadeRange;
					const eased = easeOutQuart(progress);
					const opacity = 1 - eased;
					const scale = 1 + eased * 0.08;
					const translateY = -20 * eased;

					slideshowContainer.style.opacity = opacity.toString();
					slideshowContainer.style.transform = `scale(${scale}) translateY(${translateY}px)`;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div id="slideshow-container" className="relative w-full h-screen">
			{/* Slides */}
			{slides.map((slide) => (
				<div
					key={slide.image} // Ensure slide.image is unique, otherwise replace with a more unique key
					className={`absolute inset-0 transition-all duration-500 ease-in-out ${
						slides.indexOf(slide) === currentSlide
							? "opacity-100 z-10"
							: "opacity-0 z-0"
					}`}
				>
					<img
						src={slide.image}
						alt={slide.title ? slide.title : "Slideshow image"}
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-30">
						<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
							<h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
							<p className="text-lg mb-4">{slide.description}</p>
							<blockquote className="border-l-4 border-white pl-4">
								<p className="text-xl italic">{slide.quote}</p>
								<footer className="mt-2">— {slide.author}</footer>
							</blockquote>
						</div>
					</div>
				</div>
			))}

			{/* Navigation Buttons */}
			<div className="absolute inset-0 z-20">
				<button
					type="button"
					onClick={prevSlide}
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors cursor-pointer"
					aria-label="Previous slide"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Previous slide"
					>
						<title>Previous slide</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<button
					type="button"
					onClick={nextSlide}
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors cursor-pointer"
					aria-label="Next slide"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Next slide"
					>
						<title>Next slide</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			{/* Slide Indicators */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
				{slides.map((slide, index) => (
					<button
						type="button"
						key={slide.image || index} // Use slide.image if it is unique, otherwise fallback to index (not ideal)
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
							index === currentSlide
								? "bg-white scale-125"
								: "bg-white/50 hover:bg-white/70"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Slideshow;