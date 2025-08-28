'use client';

import React from "react";

const BackButton: React.FC = () => {
  return (
    <button className="btn btn-link text-decoration-none mb-2 fs-26 ps-0 text-dark" onClick={() => history.back()}>
      &larr;
    </button>
  );
};

export default BackButton;
