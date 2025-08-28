"use client";

import { motion } from "framer-motion";
import "./style.css";
import { useRouter } from "next/navigation";
import BookDemo from "../bookDemo/BookDemo";
import { useState } from "react";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`position-absolute ${className ?? ""}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="position-relative"
      >
        <div
          className={`position-absolute w-100 h-100 rounded-circle elegant-shape ${gradient}`}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroSection({
  badge = "Explore Our Courses",
  title1 = "Bridging The Gap Between ",
  title2 = "Students And Employers",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };
  const router = useRouter();
  const [showDemo, setShowDemo] = useState(false);
  return (
    <div className="hero-container d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{paddingTop: "88px", paddingBottom: "40px"}}>
      <div className="hero-bg-blur position-absolute top-0 start-0 w-100 h-100" />

      <div className="position-absolute w-100 h-100 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="gradient-indigo"
          className="shape-left-1"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="gradient-rose"
          className="shape-right-1"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="gradient-violet"
          className="shape-left-2"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="gradient-amber"
          className="shape-right-2"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="gradient-cyan"
          className="shape-left-3"
        />
      </div>

      <div className="container position-relative z-1 text-center text-white">
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="display-4 fw-bold mb-4">
            <span className="text-gradient-white d-block">{title1}</span>
            <span className="text-gradient-mixed d-block">{title2}</span>
          </h1>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <p
            className="lead fw-light text-white-50 mx-auto px-3"
            style={{ maxWidth: 700 }}
          >
            Empowering students with the right skills to seamlessly connect with leading employers.
          </p>
        </motion.div>
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border mb-4 badge-custom cursor-pointer course-btn"
          onClick={() => router.push("/courses")}
        >
          {/* <Circle className="fill-rose" /> */}
          <span className="course-btn-text small p-2">{badge}</span>
        </motion.div>
      </div>

      <div className="hero-bottom-gradient position-absolute top-0 start-0 w-100 h-100" />
      {/* ✅ Button that opens modal */}
      <div className="book-demo-btn" onClick={() => setShowDemo(true)}>
        <div className="book-demo-content">
          <div className="book-demo-big">Book a</div>
          <div className="book-demo-big">DEMO</div>
        </div>
      </div>

      {/* ✅ BookDemo modal */}
      <BookDemo visible={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}

export default HeroSection;

