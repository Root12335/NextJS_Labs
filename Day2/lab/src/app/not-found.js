import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
