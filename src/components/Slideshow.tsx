import React, { useState, useEffect, useCallback } from 'react';

interface SlideData {
    image: string;
    title: string;
    description: string;
    quote: string;
    author: string;
}

interface SlideshowProps {
    slides: SlideData[];
    autoplayInterval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, autoplayInterval = 8000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Handle scroll events
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            setIsPaused(true);
            
            // Resume slideshow after 2 seconds of no scrolling
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsPaused(false);
            }, 2000);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // Autoplay effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((current) => (current + 1) % slides.length);
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplayInterval, slides.length, isPaused]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((current) => (current + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative top-0 left-0 w-full h-screen z-0">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <picture>
                        <source srcSet={`${slide.image}?w=1920&q=80`} media="(min-width: 1280px)" />
                        <source srcSet={`${slide.image}?w=1280&q=80`} media="(min-width: 768px)" />
                        <img
                            src={`${slide.image}?w=640&q=80`}
                            alt={`${slide.title} slide`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </picture>
                    <div className="content-overlay absolute bottom-0 left-0 m-10 right-0">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-5xl font-bold text-white mb-4">{slide.title}</h1>
                            <p className="text-xl text-white">{slide.description}</p>
                            <blockquote className="border-l-4 border-white pl-4 text-2xl text-white font-bold">
                                <p>&ldquo;{slide.quote}&rdquo;</p>
                                <footer className="text-lg text-white font-bold">- {slide.author}</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="nav-button absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="nav-button absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
