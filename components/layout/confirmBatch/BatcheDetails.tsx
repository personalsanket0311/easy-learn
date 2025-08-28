import React from "react";
import BatchDetailItem from "./BatchDetailItem";

interface BatchDetailsProps {
  batchName: string;
  details: { [key: string]: string };
  onClick: () => void;
  isProcessing?: boolean;
}

const BatchDetails: React.FC<BatchDetailsProps> = ({ 
  batchName, 
  details, 
  onClick, 
  isProcessing = false 
}) => {
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h5 className="fw-bold mb-3">Enroll in {batchName}</h5>
          <h6 className="fw-bold mb-3">Batch Details</h6>
          <div className="table-responsive">
            <table className="table border-top w-100 mb-0">
              <tbody>
                {Object.entries(details).map(([label, value], index) => (
                  <BatchDetailItem key={index} label={label} value={value} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn bg-blue px-5 py-2 rounded-pill fw-semibold"
              onClick={onClick}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true"
                  ></span>
                  Processing...
                </>
              ) : (
                "Enroll Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;