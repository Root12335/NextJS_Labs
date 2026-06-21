import NavBar from "@/components/NavBar";

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}
