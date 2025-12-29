import { Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { ContactFormWrapper } from "@/component/Contact";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Me",
  description:
    "Get in touch with Shardendu Mishra. Let's discuss your project, collaboration opportunities, or any questions about software development. I'm always open to new opportunities.",
  path: "/contact",
  keywords: [
    "contact",
    "get in touch",
    "hire developer",
    "collaboration",
    "work together",
    "freelance developer",
    "software consultant",
  ],
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Get In Touch
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
            I'll get back to you as soon as possible.
          </p>
        </header>

        {/* Contact Form Card */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <ContactFormWrapper />
        </article>

        {/* Additional Contact Info */}
        <footer className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Or email me directly at:{" "}
            <a
              href="mailto:shardendumishrafedora@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              shardendumishrafedora@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
