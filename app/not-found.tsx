import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '64px' }}>
      <h1 style={{ fontSize: '3rem' }}>404 - Page Not Found</h1>
      <p style={{ marginTop: '16px' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" style={{ marginTop: '24px', display: 'inline-block', color: '#0070f3' }}>
        Go back home
      </Link>
    </div>
  );
}