import { useState } from 'react';

/**
 * PersonalGrowthQuiz Component
 * A comprehensive quiz on personal development topics
 * Total Questions: 50
 * 
 * Topics covered:
 * - Mindset & Psychology
 * - Habits & Routines
 * - Productivity & Time Management
 * - Emotional Intelligence
 * - Learning & Skill Development
 * - And many more...
 */

interface Question {
  id: number;
  text: string;
  image: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is a key principle of neuroplasticity?",
    image: "https://loremflickr.com/800/400/brain,science",
    options: [
      "The brain cannot change after childhood",
      "The brain can form new neural connections throughout life",
      "Learning is only possible during sleep",
      "Memories are permanently fixed once formed"
    ],
    correctAnswer: 1,
    explanation: "Neuroplasticity refers to the brain's ability to form and reorganize synaptic connections, especially in response to learning or experience, throughout our entire life."
  },
  {
    id: 2,
    text: "Which approach to self-improvement is most sustainable?",
    image: "https://loremflickr.com/800/400/growth,mindset",
    options: [
      "Making dramatic changes overnight",
      "Waiting for motivation to strike",
      "Making small, consistent changes daily",
      "Setting unrealistic goals"
    ],
    correctAnswer: 2,
    explanation: "Small, consistent changes compound over time and are more sustainable than attempting dramatic transformations overnight."
  },
  {
    id: 3,
    text: "What is the Pomodoro Technique?",
    image: "https://loremflickr.com/800/400/time,management",
    options: [
      "A cooking method",
      "A 25-minute work period followed by a 5-minute break",
      "A type of meditation",
      "A goal-setting framework"
    ],
    correctAnswer: 1,
    explanation: "The Pomodoro Technique involves working for 25 minutes followed by a 5-minute break to maintain focus and prevent burnout."
  },
  {
    id: 4,
    text: "What is a key aspect of effective goal setting?",
    image: "https://loremflickr.com/800/400/goals,achievement",
    options: [
      "Setting vague objectives",
      "Never changing your goals",
      "Ignoring deadlines",
      "Regular review and adjustment"
    ],
    correctAnswer: 3,
    explanation: "Regular review and adjustment of goals is crucial as life circumstances change, while maintaining their core purpose."
  },
  {
    id: 11,
    text: "What is self-regulation in emotional intelligence?",
    image: "https://loremflickr.com/800/400/control,balance",
    options: [
      "Avoiding all emotions",
      "Managing and controlling your emotional responses",
      "Only expressing positive emotions",
      "Reacting immediately to situations"
    ],
    correctAnswer: 1,
    explanation: "Self-regulation is the ability to manage and control your emotional responses appropriately in different situations."
  },
  {
    id: 12,
    text: "What is the most effective way to learn a new skill?",
    image: "https://loremflickr.com/800/400/learning,practice",
    options: [
      "Passive observation",
      "Deliberate practice with feedback",
      "Reading without practice",
      "Random practice"
    ],
    correctAnswer: 1,
    explanation: "Deliberate practice with feedback is the most effective way to learn as it combines focused effort with continuous improvement."
  },
  {
    id: 13,
    text: "What is the 'forgetting curve'?",
    image: "https://loremflickr.com/800/400/memory,learning",
    options: [
      "A way to forget bad memories",
      "The rate at which we forget new information",
      "A learning technique",
      "A memory enhancement tool"
    ],
    correctAnswer: 1,
    explanation: "The forgetting curve shows how information is lost over time when there is no attempt to retain it."
  },
  {
    id: 14,
    text: "What is the Eisenhower Matrix used for?",
    image: "https://loremflickr.com/800/400/priority,management",
    options: [
      "Creating to-do lists",
      "Prioritizing tasks based on urgency and importance",
      "Scheduling meetings",
      "Managing projects"
    ],
    correctAnswer: 1,
    explanation: "The Eisenhower Matrix helps prioritize tasks by categorizing them based on their urgency and importance."
  },
  {
    id: 15,
    text: "What is time blocking?",
    image: "https://loremflickr.com/800/400/calendar,schedule",
    options: [
      "Working without breaks",
      "Assigning specific time periods to specific tasks",
      "Procrastinating tasks",
      "Working on multiple tasks simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Time blocking involves dedicating specific blocks of time to specific tasks or activities to improve focus and productivity."
  },
  {
    id: 16,
    text: "How does exercise benefit cognitive function?",
    image: "https://loremflickr.com/800/400/exercise,brain",
    options: [
      "It has no effect on the brain",
      "It increases blood flow and promotes neuroplasticity",
      "It reduces cognitive ability",
      "It only affects physical health"
    ],
    correctAnswer: 1,
    explanation: "Exercise increases blood flow to the brain and promotes neuroplasticity, enhancing cognitive function and mental clarity."
  },
  {
    id: 17,
    text: "What is the recommended daily water intake?",
    image: "https://loremflickr.com/800/400/water,hydration",
    options: [
      "1-2 cups",
      "8-10 cups",
      "Only when thirsty",
      "No specific amount"
    ],
    correctAnswer: 1,
    explanation: "The general recommendation is 8-10 cups of water daily, though individual needs may vary based on activity level and climate."
  },
  {
    id: 18,
    text: "What is a healthy way to manage stress?",
    image: "https://loremflickr.com/800/400/stress,relief",
    options: [
      "Ignoring it completely",
      "Regular exercise and mindfulness practices",
      "Working harder",
      "Avoiding all stressful situations"
    ],
    correctAnswer: 1,
    explanation: "Regular exercise and mindfulness practices help manage stress by reducing cortisol levels and promoting relaxation."
  },
  {
    id: 19,
    text: "What is the 'stress bucket' concept?",
    image: "https://loremflickr.com/800/400/balance,wellness",
    options: [
      "A container for stress",
      "Understanding your stress capacity and coping mechanisms",
      "Storing stress for later",
      "Avoiding stress entirely"
    ],
    correctAnswer: 1,
    explanation: "The stress bucket concept helps visualize our capacity to handle stress and the importance of healthy coping mechanisms."
  },
  {
    id: 20,
    text: "What is active listening?",
    image: "https://loremflickr.com/800/400/listening,communication",
    options: [
      "Waiting for your turn to speak",
      "Fully engaging and focusing on the speaker",
      "Multitasking while listening",
      "Interrupting with questions"
    ],
    correctAnswer: 1,
    explanation: "Active listening involves fully engaging with the speaker, showing understanding, and providing appropriate feedback."
  },
  // Relationships & Social Skills
  {
    id: 21,
    text: "What is empathy?",
    image: "https://loremflickr.com/800/400/empathy,understanding",
    options: [
      "Feeling sorry for others",
      "Understanding and sharing others' feelings",
      "Giving advice",
      "Avoiding emotional connections"
    ],
    correctAnswer: 1,
    explanation: "Empathy is the ability to understand and share the feelings of another person, fostering deeper connections."
  },
  {
    id: 22,
    text: "What is assertive communication?",
    image: "https://loremflickr.com/800/400/communication,confidence",
    options: [
      "Being aggressive",
      "Expressing needs while respecting others",
      "Being passive",
      "Avoiding conflict"
    ],
    correctAnswer: 1,
    explanation: "Assertive communication involves expressing your needs and feelings clearly while respecting others' rights and feelings."
  },
  // Financial Wellness
  {
    id: 23,
    text: "What is the 50/30/20 budgeting rule?",
    image: "https://loremflickr.com/800/400/budget,finance",
    options: [
      "Saving all income",
      "50% needs, 30% wants, 20% savings",
      "Spending freely",
      "Investing everything"
    ],
    correctAnswer: 1,
    explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
  },
  // Career Development
  {
    id: 24,
    text: "What is the best approach to career planning?",
    image: "https://loremflickr.com/800/400/career,planning",
    options: [
      "Following others' paths",
      "Setting clear goals and developing relevant skills",
      "Waiting for opportunities",
      "Avoiding change"
    ],
    correctAnswer: 1,
    explanation: "Effective career planning involves setting clear goals and actively developing skills that align with your objectives."
  },
  // Decision Making
  {
    id: 25,
    text: "What is analysis paralysis?",
    image: "https://loremflickr.com/800/400/decision,thinking",
    options: [
      "Quick decision making",
      "Overthinking decisions to the point of inaction",
      "Not making decisions",
      "Random choices"
    ],
    correctAnswer: 1,
    explanation: "Analysis paralysis occurs when overthinking leads to decision-making paralysis, preventing action."
  },
  // Creativity
  {
    id: 26,
    text: "How can you enhance creativity?",
    image: "https://loremflickr.com/800/400/creativity,art",
    options: [
      "Waiting for inspiration",
      "Regular practice and exposure to new experiences",
      "Following rules strictly",
      "Avoiding challenges"
    ],
    correctAnswer: 1,
    explanation: "Creativity is enhanced through regular practice, exposure to new experiences, and challenging conventional thinking."
  },
  // Problem Solving
  {
    id: 27,
    text: "What is the first step in effective problem solving?",
    image: "https://loremflickr.com/800/400/problem,solution",
    options: [
      "Implementing solutions",
      "Clearly defining the problem",
      "Finding quick fixes",
      "Ignoring the problem"
    ],
    correctAnswer: 1,
    explanation: "The first step in effective problem solving is clearly defining and understanding the problem."
  },
  // Resilience
  {
    id: 28,
    text: "What characterizes resilient people?",
    image: "https://loremflickr.com/800/400/resilience,strength",
    options: [
      "Avoiding challenges",
      "Adapting and bouncing back from setbacks",
      "Never failing",
      "Ignoring problems"
    ],
    correctAnswer: 1,
    explanation: "Resilient people can adapt to change and bounce back from setbacks while learning from their experiences."
  },
  // Work-Life Balance
  {
    id: 29,
    text: "What is the key to work-life balance?",
    image: "https://loremflickr.com/800/400/balance,lifestyle",
    options: [
      "Working more hours",
      "Setting boundaries and priorities",
      "Ignoring personal life",
      "Avoiding work"
    ],
    correctAnswer: 1,
    explanation: "Work-life balance requires setting clear boundaries and prioritizing both professional and personal aspects of life."
  },
  // Personal Values
  {
    id: 30,
    text: "Why are personal values important?",
    image: "https://loremflickr.com/800/400/values,compass",
    options: [
      "They don't matter",
      "They guide decision-making and behavior",
      "Only for business",
      "To impress others"
    ],
    correctAnswer: 1,
    explanation: "Personal values serve as a compass for decision-making and guide behavior aligned with your authentic self."
  },
  // Leadership
  {
    id: 31,
    text: "What is servant leadership?",
    image: "https://loremflickr.com/800/400/leadership,service",
    options: [
      "Controlling others",
      "Focusing on serving and developing others",
      "Being passive",
      "Avoiding responsibility"
    ],
    correctAnswer: 1,
    explanation: "Servant leadership focuses on serving and developing others while achieving organizational goals."
  },
  // Self-Awareness
  {
    id: 32,
    text: "What is the importance of self-reflection?",
    image: "https://loremflickr.com/800/400/reflection,mirror",
    options: [
      "It wastes time",
      "It promotes personal growth and awareness",
      "It causes overthinking",
      "It's only for meditation"
    ],
    correctAnswer: 1,
    explanation: "Self-reflection helps develop self-awareness and promotes personal growth through understanding thoughts and behaviors."
  },
  // Time Management
  {
    id: 33,
    text: "What is the 80/20 rule (Pareto Principle)?",
    image: "https://loremflickr.com/800/400/efficiency,productivity",
    options: [
      "Working 80 hours a week",
      "20% of efforts produce 80% of results",
      "Taking 80% breaks",
      "Using 20% of resources"
    ],
    correctAnswer: 1,
    explanation: "The Pareto Principle suggests that 20% of efforts often produce 80% of results, helping prioritize activities."
  },
  // Mental Health
  {
    id: 34,
    text: "What is cognitive reframing?",
    image: "https://loremflickr.com/800/400/mindset,thinking",
    options: [
      "Avoiding thoughts",
      "Changing perspective on situations",
      "Suppressing emotions",
      "Ignoring problems"
    ],
    correctAnswer: 1,
    explanation: "Cognitive reframing involves changing how you view situations to find more positive or helpful perspectives."
  },
  // Continuous Learning
  {
    id: 35,
    text: "What is the learning zone model?",
    image: "https://loremflickr.com/800/400/learning,growth",
    options: [
      "Staying comfortable",
      "Balance between comfort and panic zones",
      "Always being challenged",
      "Avoiding learning"
    ],
    correctAnswer: 1,
    explanation: "The learning zone model describes the optimal state between comfort and panic zones where learning occurs."
  },
  // Motivation
  {
    id: 36,
    text: "What is intrinsic motivation?",
    image: "https://loremflickr.com/800/400/motivation,drive",
    options: [
      "External rewards",
      "Internal drive to accomplish something",
      "Peer pressure",
      "Avoiding punishment"
    ],
    correctAnswer: 1,
    explanation: "Intrinsic motivation comes from internal desires and satisfaction rather than external rewards."
  },
  // Networking
  {
    id: 37,
    text: "What is effective networking?",
    image: "https://loremflickr.com/800/400/network,connection",
    options: [
      "Collecting business cards",
      "Building meaningful relationships",
      "Selling products",
      "Avoiding people"
    ],
    correctAnswer: 1,
    explanation: "Effective networking involves building genuine, mutually beneficial relationships rather than just collecting contacts."
  },
  // Conflict Resolution
  {
    id: 38,
    text: "What is the best approach to conflict resolution?",
    image: "https://loremflickr.com/800/400/resolution,harmony",
    options: [
      "Avoiding conflict",
      "Finding win-win solutions",
      "Winning at all costs",
      "Giving in always"
    ],
    correctAnswer: 1,
    explanation: "The best approach to conflict resolution is finding solutions that benefit all parties involved."
  },
  // Personal Branding
  {
    id: 39,
    text: "What is personal branding?",
    image: "https://loremflickr.com/800/400/brand,identity",
    options: [
      "Being fake",
      "Authentic self-presentation",
      "Copying others",
      "Hiding yourself"
    ],
    correctAnswer: 1,
    explanation: "Personal branding is the authentic presentation of your unique value proposition and identity."
  },
  // Innovation
  {
    id: 40,
    text: "What drives innovation?",
    image: "https://loremflickr.com/800/400/innovation,creation",
    options: [
      "Following rules",
      "Curiosity and problem-solving",
      "Avoiding change",
      "Copying others"
    ],
    correctAnswer: 1,
    explanation: "Innovation is driven by curiosity, problem-solving mindset, and willingness to challenge status quo."
  },
  // Digital Wellness
  {
    id: 41,
    text: "What is digital wellness?",
    image: "https://loremflickr.com/800/400/digital,wellness",
    options: [
      "Always being online",
      "Healthy relationship with technology",
      "Avoiding technology",
      "Maximum screen time"
    ],
    correctAnswer: 1,
    explanation: "Digital wellness involves maintaining a healthy balance in your relationship with technology."
  },
  // Cultural Competence
  {
    id: 42,
    text: "What is cultural competence?",
    image: "https://loremflickr.com/800/400/culture,diversity",
    options: [
      "Ignoring differences",
      "Understanding and respecting cultural differences",
      "Cultural superiority",
      "Avoiding other cultures"
    ],
    correctAnswer: 1,
    explanation: "Cultural competence involves understanding, respecting, and effectively interacting with people from different cultures."
  },
  // Adaptability
  {
    id: 43,
    text: "Why is adaptability important?",
    image: "https://loremflickr.com/800/400/adapt,change",
    options: [
      "It isn't important",
      "It enables success in changing environments",
      "To avoid challenges",
      "To stay comfortable"
    ],
    correctAnswer: 1,
    explanation: "Adaptability is crucial for success in our rapidly changing world and helps navigate new challenges."
  },
  // Environmental Awareness
  {
    id: 44,
    text: "What is environmental consciousness?",
    image: "https://loremflickr.com/800/400/environment,nature",
    options: [
      "Ignoring environment",
      "Awareness of environmental impact",
      "Only recycling",
      "Avoiding nature"
    ],
    correctAnswer: 1,
    explanation: "Environmental consciousness involves understanding and minimizing our impact on the environment."
  },
  // Critical Thinking
  {
    id: 45,
    text: "What is critical thinking?",
    image: "https://loremflickr.com/800/400/thinking,analysis",
    options: [
      "Being negative",
      "Analyzing information objectively",
      "Quick judgments",
      "Accepting everything"
    ],
    correctAnswer: 1,
    explanation: "Critical thinking involves analyzing information objectively to make reasoned judgments."
  },
  // Personal Safety
  {
    id: 46,
    text: "What is situational awareness?",
    image: "https://loremflickr.com/800/400/awareness,safety",
    options: [
      "Being paranoid",
      "Being aware of surroundings",
      "Ignoring environment",
      "Always being fearful"
    ],
    correctAnswer: 1,
    explanation: "Situational awareness involves being mindful of your surroundings and potential risks or opportunities."
  },
  // Time Perspective
  {
    id: 47,
    text: "What is a balanced time perspective?",
    image: "https://loremflickr.com/800/400/time,balance",
    options: [
      "Living only in present",
      "Balancing past, present, and future",
      "Focusing on past",
      "Only planning future"
    ],
    correctAnswer: 1,
    explanation: "A balanced time perspective involves appropriate consideration of past, present, and future in decision-making."
  },
  // Personal Space
  {
    id: 48,
    text: "Why is personal space important?",
    image: "https://loremflickr.com/800/400/space,privacy",
    options: [
      "It isn't important",
      "It supports mental health and boundaries",
      "To avoid people",
      "Only for introverts"
    ],
    correctAnswer: 1,
    explanation: "Personal space is crucial for maintaining mental health, boundaries, and healthy relationships."
  },
  // Life Purpose
  {
    id: 49,
    text: "What contributes to finding life purpose?",
    image: "https://loremflickr.com/800/400/purpose,meaning",
    options: [
      "Following others",
      "Exploring values and passions",
      "Avoiding questions",
      "Material success"
    ],
    correctAnswer: 1,
    explanation: "Finding life purpose involves exploring personal values, passions, and what gives life meaning."
  },
  // Integration
  {
    id: 50,
    text: "What is holistic personal development?",
    image: "https://loremflickr.com/800/400/wholeness,development",
    options: [
      "Focus on one area",
      "Developing all aspects of life",
      "Ignoring weaknesses",
      "Avoiding growth"
    ],
    correctAnswer: 1,
    explanation: "Holistic personal development involves growing in all aspects of life: mental, physical, emotional, and spiritual."
  }
];

export default function PersonalGrowthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  
  const TOTAL_QUESTIONS = 50;
  const PASSING_PERCENTAGE = 70;
  const REQUIRED_CORRECT = Math.ceil(TOTAL_QUESTIONS * (PASSING_PERCENTAGE / 100));

  const handleAnswerClick = (selectedOption: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);
    
    const correct = selectedOption === questions[currentQuestion].correctAnswer;
    if (correct) {
      setScore(score + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / TOTAL_QUESTIONS) * 100;
    const passed = percentage >= PASSING_PERCENTAGE;

    if (percentage === 100) return "Perfekt! Sie haben diese Konzepte gemeistert! 🏆";
    if (passed) return "Herzlichen Glückwunsch! Sie haben den Test bestanden! 🌟";
    return "Sie benötigen 70% zum Bestehen. Üben Sie weiter und versuchen Sie es erneut! 💪";
  };

  if (showResults) {
    const percentage = (score / TOTAL_QUESTIONS) * 100;
    const passed = percentage >= PASSING_PERCENTAGE;

    return (
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Quiz abgeschlossen!</h2>
        <p className="text-xl">
          Sie haben {score} von {TOTAL_QUESTIONS} Punkten erreicht ({percentage.toFixed(1)}%)
        </p>
        <p className="text-lg font-semibold">
          {passed ? (
            <span className="text-green-600">Sie haben bestanden! 🎉</span>
          ) : (
            <span className="text-red-600">Sie benötigen {REQUIRED_CORRECT} richtige Antworten zum Bestehen</span>
          )}
        </p>
        <p className="text-gray-600">{getScoreMessage()}</p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResults(false);
            setShowExplanation(false);
            setSelectedAnswer(null);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress information */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-800 mb-2">
          Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
        </div>
        <div className="text-lg text-gray-600">
          You have {Math.floor((currentQuestion / TOTAL_QUESTIONS) * 100)}% Complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentQuestion) / TOTAL_QUESTIONS) * 100}%` }}
        ></div>
      </div>

      {/* Score information */}
      <div className="mb-8">
        <div className="text-xl text-gray-800 mb-2">
          Current Score: {score}
        </div>
        <div className="text-lg text-gray-600">
          Required to Pass: {REQUIRED_CORRECT} ({PASSING_PERCENTAGE}%)
        </div>
      </div>

      {/* Question image */}
      <div className="relative h-40 overflow-hidden rounded-lg mb-6">
        <img 
          src={questions[currentQuestion].image}
          alt="Quiz question"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {questions[currentQuestion].text}
      </h2>

      {/* Options */}
      <div className={`grid grid-cols-1 gap-4 ${shake ? 'animate-shake' : ''}`}>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={`p-4 text-left rounded-lg transition-all duration-300 transform hover:scale-102 
              ${showExplanation
                ? index === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-2 border-green-500'
                  : index === selectedAnswer
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-100 opacity-50'
                : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
              }
              ${!showExplanation ? 'hover:shadow-md' : ''}`}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-100' : 'bg-red-100'} 
            animate-fadeIn`}>
            <p className="text-lg">
              {selectedAnswer === questions[currentQuestion].correctAnswer ? '✨ Correct! ' : '❌ Not quite. '}
              {questions[currentQuestion].explanation}
            </p>
          </div>
          <button
            onClick={handleNextQuestion}
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            {currentQuestion + 1 < TOTAL_QUESTIONS ? "Next Question" : "Show Results"}
          </button>
        </div>
      )}
    </div>
  );
}
