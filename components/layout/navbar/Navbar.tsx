"use client";
import React, { useRef, useState, useEffect } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "./style.css";

const Navbar: React.FC = () => {
  const notifRef = useRef<OverlayPanel>(null);
  const profileRef = useRef<OverlayPanel>(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, logout, loading } = useAuth();

  // Utility function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Ensure this only renders after component mounts (client side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render auth-dependent content until client-side hydration is complete
  if (!isClient) {
    return (
      <>
        <nav className="px-3 px-md-5 py-2 shadow-sm custom-navbar border-bottom-0 position-sticky top-0 z-3">
          {/* Logo */}
          <div className="d-flex align-items-center gap-1 text-dark">
            <Link href="/" className="text-decoration-none text-dark">
              <img
                src="https://changexpert.com/changexpert.svg"
                alt="Changexpert logo"
                style={{ height: "auto", width: "160px", position: "relative", top: "4px" }}
              />
            </Link>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center justify-content-center gap-3">
            {/* Desktop Links */}
            <div className="d-none d-md-flex gap-3 align-items-center text-dark fw-medium">
              <div className="navbar-link-container">
                <Link
                  href="/"
                  className="navbar-link text-decoration-none text-dark fw-500 me-3"
                >
                  Home
                </Link>
              </div>
              <div className="navbar-link-container">
                <Link
                  href="/courses"
                  className="navbar-link text-decoration-none text-dark fw-500 me-3"
                >
                  Courses
                </Link>
              </div>
              <div className="navbar-link-container">
                <Link
                  href="/upcoming-batches"
                  className="navbar-link text-decoration-none text-dark fw-500 me-3"
                >
                  Upcoming Batches
                </Link>
              </div>
              {/* <div className="navbar-link-container">
                <Link
                  href="/"
                  className="navbar-link text-decoration-none text-dark fw-500 me-3"
                >
                  Placement
                </Link>
              </div> */}
              <div className="navbar-link-container">
                <Link
                  href="/contact-us"
                  className="navbar-link text-decoration-none text-dark fw-500 me-3"
                >
                  Contact Us
                </Link>
              </div>

              {/* Placeholder for auth buttons during SSR */}
              <div className="d-flex gap-2">
                <div className="placeholder-glow">
                  <span
                    className="placeholder rounded-pill"
                    style={{
                      width: "70px",
                      height: "32px",
                      display: "inline-block",
                    }}
                  ></span>
                </div>
                <div className="placeholder-glow">
                  <span
                    className="placeholder rounded-pill"
                    style={{
                      width: "80px",
                      height: "32px",
                      display: "inline-block",
                    }}
                  ></span>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="d-md-none fs-4 text-dark border-0 bg-transparent"
              onClick={() => setMobileMenuVisible(true)}
            >
              <i className="pi pi-bars"></i>
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <Sidebar
          visible={mobileMenuVisible}
          onHide={() => setMobileMenuVisible(false)}
          position="right"
          className="d-md-none"
          style={{ background:"beige" }}
          showCloseIcon
        >
          <div className="d-flex flex-column gap-3 text-dark fs-6 fw-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuVisible(false)}
              className="mobile-navbar-link text-decoration-none text-dark fw-semibold"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuVisible(false)}
              className="mobile-navbar-link text-decoration-none text-dark fw-semibold"
            >
              Courses
            </Link>
            <Link
              href="/upcoming-batches"
              onClick={() => setMobileMenuVisible(false)}
              className="mobile-navbar-link text-decoration-none text-dark fw-semibold"
            >
              Upcoming Batches
            </Link>
            {/* <Link
              href="/"
              onClick={() => setMobileMenuVisible(false)}
              className="mobile-navbar-link text-decoration-none text-dark fw-semibold"
            >
              Placement
            </Link> */}
            <Link
              href="/contact-us"
              className="mobile-navbar-link text-decoration-none text-dark fw-semibold"
            >
              Contact Us
            </Link>
          </div>
        </Sidebar>
      </>
    );
  }

  return (
    <>
      <nav className="px-3 px-md-5 py-2 shadow-sm custom-navbar border-bottom-0 position-sticky top-0 z-3">
        {/* Logo */}
        <div className="d-flex align-items-center gap-1 text-dark">
          <Link href="/" className="text-decoration-none text-dark">
            <img
              src="https://changexpert.com/changexpert.svg"
              alt="Changexpert logo"
              style={{ height: "auto", width: "160px", position: "relative", top: "4px"  }}
            />
          </Link>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          {/* Desktop Links */}
          <div className="d-none d-md-flex gap-3 align-items-center text-dark fw-medium">
            <div className="navbar-link-container">
              <Link
                href="/"
                className={`navbar-link text-decoration-none text-dark fw-500 me-3 ${isActiveLink('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </div>
            <div className="navbar-link-container">
              <Link
                href="/courses"
                className={`navbar-link text-decoration-none text-dark fw-500 me-3 ${isActiveLink('/courses') ? 'active' : ''}`}
              >
                Courses
              </Link>
            </div>
            <div className="navbar-link-container">
              <Link
                href="/upcoming-batches"
                className={`navbar-link text-decoration-none text-dark fw-500 me-3 ${isActiveLink('/upcoming-batches') ? 'active' : ''}`}
              >
                Upcoming Batches
              </Link>
            </div>
            {/* <div className="navbar-link-container">
              <Link
                href="/upcoming-batches"
                className={`navbar-link text-decoration-none text-dark fw-500 me-3 ${isActiveLink('/upcoming-batches') ? 'active' : ''}`}
              >
                Placement
              </Link>
            </div> */}
            <div className="navbar-link-container">
              <Link
                href="/contact-us"
                className={`navbar-link text-decoration-none text-dark fw-500 me-3 ${isActiveLink('/contact-us') ? 'active' : ''}`}
              >
                Contact Us
              </Link>
            </div>
            {/* Auth buttons - only render after client hydration */}
            {loading ? (
              <div className="d-flex gap-2">
                <div className="placeholder-glow">
                  <span
                    className="placeholder rounded-pill"
                    style={{
                      width: "70px",
                      height: "32px",
                      display: "inline-block",
                    }}
                  ></span>
                </div>
                <div className="placeholder-glow">
                  <span
                    className="placeholder rounded-pill"
                    style={{
                      width: "80px",
                      height: "32px",
                      display: "inline-block",
                    }}
                  ></span>
                </div>
              </div>
            ) : !isAuthenticated ? (
              <>
                <Button
                  label="Login"
                  className="navbar-login-button rounded-pill border-0 min-width-110"
                  onClick={() => router.push("/signin")}
                />
                <Button
                  label="Register"
                  className="navbar-login-button rounded-pill border-0 min-width-110"
                  onClick={() => router.push("/signup")}
                />
              </>
            ) : null}
          </div>

          {/* Bell & Avatar (when authenticated) */}
          {!loading && isAuthenticated && (
            <>
              {/* <Button
                icon="pi pi-bell fs-5"
                className="p-button-rounded p-button-text text-dark border-0 nav-buttons"
                onClick={(e) => notifRef.current?.toggle(e)}
                aria-label="Notifications"
              />
              <OverlayPanel ref={notifRef}>
                <div className="p-2 fs-6 text-secondary text-center">
                  No new notifications
                </div>
              </OverlayPanel> */}

              <Avatar
                icon="pi pi-user"
                shape="circle"
                size="normal"
                className="cursor-pointer nav-avtar"
                onClick={(e) => profileRef.current?.toggle(e)}
              />
              <OverlayPanel ref={profileRef}>
                <div className="d-flex flex-column" style={{ width: "10rem" }}>
                  <Button
                    className="d-flex align-items-center gap-2 px-3 py-2 fs-6 text-dark bg-white border-0 w-100 text-start hover-bg-light"
                    onClick={() => {
                      profileRef.current?.hide();
                      router.push("/profile");
                    }}
                  >
                    <i className="pi pi-user" /> My Profile
                  </Button>
                  <button
                    className="d-flex align-items-center gap-2 px-3 py-2 fs-6 text-danger bg-white border-0 w-100 text-start hover-bg-light"
                    onClick={() => {
                      profileRef.current?.hide();
                      logout();
                    }}
                  >
                    <i className="pi pi-sign-out" /> Logout
                  </button>
                </div>
              </OverlayPanel>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            className="d-md-none fs-4 text-dark border-0 bg-transparent"
            onClick={() => setMobileMenuVisible(true)}
          >
            <i className="pi pi-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar
        visible={mobileMenuVisible}
        onHide={() => setMobileMenuVisible(false)}
        position="right"
        className="d-md-none"
        style={{ background:"beige"}}
        showCloseIcon
      >
        <div className="d-flex flex-column gap-3 text-dark fs-6 fw-medium">
          <Link
            href="/"
            onClick={() => setMobileMenuVisible(false)}
            className={`mobile-navbar-link text-decoration-none text-dark fw-semibold ${isActiveLink('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileMenuVisible(false)}
            className={`mobile-navbar-link text-decoration-none text-dark fw-semibold ${isActiveLink('/courses') ? 'active' : ''}`}
          >
            Courses
          </Link>
          <Link
            href="/upcoming-batches"
            onClick={() => setMobileMenuVisible(false)}
            className={`mobile-navbar-link text-decoration-none text-dark fw-semibold ${isActiveLink('/upcoming-batches') ? 'active' : ''}`}
          >
            Upcoming Batches
          </Link>
          {/* <Link
            href="/upcoming-batches"
            onClick={() => setMobileMenuVisible(false)}
            className={`mobile-navbar-link text-decoration-none text-dark fw-semibold ${isActiveLink('/upcoming-batches') ? 'active' : ''}`}
          >
            Placement
          </Link> */}
          <Link
            href="/contact-us"
            onClick={() => setMobileMenuVisible(false)}
            className={`mobile-navbar-link text-decoration-none text-dark fw-semibold ${isActiveLink('/contact-us') ? 'active' : ''}`}
          >
            Contact Us
          </Link>
          {/* Mobile auth buttons */}
          {!loading && !isAuthenticated && (
            <>
              <Button
                label="Login"
                className="rounded-pill px-4 py-1 navbar-login-button w-75"
                onClick={() => {
                  setMobileMenuVisible(false);
                  router.push("/signin");
                }}
              />
              <Button
                label="Register"
                className="rounded-pill px-4 py-1 navbar-login-button w-75"
                onClick={() => {
                  setMobileMenuVisible(false);
                  router.push("/signup");
                }}
              />
            </>
          )}
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;