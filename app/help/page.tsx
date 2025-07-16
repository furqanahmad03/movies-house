import Link from 'next/link'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const page = () => {
  return (
    <div className="flex justify-center items-start !h-full !mx-3 !py-10 !px-2">
      <Card className="w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-4 !px-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">🛟 General Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Welcome to the help center. We are here to assist you with any questions or issues.
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-2">Popular Help Topics</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>🔐 How to reset your password</li>
              <li>🎬 How to find and filter movies</li>
              <li>📝 Understanding movie ratings</li>
              <li>📧 Contacting support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Need More Help?</h2>
            <p>
              Check our <Link href="/help/faqs" className="text-primary underline hover:text-primary/80">FAQs</Link>, or go to <Link href="/help/contact" className="text-primary underline hover:text-primary/80">Contact</Link> to get in touch.
            </p>
            <p>
              Also check our <Link href="/help/privacy" className="text-primary underline hover:text-primary/80">Privacy</Link> page.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default page
