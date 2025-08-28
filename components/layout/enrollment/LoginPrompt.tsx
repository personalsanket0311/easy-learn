import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

interface LoginPromptProps {
  batchName: string;
  courseName?: string;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ batchName, courseName }) => {
  const router = useRouter();

  const handleLoginClick = () => {
    // Store the current page URL to redirect back after login
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('returnPath', window.location.pathname);
    }
    router.push("/signin");
  };

  const handleSignupClick = () => {
    // Store the current page URL to redirect back after signup
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('returnPath', window.location.pathname);
    }
    router.push("/signup");
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm bg-black text-white rounded-4">
            <div className="card-body text-center px-4 py-5">
              <div className="mb-4">
                <i className="bi bi-person-lock fs-1 text-primary"></i>
              </div>
              <h4 className="fw-bold mb-3 py-2">Login Required</h4>
              <p className="text-white my-4">
                Please login or create an account to enroll in{" "}
                <strong>{courseName ? `${courseName} - ` : ""}{batchName}</strong>
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  className="bg-blue border-0 rounded-pill navbar-login-button w-100 d-flex align-items-center justify-content-center"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <button
                  className="px-4 py-2 rounded-pill navbar-login-button w-100"
                  onClick={handleSignupClick}
                >
                  Create Account
                </button>
              </div>
              <p className="text-white mt-4 small">
                Already have an account? Login to continue with enrollment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;