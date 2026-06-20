import React from "react";
import { useRouter } from "next/router";

const Docs = () => {
  const router = useRouter();
  const { params = [] } = router.query;

  return (
    <div>
      <h1>Docs Page</h1>
      <p>Catch-all Routing.</p>
      <div className="alert alert-info">
        <strong>Current path segments:</strong> {params.join(" / ") || "Root Docs"}
      </div>
    </div>
  );
};

export default Docs;
