"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mt-5 text-center">
      <h2>Something went wrong!</h2>
      <p className="text-danger">{error.message}</p>
      <button className="btn btn-primary me-3" onClick={() => reset()}>
        Try again
      </button>
      <Link href="/" className="btn btn-secondary">
        Return Home
      </Link>
    </div>
  );
}
