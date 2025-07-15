"use client";
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="/help">Help</Link>
        <Link href="/help/faqs">FAQs</Link>
        <Link href="/help/privacy">Privacy</Link>
        <Link href="/help/contact">Contact</Link>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Movie House. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
