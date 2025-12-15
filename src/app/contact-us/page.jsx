import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { MapSection } from "./MapSection";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 border-b border-slate-200 dark:border-white/5 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorator Line */}
            <div className="flex justify-center mb-6">
              <div className="h-1 w-12 bg-orange-500 rounded-full" />
            </div>

            <span className="text-orange-500 text-xs font-mono font-bold uppercase tracking-widest mb-4 block">
              // Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Contact Headquarters
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Have questions, feedback, or intelligence to share? Reach out to our
              team. We're here to connect, collaborate, and keep the conversation
              going.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <ContactInfo />

      {/* Main Content: Form + Map */}
      <section className="relative py-24 border-t border-slate-200 dark:border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Send a Message
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Map Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Find Us
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Visit our headquarters in New Delhi, India.
                </p>
              </div>
              <MapSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

