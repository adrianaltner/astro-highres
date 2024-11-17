import React, { useState, useEffect } from 'react';

interface Question {
    id: number;
    image: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        image: "123.webp",
        question: "What type of composition technique is primarily used in this image?",
        options: ["Rule of Thirds", "Leading Lines", "Symmetry", "Golden Ratio"],
        correctAnswer: "Rule of Thirds",
        explanation: "The main subject is positioned at the intersection of thirds, creating a balanced and engaging composition."
    },
    {
        id: 2,
        image: "345.webp",
        question: "What time of day was this photo likely taken?",
        options: ["Golden Hour", "Blue Hour", "Midday", "Sunset"],
        correctAnswer: "Golden Hour",
        explanation: "The warm, soft lighting and long shadows are characteristic of golden hour photography."
    },
    {
        id: 3,
        image: "123.webp",
        question: "Which camera technique was used to achieve this effect?",
        options: ["Long Exposure", "HDR", "Focus Stacking", "Macro"],
        correctAnswer: "Long Exposure",
        explanation: "The smooth, flowing effect in the image is achieved through a long exposure technique."
    }
];

const PhotoQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [shake, setShake] = useState(false);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        const correct = answer === questions[currentQuestion].correctAnswer;
        setIsCorrect(correct);
        setShowExplanation(true);
        
        if (correct) {
            setScore(score + 1);
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setShowExplanation(false);
        } else {
            setQuizComplete(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setScore(0);
        setShowExplanation(false);
        setQuizComplete(false);
    };

    const getScoreMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return "Perfect! You're a photography expert! 🏆";
        if (percentage >= 70) return "Great job! You know your stuff! 🌟";
        if (percentage >= 50) return "Not bad! Keep learning! 📚";
        return "Keep practicing! Every expert started somewhere! 💪";
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-2xl">
            {!quizComplete ? (
                <div className={`space-y-6 ${shake ? 'animate-shake' : ''}`}>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Question image */}
                    <div className="relative h-40 overflow-hidden rounded-lg">
                        <img 
                            src={questions[currentQuestion].image}
                            alt="Quiz question"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Question */}
                    <h2 className="text-2xl font-bold text-gray-800">
                        {questions[currentQuestion].question}
                    </h2>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !selectedAnswer && handleAnswer(option)}
                                className={`p-4 text-left rounded-lg transition-all duration-300 transform hover:scale-102 
                                    ${selectedAnswer
                                        ? option === questions[currentQuestion].correctAnswer
                                            ? 'bg-green-100 border-2 border-green-500'
                                            : option === selectedAnswer
                                                ? 'bg-red-100 border-2 border-red-500'
                                                : 'bg-gray-100 opacity-50'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }
                                    ${!selectedAnswer ? 'hover:shadow-md' : ''}`}
                                disabled={!!selectedAnswer}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'} 
                            animate-fadeIn`}>
                            <p className="text-lg">
                                {isCorrect ? '✨ Correct! ' : '❌ Not quite. '}
                                {questions[currentQuestion].explanation}
                            </p>
                        </div>
                    )}

                    {/* Next button */}
                    {selectedAnswer && (
                        <button
                            onClick={nextQuestion}
                            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                transition-colors duration-300 animate-fadeIn"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-center space-y-6 animate-fadeIn">
                    <h2 className="text-3xl font-bold text-gray-800">Quiz Complete! 🎉</h2>
                    <p className="text-2xl">
                        Your score: {score} out of {questions.length}
                    </p>
                    <p className="text-xl text-gray-600">{getScoreMessage()}</p>
                    <button
                        onClick={restartQuiz}
                        className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                            transition-colors duration-300"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoQuiz;
