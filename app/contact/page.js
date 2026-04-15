export const metadata = {
  title: 'Contact Us — NRI Money Guide',
  description: 'Contact NRI Money Guide — report errors, suggest topics, or reach out with questions about NRI finance.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-navy-200 text-lg">We&apos;d love to hear from you</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Your Name</label>
              <input type="text" placeholder="Rajesh Kumar"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address</label>
              <input type="email" placeholder="rajesh@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Country of Residence</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900 bg-white">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>UAE / Dubai</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Singapore</option>
                <option>Germany</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Subject</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900 bg-white">
                <option>Report incorrect information</option>
                <option>Suggest a new article topic</option>
                <option>Partnership or collaboration</option>
                <option>Technical issue on the site</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Message</label>
              <textarea rows={5} placeholder="Tell us how we can help..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900 resize-none" />
            </div>
            <button className="btn-gold w-full py-3.5 rounded-xl font-semibold text-sm">
              Send Message →
            </button>
            <p className="text-center text-gray-400 text-xs">We typically respond within 1–2 business days.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
