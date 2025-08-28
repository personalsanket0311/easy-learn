interface CourseDetailsProps {
  course?: {
    courseName?: string;
    courseDuration?: string;
  };
  trainer?: {
    firstName?: string;
    lastName?: string;
  };
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, trainer }) => {
  const courseName = course?.courseName || "N/A";
  const duration = course?.courseDuration ? `${course.courseDuration} months` : "N/A";
  const instructor = trainer ? `${trainer.firstName} ${trainer.lastName}` : "N/A";

  return (
    <div className="card border-0">
      <div className="card-body py-3">
        <h5 className="card-title fw-bold pb-4 text-dark">Course Details</h5>
        <div className="row g-4">
          <div className="col-12 border-top pt-4 border-bottom pb-2">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Course Name</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">{courseName}</span>
              </div>
            </div>
          </div>
          {/* <div className="col-12 border-bottom pb-2">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Trainer</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">{instructor}</span>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Course Duration</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;