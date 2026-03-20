"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  delimiter?: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export default function SplitText({
  text,
  delimiter = " | ",
  className = "",
  wordClassName = "",
  delay = 0.2,
}: SplitTextProps) {
  const words = text.split(delimiter);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index}>
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6 + index * delay,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (
            <motion.span
              className="inline-block mx-2 text-brew-orange"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.8 + index * delay,
              }}
            >
              |
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
