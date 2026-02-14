import { motion } from "framer-motion";

export default function CuteCat({ mood = "happy" }) {
  return (
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: 10 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
      }}
      className="text-7xl"
    >
      {mood === "happy" && "🐱"}
      {mood === "love" && "😻"}
      {mood === "sad" && "🥺"}
    </motion.div>
  );
}