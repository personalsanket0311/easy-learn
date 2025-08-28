import CustomButton from '@/components/ui/custom-button/CustomButton';
import React from 'react';
import './style.css';
import liveClassIcon from '../../../../public/liveClass-Icon.svg';
import Image from 'next/image';

interface LiveClassesProps {
  nextClassDate?: string;
  nextClassTime?: string;
  onJoinClick?: () => void;
}

const LiveClasses: React.FC<LiveClassesProps> = ({
  nextClassDate = "July 20, 2024",
  nextClassTime = "10:00 AM",
  onJoinClick
}) => {
  return (
    <div className="card border-0">
      <div className="card-body py-4">
        <h5 className="card-title fw-bold mb-3 text-dark">Live Classes</h5>
        
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: '#e3f2fd' 
                }}
              >
                <Image src={liveClassIcon} alt="Live Class Icon" width={24} height={24} />
              </div>
            </div>
            <div>
              <div className="fw-semibold text-dark mb-1">Join Live Class</div>
              <div className="text-muted small">
                Next class: {nextClassDate}, {nextClassTime}
              </div>
            </div>
          </div>

          <CustomButton label='Join' onClick={onJoinClick} className='Join-btn border-0 py-1 px-4 fw-semibold' />
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;