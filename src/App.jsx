import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [scene, setScene] = useState(0);
  const [yes, setYes] = useState(false);

  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const arenaRef = useRef(null);

  const noTexts = [
    "No 🙈",
    "Are you sure? 🥺",
    "Think again 😏",
    "Pleaseee? 🐱",
    "You don’t mean that 😌",
    "Okay fine YES 😳"
  ];

  // Move NO button safely inside container
  const handleNoMove = () => {
    if (!arenaRef.current) return;

    if (noCount < noTexts.length - 1) {
      setNoCount(prev => prev + 1);

      const arenaWidth = arenaRef.current.offsetWidth;
      const arenaHeight = arenaRef.current.offsetHeight;

      const maxX = arenaWidth / 2 - 60;
      const maxY = arenaHeight / 2 - 30;

      const newX = Math.random() * maxX * 2 - maxX;
      const newY = Math.random() * maxY * 2 - maxY;

      setNoPosition({ x: newX, y: newY });
    } else {
      setYes(true);
    }
  };

  useEffect(() => {
    if (scene === 0) {
      const timer = setTimeout(() => setScene(1), 2500);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-pink-300 via-rose-300 to-purple-600 flex items-center justify-center relative">

      <AnimatePresence mode="wait">

        {/* INTRO */}
        {scene === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute text-center"
          >
            <h1 className="text-3xl text-white font-semibold">
              Hey My Princess 💗
            </h1>
          </motion.div>
        )}

        {/* CAT */}
        {scene === 1 && (
          <motion.div
            key="cat"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ y: [-10, 10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl"
            >
              🐱
            </motion.div>

            <button
              onClick={() => setScene(2)}
              className="bg-white text-pink-600 px-6 py-3 rounded-full shadow-lg"
            >
              Tap Me 🐾
            </button>
          </motion.div>
        )}

        {/* MESSAGE */}
        {scene === 2 && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute text-center px-8 space-y-6"
          >
            <div className="text-7xl">😻</div>

            <p className="text-white text-lg leading-relaxed">
              You are my favorite person,  
              my calm in chaos,  
              my forever.
            </p>

            <button
              onClick={() => setScene(3)}
              className="bg-white text-pink-600 px-6 py-3 rounded-full shadow-lg"
            >
              One Last Thing 💌
            </button>
          </motion.div>
        )}

        {/* PROPOSAL */}
        {scene === 3 && !yes && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute text-center space-y-10 w-full px-6"
          >
            <div className="text-7xl animate-bounce">🐱</div>

            <h2 className="text-2xl text-white">
              Will You Be My Valentine? 💖
            </h2>

            {/* BUTTON ARENA */}
            <div
              ref={arenaRef}
              className="relative mx-auto mt-8 h-48 w-80 flex items-center justify-center"
            >
              {/* YES */}
              <motion.button
                onClick={() => setYes(true)}
                animate={{ scale: 1 + noCount * 0.15 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="absolute left-6 bg-white text-pink-600 px-8 py-3 rounded-full shadow-xl text-lg"
              >
                YES 💕
              </motion.button>

              {/* NO */}
              <motion.button
                onMouseEnter={handleNoMove}
                onTouchStart={handleNoMove}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: 1 - noCount * 0.07
                }}
                transition={{ type: "spring", stiffness: 400 }}
                className="absolute right-6 bg-gray-200 text-gray-700 px-6 py-3 rounded-full shadow-md"
              >
                {noTexts[noCount]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CELEBRATION */}
        {yes && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-purple-500 text-center px-6 overflow-hidden"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 300 }}
                animate={{
                  y: -300,
                  x: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute text-white text-2xl"
              >
                ❤️
              </motion.div>
            ))}

            <div className="relative z-10 px-8 py-10 bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md text-center space-y-6 border border-white/20">

  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8 }}
    className="text-8xl drop-shadow-lg"
  >
    😻
  </motion.div>

  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-2xl md:text-3xl font-semibold text-white leading-snug drop-shadow-md"
  >
    You Just Made Me The Happiest Boy Alive ✨💖
  </motion.h1>

 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 1 }}
  className="space-y-4"
>
  <p className="text-white text-xl md:text-2xl font-light tracking-wide leading-relaxed drop-shadow-lg">
    <span className="font-medium text-white/95">
      Hand in hand
    </span>
    <span className="mx-2 text-pink-200">•</span>
    <span className="font-medium text-white/95">
      You & Me
    </span>
  </p>

  <p className="text-white/90 text-lg md:text-xl italic tracking-wide drop-shadow-md">
    Today, tomorrow, and forever.
  </p>

  <p className="text-white text-xl md:text-2xl font-semibold tracking-wide drop-shadow-lg">
    I love you endlessly 💕
  </p>
</motion.div>

</div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;