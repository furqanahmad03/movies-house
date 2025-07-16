"use client";

import Contact from '../../../components/Contact';
import Faqs from '../../../components/Faqs';
import Privacy from '../../../components/Privacy';
import { notFound, useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const rawParams = useParams();
  const slug = Array.isArray(rawParams?.slug) ? rawParams.slug : [];
  const route = slug.join('/');

  let content: React.ReactNode = null;

  switch (route) {
    case '':
      content = <div>General Help Page</div>;
      break;
    case 'faqs':
      content = <Faqs />;
      break;
    case 'contact':
      content = <Contact />;
      break;
    case 'privacy':
      content = <Privacy />;
      break;
    default:
      notFound();
  }

  return (
    <div style={{ padding: '32px' }}>
      {content}
    </div>
  );
};

export default Page;
