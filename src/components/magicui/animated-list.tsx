"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
}

export default function AnimatedList({
  children,
  className = "",
  delay = 0.1,
}: AnimatedListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: index * delay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
