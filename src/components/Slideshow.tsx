import React, { useState, useEffect } from 'react';

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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, autoplayInterval);
        return () => clearInterval(interval);
    }, [autoplayInterval, slides.length]);

    return (
        <div className="relative w-full h-screen">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
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
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors cursor-pointer"
                    aria-label="Previous slide"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors cursor-pointer"
                    aria-label="Next slide"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
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
