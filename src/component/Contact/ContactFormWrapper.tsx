"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { ContactForm } from "./ContactForm";

interface ContactFormWrapperProps {
  variant?: "default" | "compact";
  includeSubject?: boolean;
}

export function ContactFormWrapper({
  variant = "default",
  includeSubject = true,
}: ContactFormWrapperProps) {
  const [state, formAction] = useActionState(submitContactForm, null);

  return (
    <form action={formAction} className="space-y-4">
      {/* Success/Error Messages */}
      {state?.message && (
        <div
          className={`p-4 rounded-lg border ${
            state.success
              ? "bg-green-900/20 border-green-500/50 text-green-400"
              : "bg-red-900/20 border-red-500/50 text-red-400"
          }`}
        >
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <ContactForm
        variant={variant}
        includeSubject={includeSubject}
        state={state}
      />
    </form>
  );
}
