import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div style={{ padding: '32px', maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>🛟 General Help</h1>
        <p>
          Welcome to the help center. We are here to assist you with any questions or issues.
        </p>

        <section style={{ marginTop: '24px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Popular Help Topics</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li>🔐 How to reset your password</li>
            <li>🎬 How to find and filter movies</li>
            <li>📝 Understanding movie ratings</li>
            <li>📧 Contacting support</li>
          </ul>
        </section>

        <section style={{ marginTop: '24px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Need More Help?</h2>
          <p>
            Check our <Link href="/help/faqs">FAQs</Link>, or go to <Link href="/help/contact">Contact</Link> to get in touch.
          </p>
          <p>
            Also Check our <Link href="/help/privacy">Privacy</Link>
          </p>
        </section>
      </div>
    </>
  )
}

export default page
