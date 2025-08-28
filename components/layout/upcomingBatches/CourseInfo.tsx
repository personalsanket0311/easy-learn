"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


interface Batch {
  id: string;
  title: string;
  startDate: string;
  time: string;
}

interface Course {
  id: string;
  title: string;
  imageUrl: string;
  batches: Batch[];
}

interface Props {
  course: Course;
}

const CourseInfo: React.FC<Props> = ({ course }) => {
  return (
    <div className="container my-5">
      <div className="table-responsive shadow rounded table-custom">
        <table className="table table-bordered table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Course</th>
              <th>Start Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {course.batches.map((batch, index) => (
              <tr key={batch.id}>
                <td className="text-danger fw-bold">{index + 1}</td>
                <td>{course.title}</td>
                <td>{batch.startDate}</td>
                <td>{batch.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseInfo;
