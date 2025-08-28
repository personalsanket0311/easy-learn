"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


interface Batch {
  title: string;
  startDate: string;
  time: string;
  trainer?: string;
}

interface Props {
  batch: Batch;
  isSelected?: boolean;
  onSelect?: () => void;
}

const BatchCard: React.FC<Props> = ({ batch, isSelected, onSelect }) => (
  <div
    className={`border rounded py-3 px-4 mb-3 shadow-sm batch-card ${
      isSelected ? "border-danger bg-light" : "bg-white"
    }`}
    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
    onClick={onSelect}
  >
    <div className="fw-semibold text-danger">{batch.title}</div>
    <div>Start Date: {batch.startDate}</div>
    <div>Time: {batch.time}</div>
    {/* Optional: <div className="text-muted">Trainer: {batch.trainer}</div> */}
  </div>
);

export default BatchCard;
