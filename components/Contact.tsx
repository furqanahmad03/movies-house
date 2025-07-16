import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../app/components/ui/card';

const Contact = () => {
  return (
    <div className="flex justify-center items-start min-h-[70vh] px-2">
      <Card className="w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-4 !px-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">📞 Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>If you have questions, suggestions, or issues, feel free to reach out.</p>
          <div className="space-y-1">
            <p>Email: <a href="mailto:support@moviehouse.com" className="text-primary underline hover:text-primary/80">support@moviehouse.com</a></p>
            <p>Phone: <span className="text-gray-700 font-medium">+123 456 7890</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Contact
