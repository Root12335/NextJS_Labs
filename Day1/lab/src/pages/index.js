import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Next Project</h1>
      <Link href="/products" className="btn btn-primary">
        Go to Products
      </Link>
    </div>
  );
};

export default Home;
