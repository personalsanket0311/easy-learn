import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

interface CourseDetailsData {
  duration: string;
  validity: string;
  placement: string;
}

interface CourseDetailsProps {
  data: CourseDetailsData;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ data }) => (
  <div>
    <h6 className="fw-bold mb-3">Course Details</h6>
    <div className="table-responsive">
      <table className="table border-top">
        <tbody>
          <tr>
            <td className="text-muted">Duration</td>
            <td className="text-start">{data.duration} Months</td>
          </tr>
          <tr>
            <td className="text-muted">Validity</td>
            <td className="text-start">Lifetime Access </td>
          </tr>
          <tr>
            <td className="text-muted">Placement</td>
            <td className="text-start">Start after {data.placement} Months of training</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default CourseDetails;
