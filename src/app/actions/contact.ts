"use server";

interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Server-side validation
  const errors: ContactFormState["errors"] = {};

  if (!name?.trim()) {
    errors.name = "Name is required";
  }

  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!subject?.trim()) {
    errors.subject = "Subject is required";
  }

  if (!message?.trim()) {
    errors.message = "Message is required";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors,
    };
  }

  // Submit to backend API route
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.error || "Failed to send message. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
