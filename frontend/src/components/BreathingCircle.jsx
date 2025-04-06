import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Wind, Volume2, VolumeX } from 'lucide-react';

const breathingPatterns = [
  {
    name: 'Box Breathing',
    icon: <Moon className="w-6 h-6" />,
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
  },
  {
    name: '4-7-8 Breathing',
    icon: <Sun className="w-6 h-6" />,
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 0,
  },
  {
    name: 'Resonance Breathing',
    icon: <Wind className="w-6 h-6" />,
    inhale: 5,
    hold: 0,
    exhale: 5,
    rest: 0,
  },
];

const BreathingCircle = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(breathingPatterns[0]);
  const [phase, setPhase] = useState('inhale');
  const [progress, setProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const speakInstruction = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; 
    utterance.pitch = 1.2; 
    utterance.volume = 0.8; 
   
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    if (!isActive) {
      window.speechSynthesis.cancel();
      return;
    }

    const totalDuration = 
      currentPattern.inhale + 
      currentPattern.hold + 
      currentPattern.exhale + 
      currentPattern.rest;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= totalDuration) {
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [isActive, currentPattern]);

  useEffect(() => {
    if (!isActive) return;

    const { inhale, hold, exhale } = currentPattern;
    
    if (progress < inhale) {
      setPhase('inhale');
      if (progress === 0) speakInstruction('Breathe in deeply');
    } else if (progress < inhale + hold) {
      setPhase('hold');
      if (progress === inhale) speakInstruction('Hold your breath');
    } else if (progress < inhale + hold + exhale) {
      setPhase('exhale');
      if (progress === inhale + hold) speakInstruction('Release and breathe out');
    } else {
      setPhase('rest');
      if (progress === inhale + hold + exhale) speakInstruction('Rest and relax');
    }
  }, [progress, currentPattern, isActive, speakInstruction]);

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'rest':
        return 'Rest';
    }
  };

  const circleVariants = {
    initial: {
      scale: 1,
    },
    inhale: {
      scale: 1.3,
      transition: { duration: currentPattern.inhale, ease: 'easeInOut' }
    },
    hold: {
      scale: 1.3,
      transition: { duration: currentPattern.hold }
    },
    exhale: {
      scale: 1,
      transition: { duration: currentPattern.exhale, ease: 'easeInOut' }
    },
    rest: {
      scale: 1,
      transition: { duration: currentPattern.rest }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {breathingPatterns.map((pattern) => (
          <button
            key={pattern.name}
            onClick={() => {
              setCurrentPattern(pattern);
              setProgress(0);
              setPhase('inhale');
              if (isActive) {
                setIsActive(false);
                setTimeout(() => setIsActive(true), 100);
              }
            }}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              currentPattern.name === pattern.name
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {pattern.icon}
            <span>{pattern.name}</span>
          </button>
        ))}
      </div>

      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        <motion.div
          initial="initial"
          animate={isActive ? phase : "initial"}
          variants={circleVariants}
          className="w-72 h-72 bg-indigo-100 rounded-full flex items-center justify-center absolute"
        >
          <motion.div
            initial="initial"
            animate={isActive ? phase : "initial"}
            variants={circleVariants}
            className="w-56 h-56 bg-indigo-200 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial="initial"
              animate={isActive ? phase : "initial"}
              variants={circleVariants}
              className="w-40 h-40 bg-indigo-300 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl font-medium text-indigo-900 text-center">
                {getInstructions()}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={toggleMusic}
          className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
        >
          {isMusicPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          <span>{isMusicPlaying ? 'Mute Music' : 'Play Music'}</span>
        </button>

        <button
          onClick={() => {
            setIsActive(!isActive);
            setProgress(0);
            setPhase('inhale');
          }}
          className={`px-8 py-4 rounded-lg text-lg font-medium transition-colors ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default BreathingCircle;
