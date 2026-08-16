export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(value: unknown): {
  data?: ContactPayload;
  errors: ContactErrors;
} {
  const input = (value ?? {}) as Partial<ContactPayload>;
  const data: ContactPayload = {
    name: asTrimmedString(input.name),
    email: asTrimmedString(input.email),
    subject: asTrimmedString(input.subject),
    message: asTrimmedString(input.message),
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Name is required";
  else if (data.name.length > CONTACT_LIMITS.name)
    errors.name = `Name must be at most ${CONTACT_LIMITS.name} characters`;

  if (!data.email) errors.email = "Email is required";
  else if (!emailPattern.test(data.email))
    errors.email = "Invalid email format";
  else if (data.email.length > CONTACT_LIMITS.email)
    errors.email = `Email must be at most ${CONTACT_LIMITS.email} characters`;

  if (!data.subject) errors.subject = "Subject is required";
  else if (data.subject.length > CONTACT_LIMITS.subject)
    errors.subject = `Subject must be at most ${CONTACT_LIMITS.subject} characters`;

  if (!data.message) errors.message = "Message is required";
  else if (data.message.length < 10)
    errors.message = "Message must be at least 10 characters";
  else if (data.message.length > CONTACT_LIMITS.message)
    errors.message = `Message must be at most ${CONTACT_LIMITS.message} characters`;

  return Object.keys(errors).length === 0 ? { data, errors } : { errors };
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}
