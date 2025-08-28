"use client";

import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import CustomButton from "@/components/ui/custom-button/CustomButton";
import { Card } from "primereact/card";

const apiBaseUrl: string = process.env.NEXT_PUBLIC_SERVER || "";

interface CourseCardProps {
  id?: string;
  title: string;
  courseMode: string;
  discount: number;
  grossFees: number;
  netFees: number;
  courseImage: string;
  courseType?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  courseMode,
  discount,
  grossFees,
  netFees,
  courseImage,
  courseType,
}) => {
  const header = (
    <div className="position-relative overflow-hidden">
      <img
        src={apiBaseUrl + "/" + courseImage}
        alt={title}
        className="img-fluid rounded course-card-image transition-img"
      />
      {courseMode && (
        <span className={`badge course-mode-badge ${courseMode.toLowerCase()}`}>
          {courseMode.toUpperCase()}
        </span>
      )}
    </div>
  );

  const footer = (
    <>
      {id && (
        <Link href={`/courses/course-details/${id}`}>
          <CustomButton
            label="View Details"
            className="btn-sm mt-2 ripple ripple-effect courseColor border-0"
            severity="success"
         
          />
        </Link>
      )}
    </>
  );

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
      <div className="card w-100 course-card shadow-sm hover-shadow transition-hover animated-card">
        <Card title={title} footer={footer} header={header} className="w-100 border-0">
          <div className="fee-info">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="gross-fee text-muted text-decoration-line-through">
                ₹{Number(grossFees || 0).toLocaleString()}
              </span>
              <span className="net-fee fw-semibold text-deepblue fs-5">
                ₹{Number(netFees || 0).toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="badge bg-accent text-dark ms-auto">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

        </Card>
      </div>
    </div>
  );
};

export default CourseCard;
