import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import CustomButton from "@/components/ui/custom-button/CustomButton";

interface BatchWithImageCardProps {
  title: string;
  description: string;
  trainerName: string;
  imageUrl: string;
  onSelect: () => void;
  startDate: string;
  //onSelectOption?:(option: any) => void;
}

const BatchWithImageCard: React.FC<BatchWithImageCardProps> = ({
  title,
  description,
  imageUrl,
  onSelect,
  startDate,
  trainerName,
  //onSelectOption,
}) => {
  const formattedDate = new Date(startDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="container border-bottom pb-4 mb-4">
      <div className="row align-items-center">
        <div className="col-8">
          <h3 className="h6 fw-semibold text-dark mb-1">{title}</h3>
          <p className="text-muted small mb-1">Start Date: {formattedDate}</p>
          <p className="text-muted small">Course: {description}</p>
          {/* <p className="text-muted small">Trainer: {trainerName}</p> */}
          <CustomButton
            label="Select Batch"
            className="mt-2"
            onClick={onSelect}
            outlined
            size="small"
          />
        </div>
        {/* <div className="col-4">
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid rounded course-card-image"
          />
        </div> */}
      </div>
    </div>
  );
};

export default BatchWithImageCard;
