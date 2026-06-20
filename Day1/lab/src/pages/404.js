import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="mb-4 text-muted">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

Custom404.getLayout = function getLayout(page) {
  return (
    <>
      {/* Navbar is intentionally excluded here */}
      {page}
    </>
  );
};

export default Custom404;
