'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LogoCarousel from './LogoCarousel';
import appWrite from "../../../../public/appwrite-logo.png";
import ecoBillz from "../../../../public/ecoBillzlogo-dark.svg";
import cashFree from "../../../../public/movefastlogo.png";
import winZera from "../../../../public/winZera-logo.png";
import dunZo from "../../../../public/dunzo-logo.png";
import uber from "../../../../public/uber-logo.png";
import myntra from "../../../../public/Myntra-Logo.png";
import zomato from "../../../../public/zomato-logo.png";
import infosys from "../../../../public/logos/infosys.svg";
import tcs from "../../../../public/logos/tcs.svg";
import cognizant from "../../../../public/logos/cognizant.svg";
import ibm from "../../../../public/logos/ibm.svg";
import zensar from "../../../../public/logos/zensar.svg";
import oracle from "../../../../public/logos/oracle.svg";
import siemens from "../../../../public/logos/siemens.svg";
import cisco from "../../../../public/logos/cisco.svg";
import vmware from "../../../../public/logos/vmware.svg";
import wipro from "../../../../public/logos/wipro.svg";
import mphasis from "../../../../public/logos/mphasis-logo.png";
import persistant from "../../../../public/logos/persistent-logo.svg";
import saama from "../../../../public/logos/saama-logo.svg";

const demoLogos = [
  { id: 1, name: "Infosys", src: infosys },
  { id: 2, name: "TCS", src: tcs },
  { id: 3, name: "Cognizant", src: cognizant },
  { id: 4, name: "ibm", src: ibm },
  { id: 5, name: "Oracle", src: oracle },
  { id: 6, name: "Siemens", src: siemens  },
  { id: 7, name: "Saama", src: saama },
  { id: 8, name: "vmware", src: vmware },
  { id: 9, name: "Wipro", src: wipro },
  { id: 10, name: "Mphasis", src: mphasis },
  { id: 11, name: "Persistant", src: persistant },
  { id: 12, name: "Zensar", src: zensar }
];

// Split into 2 independent carousels
const splitLogos = (logos: any[]) => {
  const half = Math.ceil(logos.length / 2);
  return [logos.slice(0, half), logos.slice(half)];
};

const CompanyLogo = () => {
  const [logosA, logosB] = splitLogos(demoLogos);

  return (
    <div className="container rounded-4 py-4" style={{ height: '340px' }}>
      <div className="text-center mb-5">
        <motion.p
          className="text-muted text-uppercase fs-6 fw-medium pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by the Best
        </motion.p>

        <motion.h2
          className="fw-bold display-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Where innovation meets trust
        </motion.h2>
      </div>

      {/* Two parallel logo carousels */}
      <div className="row justify-content-center gy-4">
        <div className="col-6 col-md-3">
          <LogoCarousel logos={logosA} delay={2000} />
        </div>
        <div className="col-6 col-md-3">
          <LogoCarousel logos={logosB} delay={2500} />
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;