import React from 'react';
import { Dialog } from "primereact/dialog";
import CustomButton from '@/components/ui/custom-button/CustomButton';
import jsPDF from 'jspdf';

interface PlacementFormData {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    permanentAddress: string;
    currentAddress: string;
    city: string;
    state: string;
    pincode: number;
    mobileNumber: number;
    highestQualification: string;
    specialization: string;
    passingYear: string;
    collageName: string;
    university: string;
    cgpaPercentage: string;
    sscPercentage: string;
    hscPercentage: string;
    technicalFields: string;
    softSkills: string;
    programmingLanguages: string;
    projectTitle: string;
    projectDescription: string;
    technologiesUsed: string;
    githubLink: string;
    companyName: string;
    role: string;
    duration: string;
    description: string;
    declaration: boolean;
}

interface PlacementFormModalProps {
    visible: boolean;
    onHide: () => void;
    placementFormData: PlacementFormData;
}

const PlacementFormModal: React.FC<PlacementFormModalProps> = ({
    visible,
    onHide,
    placementFormData
}) => {

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Set font
        doc.setFont('helvetica');

        // Header
        doc.setFontSize(20);
        doc.setTextColor(0, 123, 255);
        doc.text('Student Placement Form', 105, 20, { align: 'center' });

        let yPosition = 40;

        // Helper function to add section
        const addSection = (title: string, data: { [s: string]: unknown }) => {
            doc.setFontSize(16);
            doc.setTextColor(0, 123, 255);
            doc.text(title, 20, yPosition);
            yPosition += 10;

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    // Split long text to fit page width (maxWidth: 170)
                    const lines = doc.splitTextToSize(`${key}: ${value}`, 170);
                    lines.forEach((line: string) => {
                        doc.text(line, 20, yPosition);
                        yPosition += 8;
                        if (yPosition > 270) {
                            doc.addPage();
                            yPosition = 20;
                        }
                    });
                }
            });

            yPosition += 10;
        };

        // Personal Details
        addSection('Personal Details', {
            'Full Name': placementFormData.fullName,
            'Date of Birth': placementFormData.dateOfBirth,
            'Gender': placementFormData.gender,
            'Mobile Number': placementFormData.mobileNumber,
            'Permanent Address': placementFormData.permanentAddress,
            'Current Address': placementFormData.currentAddress,
            'City': placementFormData.city,
            'State': placementFormData.state,
            'Pincode': placementFormData.pincode
        });

        // Education
        addSection('Education', {
            'Qualification': placementFormData.highestQualification,
            'Specialization': placementFormData.specialization,
            'Passing Year': placementFormData.passingYear,
            'College': placementFormData.collageName,
            'University': placementFormData.university,
            'CGPA': placementFormData.cgpaPercentage,
            'SSC Percentage': placementFormData.sscPercentage,
            'HSC Percentage': placementFormData.hscPercentage
        });

        // Skills & Projects
        addSection('Skills & Projects', {
            'Technical Skills': placementFormData.technicalFields,
            'Soft Skills': placementFormData.softSkills,
            'Programming Languages': placementFormData.programmingLanguages,
            'Project Title': placementFormData.projectTitle,
            'Project Description': placementFormData.projectDescription,
            'Technologies Used': placementFormData.technologiesUsed,
            'Portfolio/Github': placementFormData.githubLink
        });

        // Internship
        addSection('Internship', {
            'Company': placementFormData.companyName,
            'Role': placementFormData.role,
            'Duration': placementFormData.duration,
            'Description': placementFormData.description
        });

        // Add footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        }

        // Download the PDF
        doc.save(`${placementFormData.fullName || 'Student'}_Placement_Form.pdf`);
    };

    return (
        <Dialog header="Placement Form"
            visible={visible}
            onHide={onHide}
            style={{ width: '60vw' }}
            footer={
                <div className="d-flex justify-content-center gap-2 pb-1 pt-4">
                    <CustomButton
                        label="Download PDF"
                        icon="pi pi-download"
                        onClick={handleDownloadPDF}
                        className="p-button-outlined"
                    />
                    <CustomButton
                        label="Close"
                        icon="pi pi-times"
                        onClick={onHide}
                        className="p-button-secondary"
                    />
                </div>
            }
        >
            <div className="p-3" id="print-content">
                <h5 className="mb-3 text-primary">Personal Details</h5>
                <div className="row mb-2">
                    <div className="col-6"><span className="text-muted">Full Name:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.fullName}</div>
                    <div className="col-6"><span className="text-muted">Date of Birth:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.dateOfBirth}</div>
                    <div className="col-6"><span className="text-muted">Gender:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.gender}</div>
                    <div className="col-6"><span className="text-muted">Mobile Number:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.mobileNumber}</div>
                    <div className="col-6"><span className="text-muted">Permanent Address:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.permanentAddress}</div>
                    <div className="col-6"><span className="text-muted">Current Address:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.currentAddress}</div>
                    <div className="col-6"><span className="text-muted">City:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.city}</div>
                    <div className="col-6"><span className="text-muted">State:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.state}</div>
                    <div className="col-6"><span className="text-muted">Pincode:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.pincode}</div>
                </div>
                <hr />
                <h5 className="mb-3 text-primary">Education</h5>
                <div className="row mb-2">
                    <div className="col-6"><span className="text-muted">Qualification:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.highestQualification}</div>
                    <div className="col-6"><span className="text-muted">Specialization:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.specialization}</div>
                    <div className="col-6"><span className="text-muted">Passing Year:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.passingYear}</div>
                    <div className="col-6"><span className="text-muted">College:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.collageName}</div>
                    <div className="col-6"><span className="text-muted">University:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.university}</div>
                    <div className="col-6"><span className="text-muted">CGPA:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.cgpaPercentage}</div>
                    <div className="col-6"><span className="text-muted">SSC Percentage:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.sscPercentage}</div>
                    <div className="col-6"><span className="text-muted">HSC Percentage:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.hscPercentage}</div>
                </div>
                <hr />
                <h5 className="mb-3 text-primary">Skills & Projects</h5>
                <div className="row mb-2">
                    <div className="col-6"><span className="text-muted">Technical Skills:</span></div>
                    <div className="col-6 fw-semibold">
                        {Array.isArray(placementFormData.technicalFields) && placementFormData.technicalFields.map((tskill, i) => (
                            <span key={i}>{tskill}, </span>
                        ))}
                    </div>
                    <div className="col-6"><span className="text-muted">Soft Skills:</span></div>
                    <div className="col-6 fw-semibold">
                        {Array.isArray(placementFormData.softSkills) && placementFormData.softSkills.map((sskill, s) => (
                            <span key={s}>{sskill}, </span>
                        ))}
                    </div>
                    <div className="col-6"><span className="text-muted">Programming Languages:</span></div>
                    <div className="col-6 fw-semibold">
                        {Array.isArray(placementFormData.programmingLanguages) && placementFormData.programmingLanguages.map((planguage, p) => (
                            <span key={p}>{planguage}, </span>
                        ))}
                    </div>
                    <div className="col-6"><span className="text-muted">Project Title:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.projectTitle}</div>
                    <div className="col-6"><span className="text-muted">Project Description:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.projectDescription}</div>
                    <div className="col-6"><span className="text-muted">Project Technologies:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.technologiesUsed}</div>
                    <div className="col-6"><span className="text-muted">Portfolio/Github:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.githubLink}</div>
                </div>
                <hr />
                <h5 className="mb-3 text-primary">Internship</h5>
                <div className="row mb-2">
                    <div className="col-6"><span className="text-muted">Company:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.companyName}</div>
                    <div className="col-6"><span className="text-muted">Role:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.role}</div>
                    <div className="col-6"><span className="text-muted">Duration:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.duration}</div>
                    <div className="col-6"><span className="text-muted">Description:</span></div>
                    <div className="col-6 fw-semibold">{placementFormData.description}</div>
                </div>
            </div>
        </Dialog>
    )
}

export default PlacementFormModal