import Link from 'next/link'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../app/components/ui/card';

const Faqs = () => {
  return (
    <div className="flex justify-center items-start !px-2">
      <Card className="w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-4 !px-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">❓ Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">1. How can I search for a movie?</h3>
            <p>You can use the search bar to filter movies by title, genre, rating, or year.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">2. Where does the data come from?</h3>
            <p>All movie data is stored locally in JSON for demo purposes.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">3. Can I contact support?</h3>
            <p>Yes, please visit the <Link href="/help/contact" className="text-primary underline hover:text-primary/80">Contact</Link> page to get in touch.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Faqs
