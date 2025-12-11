"use client";

import { useState } from "react";
import { Send, Mail, User, FileText, MessageSquare } from "lucide-react";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}

export function ContactForm() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitStatus({ type: null, message: "" });

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitStatus({
					type: "success",
					message: "Message sent successfully! I'll get back to you soon.",
				});
				setFormData({ name: "", email: "", subject: "", message: "" });
				setErrors({});
			} else {
				setSubmitStatus({
					type: "error",
					message: data.error || "Failed to send message. Please try again.",
				});
			}
		} catch (error) {
			setSubmitStatus({
				type: "error",
				message: "An error occurred. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error for this field when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto p-6">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Name Field */}
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
						value={formData.name}
						onChange={handleChange}
						className={`w-full px-4 py-3 rounded-lg border ${
							errors.name
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
						} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors`}
						placeholder="Your name"
						disabled={isSubmitting}
					/>
					{errors.name && (
						<p className="mt-1 text-sm text-red-500">{errors.name}</p>
					)}
				</div>

				{/* Email Field */}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
						value={formData.email}
						onChange={handleChange}
						className={`w-full px-4 py-3 rounded-lg border ${
							errors.email
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
						} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors`}
						placeholder="your.email@example.com"
						disabled={isSubmitting}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-500">{errors.email}</p>
					)}
				</div>

				{/* Subject Field */}
				<div>
					<label
						htmlFor="subject"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
						value={formData.subject}
						onChange={handleChange}
						className={`w-full px-4 py-3 rounded-lg border ${
							errors.subject
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
						} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors`}
						placeholder="What's this about?"
						disabled={isSubmitting}
					/>
					{errors.subject && (
						<p className="mt-1 text-sm text-red-500">{errors.subject}</p>
					)}
				</div>

				{/* Message Field */}
				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>
						<div className="flex items-center gap-2">
							<MessageSquare className="w-4 h-4" />
							Message
						</div>
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows={6}
						className={`w-full px-4 py-3 rounded-lg border ${
							errors.message
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
						} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors resize-none`}
						placeholder="Your message..."
						disabled={isSubmitting}
					/>
					{errors.message && (
						<p className="mt-1 text-sm text-red-500">{errors.message}</p>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
				>
					{isSubmitting ? (
						<>
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
							Sending...
						</>
					) : (
						<>
							<Send className="w-5 h-5" />
							Send Message
						</>
					)}
				</button>

				{/* Status Message */}
				{submitStatus.type && (
					<div
						className={`p-4 rounded-lg ${
							submitStatus.type === "success"
								? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
								: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
						}`}
					>
						{submitStatus.message}
					</div>
				)}
			</form>
		</div>
	);
}
