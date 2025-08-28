
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchaseCourse = () => {
  const handleClick = () => {
    alert('Redirecting to your course...'); 
  };

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-md-6 text-start mb-3 mb-md-0">
        <h5 className="fw-bold">Introduction to Data Science</h5>
        <p className="text-muted">Instructor: Dr. Emily Carter</p>
        <button
          className="btn btn-light border rounded-pill px-4"
          onClick={handleClick}
        >
          My Courses
        </button>
      </div>
      <div className="col-md-4">
        <img
          src="./images/image10.svg" 
          className="img-fluid rounded"
         
        />
      </div>
    </div>
  );
};

export default PurchaseCourse;
