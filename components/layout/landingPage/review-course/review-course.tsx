"use client";
import React, { useState } from "react";
import "./style.css";

const allReviews = [
  {
    name: "Marketing Specialist",
    date: "Jan 8, 2025",
    review:
      "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life–changing!",
    rating: 4,
    image: "/user-bold.svg",
  },
  {
    name: "James Low",
    date: "Jan 17, 2025",
    review:
      "This course transformed my skills and confidence! The lessons were clear, engaging, and highly practical. I've successfully applied what I learned to real–world projects with great results.",
    rating: 4,
    image: "/user-bold.svg",
  },
  {
    name: "Kane Williamson",
    date: "Feb 12, 2025",
    review:
      "I had high hopes, but this program exceeded every expectation. The instructors were knowledgeable, and the resources provided were top notch. Highly recommend course from learnly!",
    rating: 3,
    image: "/user-bold.svg",
  },
  {
    name: "Sarah Johnson",
    date: "Feb 20, 2025",
    review:
      "Outstanding course content and delivery! The practical assignments helped me understand complex concepts easily. I've already started implementing what I learned in my current role.",
    rating: 5,
    image: "/user-bold.svg",
  },
  {
    name: "Michael Chen",
    date: "Feb 25, 2025",
    review:
      "Great value for money. The course structure is well-organized and the instructors are very responsive to questions. Highly recommended for beginners and intermediate learners.",
    rating: 4,
    image: "/user-bold.svg",
  },
  {
    name: "Emma Wilson",
    date: "Mar 1, 2025",
    review:
      "This course exceeded my expectations! The hands-on projects were particularly valuable. I feel much more confident in my skills now and have already received positive feedback at work.",
    rating: 5,
    image: "/user-bold.svg",
  },
  {
    name: "David Rodriguez",
    date: "Mar 5, 2025",
    review:
      "Excellent course with practical examples. The instructors explain complex topics in an easy-to-understand manner. The community support is also fantastic!",
    rating: 4,
    image: "/user-bold.svg",
  },
  {
    name: "Lisa Thompson",
    date: "Mar 10, 2025",
    review:
      "I'm so glad I took this course! It has opened up new career opportunities for me. The curriculum is up-to-date and relevant to current industry standards.",
    rating: 5,
    image: "/user-bold.svg",
  }
];

const CourseReviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreReviews = () => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + 3, allReviews.length));
      setIsLoading(false);
    }, 500);
  };

  const showLessReviews = () => {
    setVisibleReviews(3);
  };
  return (
    <div className="container py-3">
      <div className="course-reviews-container">
        <div className="reviews-section p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold">Review of this Course</h5>
            <span className="text-muted">4.9 (1.2k Review)</span>
          </div>
          <hr />
          {allReviews.slice(0, visibleReviews).map((r, i) => (
            <div key={i} className="">
              <div className="d-flex align-items-start ">
                <img src={r.image} className="profileImage me-3" alt="user" />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-0">{r.name}</h6>
                      <small className="text-muted">{r.date}</small>
                    </div>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fa-star ${
                            star <= r.rating ? "fas" : "far"
                          } text-warning me-1`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className=" mb-0">{r.review}</p>
                </div>
              </div>
              {i < visibleReviews - 1 && <hr />}
            </div>
          ))}
          
          {/* Load More / Show Less Buttons */}
          <div className="mt-4 gap-2">
            {visibleReviews < allReviews.length && (
              <button 
                className="view-courses-btn" 
                onClick={loadMoreReviews}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  `Load More Reviews (${allReviews.length - visibleReviews} remaining)`
                )}
              </button>
            )}
            
            {visibleReviews > 3 && (
              <button 
                className="view-courses-btn" 
                onClick={showLessReviews}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
        <div className="sidebar-section">
          {/* You can add sidebar content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;