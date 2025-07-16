"use client";
import Link from 'next/link';
import React from 'react';
import { Card, CardContent } from "../app/components/ui/card";

const Footer = () => {
  return (
    <Card className="!w-full !py-4 max-w-screen mx-auto mt-16 mb-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-100 border border-gray-200 shadow-md">
      <CardContent className="flex flex-col items-center gap-3 py-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/help" className="hover:text-primary transition">Help</Link>
          <Link href="/help/faqs" className="hover:text-primary transition">FAQs</Link>
          <Link href="/help/privacy" className="hover:text-primary transition">Privacy</Link>
          <Link href="/help/contact" className="hover:text-primary transition">Contact</Link>
        </div>
        <div className="w-full my-2"></div>
        <p className="text-xs text-gray-400 text-center">© {new Date().getFullYear()} Movie House. All rights reserved.</p>
      </CardContent>
    </Card>
  );
};

export default Footer;
