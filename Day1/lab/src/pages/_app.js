import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}
