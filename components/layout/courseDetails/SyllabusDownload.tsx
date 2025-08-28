import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'primereact/button';
import "./fees-structure/style.css";
import CustomButton from '@/components/ui/custom-button/CustomButton';

const apiBaseUrl: string = process.env.NEXT_PUBLIC_SERVER || "";

interface SyllabusDownloadProps {
  syllabusUrl: string;
}

const SyllabusDownload: React.FC<SyllabusDownloadProps> = ({ syllabusUrl }) => {
  const handleDownload = () => {
    if (syllabusUrl) {
      // Construct the full URL by combining apiBaseUrl with the relative syllabusUrl
      const fullUrl = `${apiBaseUrl}/${syllabusUrl}`;
      
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = syllabusUrl.split('/').pop() || 'syllabus.pdf';
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div className="p-3 border rounded-3 d-flex justify-content-between align-items-center">
      <span className="fw-medium">Download Syllabus</span>
      <CustomButton
        label="Download" 
        className="bg-blue rounded-pill px-4 py-2 border-0 text-white"
        onClick={handleDownload}
        disabled={!syllabusUrl}
      />
    </div>
  );
};

export default SyllabusDownload;