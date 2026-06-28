import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroScene from "../ThreeScene/HeroScene.jsx";
import "./Hero.css";

const ROLES = ["MERN Stack Developer", "Frontend Developer", "UI/UX Designer"];

const useTypingEffect = (words, speed = 80, pause = 1500) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!deleting && text.length < currentWord.length) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
};

const Hero = () => {
  const typedText = useTypingEffect(ROLES);

  return (
    <section id="home" className="hero">
      <div className="hero-canvas">
        <HeroScene />
      </div>

      <div className="container hero-content">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero-name gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Nishant Agarwal
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span>{typedText}</span>
          <span className="cursor-blink">|</span>
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="/resume.pdf" download className="btn btn-outline">
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        ↓
      </motion.div>
    </section>
  );
};

export default Hero;
