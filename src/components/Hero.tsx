import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  // typing
  const words = ['INNOVATING', 'IDEATING', 'CREATING'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollToNextSection = () => {
    const section = document.getElementById('how-it-works');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let timeout;
    const currentWord = words[currentWordIndex];

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 150);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 100);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex, words]);

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-hero relative overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.7) blur(1px)' }}
      >
        <source
          src="https://catalyzer-fe-public-assets.s3.us-east-1.amazonaws.com/blue-bg.mp4"
          type="video/mp4"
        />
      </video>
      {/* Background decorative elements */}
      {/* Decorative background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-lime/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-10 lg:mb-2">
              <Sparkles className="w-4 h-4 text-brand-lime mr-2" />
              <span className="text-white text-sm font-medium">
                Introducing AI-Powered Innovation
              </span>
            </div>

            <h1
              className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight py-4 
        md:pb-8 md:pt-3"
            >
              <span className="min-h-[1.2em] inline-block">INTRODUCING</span>
              <br />
              <span className="min-h-[1.2em] inline-block">A NEW WAY OF</span>
              <br />
              <span className="text-brand-lime inline-block">{typedWord}</span>
            </h1>

            <p className="text-2xl text-white/90 mb-8 md:px-12 max-w-2xl mx-auto">
              A fun, systematic way to innovate & visualize all aspects of your
              new product ideas
            </p>

            <div className="md:px-12">
              <div className="flex items-center w-full max-w-2xl mx-auto rounded-full overflow-hidden bg-white/90 shadow-md h-14 px-2">
                <input
                  type="text"
                  placeholder="What you would like to create"
                  className="flex-grow bg-transparent text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-none text-base px-4"
                />
                <NavLink to="/chatbot">
                  <Button
                    variant="lime"
                    size="icon"
                    className="rounded-full w-12 h-12 md:w-16 md:h-12 min-w-8 min-h-8"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </NavLink>
              </div>
            </div>
            <button
              onClick={scrollToNextSection}
              className="mt-10 w-20 h-10 md:w-30 md:h-12 mx-auto animate-bounce cursor-pointer z-50 flex items-center justify-center bg-white bg-opacity-20 rounded-full"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
