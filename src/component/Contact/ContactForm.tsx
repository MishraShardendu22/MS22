import { FileText, Mail, MessageSquare, User } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface ContactFormProps {
  variant?: "default" | "compact";
  includeSubject?: boolean;
}

export function ContactForm({
  variant = "default",
  includeSubject = true,
}: ContactFormProps) {
  const isCompact = variant === "compact";

  return (
    <form action="/api/contact" method="POST" className="space-y-4">
      {/* Name and Email Fields - Grid Layout */}
      <div className={isCompact ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Name
            </div>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={`w-full ${isCompact ? "bg-gray-900/50 border-gray-700 px-4 py-3 text-sm" : "bg-gray-900/50 border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 px-4 py-3"} border rounded-lg text-gray-200 placeholder-gray-500 outline-none transition-all`}
            placeholder={isCompact ? "Full name" : "Your name"}
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </div>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full ${isCompact ? "bg-gray-900/50 border-gray-700 px-4 py-3 text-sm" : "bg-gray-900/50 border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 px-4 py-3"} border rounded-lg text-gray-200 placeholder-gray-500 outline-none transition-all`}
            placeholder={isCompact ? "Email address" : "your.email@example.com"}
          />
        </div>
      </div>

      {/* Subject Field */}
      {includeSubject && (
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Subject
            </div>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className={`w-full ${isCompact ? "bg-gray-900/50 border-gray-700 px-4 py-3 text-sm" : "bg-gray-900/50 border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 px-4 py-3"} border rounded-lg text-gray-200 placeholder-gray-500 outline-none transition-all`}
            placeholder="What's this about?"
          />
        </div>
      )}

      {/* Hidden subject for compact form */}
      {!includeSubject && (
        <input type="hidden" name="subject" value="Portfolio Contact" />
      )}

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </div>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={isCompact ? 4 : 5}
          className={`w-full ${isCompact ? "bg-gray-900/50 border-gray-700 px-4 py-3 text-sm" : "bg-gray-900/50 border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 px-4 py-3"} border rounded-lg text-gray-200 placeholder-gray-500 outline-none transition-all resize-none`}
          placeholder={
            isCompact
              ? "Share details or say hello..."
              : "Tell me about your project or inquiry..."
          }
        />
      </div>

      {/* Submit Button */}
      <SubmitButton variant={variant} />
    </form>
  );
}
