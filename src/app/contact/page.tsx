import type { Metadata } from "next";
import { ContactFormWrapper } from "@/component/Contact/ContactFormWrapper";
import { generatePageMetadata } from "@/lib/metadata";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with Shardendu Mishra for software engineering opportunities, collaborations, consulting, or general inquiries.",
  path: "/contact",
  keywords: [
    "contact",
    "hire developer",
    "Shardendu Mishra contact",
    "software engineer",
    "collaborate",
    "email",
  ],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-[#b9ae9d]">
          <a href="/" className="hover:text-[#d9a55b] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#f3ebdd]">Contact</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9a55b]/10 border border-[#d9a55b]/20 text-[#d9a55b] text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#f3ebdd] tracking-tight">
            Contact & Inquiries
          </h1>
          <p className="text-sm sm:text-base text-[#b9ae9d] max-w-2xl leading-relaxed">
            Have a project in mind, an engineering question, or looking to collaborate?
            Send me a message using the form below or reach out directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 rounded-2xl bg-[#161311] border border-[#2f2923] shadow-md space-y-6">
              <h2 className="text-lg font-serif text-[#f3ebdd]">
                Direct Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-[#b9ae9d]">
                  <Mail className="w-4 h-4 text-[#d9a55b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#f3ebdd]">Email</span>
                    <a
                      href="mailto:shardendumishra55@gmail.com"
                      className="hover:text-[#d9a55b] transition-colors"
                    >
                      shardendumishra55@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#b9ae9d]">
                  <MapPin className="w-4 h-4 text-[#d9a55b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#f3ebdd]">Location</span>
                    <span>India (IST, UTC+5:30)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#b9ae9d]">
                  <Send className="w-4 h-4 text-[#d9a55b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#f3ebdd]">Response Time</span>
                    <span>Typically within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161311] border border-[#2f2923] shadow-lg">
              <h2 className="text-xl font-serif text-[#f3ebdd] mb-6">
                Send a Message
              </h2>
              <ContactFormWrapper variant="default" includeSubject={true} />
            </div>
          </div>
        </div>

        {/* Internal Discovery Navigation */}
        <div className="pt-8 border-t border-[#2f2923] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#b9ae9d]">
          <div className="flex items-center gap-4">
            <a href="/projects" className="hover:text-[#d9a55b] transition-colors underline">
              &larr; View Projects
            </a>
            <a href="/skills" className="hover:text-[#d9a55b] transition-colors underline">
              Explore Skills
            </a>
            <a href="/experiences" className="hover:text-[#d9a55b] transition-colors underline">
              Work Experience
            </a>
          </div>
          <a href="/" className="hover:text-[#d9a55b] transition-colors">
            Back to Homepage &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
