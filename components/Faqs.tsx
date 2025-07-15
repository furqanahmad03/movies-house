import Link from 'next/link'
import React from 'react'

const Faqs = () => {
  return (
    <div style={{ padding: '32px', maxWidth: '720px', margin: '0 auto' }}>
      <h1>❓ Frequently Asked Questions</h1>

      <h3>1. How can I search for a movie?</h3>
      <p>You can use the search bar to filter movies by title, genre, rating, or year.</p>

      <h3>2. Where does the data come from?</h3>
      <p>All movie data is stored locally in JSON for demo purposes.</p>

      <h3>3. Can I contact support?</h3>
      <p>Yes, please visit the <Link href="/help/contact">Contact</Link> page to get in touch.</p>
    </div>
  )
}

export default Faqs
