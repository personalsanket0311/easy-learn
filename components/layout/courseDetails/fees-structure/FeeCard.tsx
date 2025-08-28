import React from "react";
import { Button } from "primereact/button";
import "./style.css";
import CustomButton from "@/components/ui/custom-button/CustomButton";

const FeeCard: React.FC<{
  title: string;
  fee: number;
  onSelect: () => void;
  isFullPayment?: boolean;
  disabled?: boolean;
}> = ({ title, fee, onSelect, isFullPayment = false, disabled }) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center p-3 ${
        isFullPayment ? "border-bottom" : ""
      }`}
    >
      <div className="w-50">
        <span className="fw-500">{title}</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="fw-bold fs-16">
          {fee === 0 ? "Not Available" : `₹ ${fee.toLocaleString()}`}
        </span>
        <CustomButton
          label="Select"
          onClick={onSelect}
          className="rounded-pill"
          outlined
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FeeCard;
