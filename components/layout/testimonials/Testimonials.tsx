import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import './style.css';

const testimonials = [
  {
    name: "Ashwini Bhuse",
    role: "MERN Stack Developer",
    // company: "TechFlow",
    avatar: "/testimonials/ashwini.png",
    rating: 5,
    text: "Hi, I'm Ashwini Bhuse. Joining ChangeXpert after getting my MSc was one of the best things I ever did. The trainers made things clear and easy to understand, even for people who were new to them. I got a job at IT company right after the course because of the hands-on training and great placement help. I strongly suggest it to anyone who wants to learn and move up in their career.",
    results: ["100% Placement Success", "3x Faster Learning", "Career Boost Guaranteed"]
  },
  {
    name: "Paritosh Hendre",
    role: "Python Full Stack Developer",
    // company: "DataDrive",
    avatar: "/testimonials/paritosh.png",
    rating: 5,
    text: "I’m Paritosh Hendre from Pune. I recently completed the MEAN Stack course at ChangeXpert, and it went beyond my expectations. The lessons were clear, and real-world examples made learning easy. The teaching quality was excellent, and the placement support was really helpful. I now feel confident in my full-stack development skills. A big thank you to the entire ChangExpert team for their amazing support and guidance!",
    results: ["Boosted Confidence", "Top-Quality Training", "Career-Ready Support"]
  },
  {
    name: "Mahesh Bahir",
    role: "Software Developer",
    // company: "ScaleUp",
    avatar: "/testimonials/mahesh-bahir.png",
    rating: 5,
    text: "I’m excited to share my experience with ChangeXpert. Although I already knew React.js, I wanted to strengthen my backend skills. I joined the Node.js course, and the training was outstanding. Our mentor explained every concept clearly and gave us hands-on project experience. Thanks to the excellent support from the placement team, I got placed as a Software Engineer. I’m really grateful to ChangExpert for their guidance and support.",
    results: ["Enhanced Backend Skills", "Clear, Quality Training", "Successful Placement"]
  },
  {
    name: "Shantinath Daltod",
    role: "MERN Stack Developer",
    // company: "GrowthLab",
    avatar: "/testimonials/shantinath.png",
    rating: 5,
    text: "I completed the MERN Stack Developer course at ChangExpert. The hands-on, project-based training, along with mock interviews, boosted my practical knowledge, confidence, and communication skills. Thanks to the excellent guidance and placement support from the supportive ChangExpert trainers, I am now working as a Software Developer. I'm truly grateful for their help.",
    results: ["Practical Skill Development", "Boosted Confidence", "Successful Placement"]
  },
  {
    name: "Vaibhavi Shinde",
    role: "MEAN Stack Developer",
    // company: "InnovateCorp",
    avatar: "/testimonials/vaibhavi.png",
    rating: 5,
    text: "I recently completed the MEAN Stack program at ChangeXpert and it exceeded my expectations. The topics were explained clearly with practical examples, making learning straightforward. The instructors were excellent, and the placement support was incredibly helpful. I now feel much more confident in my full-stack development skills. A big thank you to the entire ChangExpert team for their outstanding support and mentorship!",
    results: ["Smooth Learning Experience", "Expert Guidance & Support", "Career-Ready Confidence"]
  },
  {
    name: "Monali Jadhav",
    role: "Frontend Developer",
    // company: "InnovateCorp",
    avatar: "/testimonials/monali.png",
    rating: 5,
    text: "The outstanding, encouraging team at ChangeXpert Academy aids in our development as students. They conduct mock interviews, share job updates, and offer excellent placement assistance. The team’s guidance really boosted my skills and confidence.",
    results: ["Effective Skill Building", "Ongoing Career Support", "Supportive Faculty"]
  },
  {
    name: "Sanket Kanade",
    role: "MERN Stack Developer",
    // company: "InnovateCorp",
    avatar: "/testimonials/sanket.png",
    rating: 5,
    text: "The MERN Stack training at ChangeXpert was extremely valuable. The experienced trainers made learning enjoyable and practical. Real-world projects and career support gave me a strong foundation in MERN stack development. I'm grateful to the dedicated ChangExpert team for helping me grow professionally.",
    results: ["Hands-On Experience", "Engaging & Expert Training", "Career Advancement"]
  },
  {
    name: "Sakshi Kul",
    role: "MEAN Stack Developer",
    // company: "InnovateCorp",
    avatar: "/testimonials/sakshi-kul.png",
    rating: 5,
    text: "I recently completed the MEAN Stack course at ChangExpert, and it was outstanding. The instructors explained each topic clearly with practical examples, and I especially valued the MCQ tests and coding practicals—they really tested my knowledge and made learning interactive. The placement support was excellent, and now I feel truly confident as a full-stack developer. Big thanks to the whole ChangExpert team for their guidance!",
    results: ["Job-Ready Skills", "Expert Teaching", "Career Confidence"]
  },
  // {
  //   name: "Sanskriti Shukla",
  //   role: "Software Developer",
  //   // company: "InnovateCorp",
  //   avatar: "/testimonials/Sanskriti.png",
  //   rating: 5,
  //   text: "Joining ChangeXpert was a game-changer for me. The teaching is practical, clear, and focused on real careers. The mentors genuinely care about our growth. I gained true confidence and strong technical skills. With their support, I secured a great placement. It was a big achievement and felt like a blessing. I highly recommend ChangeXpert to anyone aiming for success.",
  //   results: ["Gained Real Confidence", "Secured Placement", "Career-Focused Learning "]
  // },
];

export function PremiumTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDirection(1);
  //     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  //   }, 6000);

  //   return () => clearInterval(timer);
  // }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 0.86, 0.39, 0.96] as const
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <section id="testimonials" className="testimonials-section position-relative text-white overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          {/* Animated gradient mesh */}
          <motion.div 
            className="gradient-mesh position-absolute top-0 start-0 w-100 h-100"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Moving light orbs */}
          <motion.div
            className="light-orb light-orb-1"
            animate={{
              x: [0, 150, 0],
              y: [0, 80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="light-orb light-orb-2"
            animate={{
              x: [0, -100, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle"
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${25 + (i * 5)}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <motion.div 
          ref={containerRef}
          className="position-relative container-xxl px-3"
          style={{ zIndex: 10 }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-5"
            variants={fadeInUp}
          >
            <motion.div
              className="badge-container d-inline-flex align-items-center gap-3 px-3 py-2 rounded-pill mb-4"
              whileHover={{ scale: 1.05, borderColor: "#0e373e" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="sparkles-icon" />
              </motion.div>
              <span className="badge-text fw-semibold">
                Students Success Stories
              </span>
              <div className="status-dot"></div>
            </motion.div>

            <motion.h2 
              className="display-1 fw-bold mb-4 tracking-tight"
              variants={fadeInUp}
            >
              <span className="gradient-text-white">
                Trusted by
              </span>
              <br />
              <motion.span 
                className="gradient-text-colored"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Shaping Future Talent
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="lead subtitle mx-auto"
              variants={fadeInUp}
            >
              Read success stories of students who gained practical skills, confidence, and careers through our expert-led training journey.
            </motion.p>
          </motion.div>

          {/* Main Testimonial Display */}
          <div className="position-relative mx-auto mb-5 testimonial-container">
            <div className="testimonial-viewport position-relative">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    rotateY: { duration: 0.6 }
                  }}
                  className="position-absolute top-0 start-0 w-100 h-100"
                >
                  <div className="testimonial-card position-relative h-100 rounded-4 p-4 p-md-5 overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className="card-gradient position-absolute top-0 start-0 w-100 h-100 rounded-4"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Quote icon */}
                    <motion.div
                      className="quote-icon position-absolute top-0 end-0 m-4"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Quote className="quote-svg" />
                    </motion.div>

                    <div className="position-relative h-100 d-flex flex-column flex-md-row align-items-center gap-4" style={{ zIndex: 10 }}>
                      {/* User Info */}
                      <div className="flex-shrink-0 text-center text-md-start">
                        <motion.div
                          className="position-relative mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="avatar-container mx-auto mx-md-0 position-relative">
                            <img 
                              src={testimonials[currentIndex].avatar} 
                              alt={testimonials[currentIndex].name}
                              className="w-100 h-100 object-fit-cover"
                            />
                            <motion.div
                              className="avatar-overlay position-absolute top-0 start-0 w-100 h-100"
                              animate={{ opacity: [0, 0.3, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                          
                          {/* Floating ring animation */}
                          <motion.div
                            className="avatar-ring position-absolute top-0 start-0 w-100 h-100"
                            animate={{ 
                              scale: [1, 1.4, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>

                        <h3 className="h4 fw-bold text-white mb-2">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="role-text mb-1 fw-medium">
                          {testimonials[currentIndex].role}
                        </p>
                        {/* <p className="company-text mb-3">
                          {testimonials[currentIndex].company}
                        </p> */}
                        
                        {/* Star Rating */}
                        <div className="d-flex justify-content-center justify-content-md-start gap-1 mb-4">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star className="star-rating" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-fill">
                        <motion.blockquote 
                          className="testimonial-quote mb-4 fw-light fst-italic"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                        >
                          "{testimonials[currentIndex].text}"
                        </motion.blockquote>

                        {/* Results */}
                        <div className="row g-3">
                          {testimonials[currentIndex].results.map((result, i) => (
                            <div key={i} className="col-12 col-sm-4">
                              <motion.div
                                className="result-badge rounded-3 p-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                              >
                                <span className="result-text small fw-medium">
                                  {result}
                                </span>
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
              <motion.button
                onClick={prevTestimonial}
                className="nav-button btn rounded-pill p-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="nav-icon" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="d-flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`dot-indicator ${
                      index === currentIndex ? 'active' : ''
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                className="nav-button btn rounded-pill p-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="nav-icon" />
              </motion.button>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="row g-4"
            variants={staggerContainer}
          >
            {[
              { number: "500+", label: "Happy Students" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "100%", label: "Placement Rate " },
              { number: "2.4LPA", label: "Minimum CTC" }
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <motion.div
                  className="text-center stat-item"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="stat-number display-4 fw-bold mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                 
                  </motion.div>
                  <div className="stat-label small fw-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}