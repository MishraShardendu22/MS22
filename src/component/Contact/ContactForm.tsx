import { FileText, Mail, MessageSquare, User } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface ContactFormProps {
  variant?: "default" | "compact";
  includeSubject?: boolean;
  state?: {
    success: boolean;
    message: string;
    errors?: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };
  } | null;
}

export function ContactForm({
  variant = "default",
  includeSubject = true,
  state = null,
}: ContactFormProps) {
  const isCompact = variant === "compact";

  return (
    <>
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
            className={`w-full bg-zinc-950 border-zinc-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${isCompact ? "px-4 py-3 text-sm" : "px-4 py-3"} border rounded-lg text-gray-200 placeholder-zinc-500 outline-none transition-all ${state?.errors?.name ? "border-red-500" : ""}`}
            placeholder={isCompact ? "Full name" : "Your name"}
          />
          {state?.errors?.name && (
            <p className="text-red-400 text-xs mt-1">{state.errors.name}</p>
          )}
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
            className={`w-full bg-zinc-950 border-zinc-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${isCompact ? "px-4 py-3 text-sm" : "px-4 py-3"} border rounded-lg text-gray-200 placeholder-zinc-500 outline-none transition-all ${state?.errors?.email ? "border-red-500" : ""}`}
            placeholder={isCompact ? "Email address" : "your.email@example.com"}
          />
          {state?.errors?.email && (
            <p className="text-red-400 text-xs mt-1">{state.errors.email}</p>
          )}
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
            className={`w-full bg-zinc-950 border-zinc-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${isCompact ? "px-4 py-3 text-sm" : "px-4 py-3"} border rounded-lg text-gray-200 placeholder-zinc-500 outline-none transition-all ${state?.errors?.subject ? "border-red-500" : ""}`}
            placeholder="What's this about?"
          />
          {state?.errors?.subject && (
            <p className="text-red-400 text-xs mt-1">{state.errors.subject}</p>
          )}
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
          className={`w-full bg-zinc-950 border-zinc-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${isCompact ? "px-4 py-3 text-sm" : "px-4 py-3"} border rounded-lg text-gray-200 placeholder-zinc-500 outline-none transition-all resize-none ${state?.errors?.message ? "border-red-500" : ""}`}
          placeholder={
            isCompact
              ? "Share details or say hello..."
              : "Tell me about your project or inquiry..."
          }
        />
        {state?.errors?.message && (
          <p className="text-red-400 text-xs mt-1">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton variant={variant} />
    </>
  );
}
