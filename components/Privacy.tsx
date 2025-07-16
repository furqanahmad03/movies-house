import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../app/components/ui/card';

const Privacy = () => {
  return (
    <div className="flex justify-center items-start !px-2">
      <Card className="w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-4 !px-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">🔒 Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">Our Commitment</h2>
            <p>
              Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights regarding your information.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">What Data We Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>We do <span className="font-bold">not</span> collect any personal data.</li>
              <li>No cookies, no tracking, and no third-party analytics are used.</li>
              <li>All movie data is stored locally for demonstration purposes only.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">How We Use Data</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>All data is used solely to display movie information within this demo app.</li>
              <li>We do not share, sell, or transfer any data to third parties.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Your Rights</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>You are free to use this app without providing any personal information.</li>
              <li>If you have questions, please <a href="mailto:support@moviehouse.com" className="text-primary underline hover:text-primary/80">contact us</a>.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              For any privacy-related concerns, email us at <a href="mailto:support@moviehouse.com" className="text-primary underline hover:text-primary/80">support@moviehouse.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default Privacy
