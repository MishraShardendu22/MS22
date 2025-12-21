import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
	title: "Contact",
	description:
		"Get in touch with Shardendu Mishra for collaborations, job opportunities, or project inquiries. Reach out via email or contact form for software development discussions.",
	path: "/contact",
	keywords: [
		"Contact Shardendu Mishra",
		"Developer Contact",
		"Hire Software Developer",
		"Contact Form",
		"Get In Touch",
		"Software Engineer Contact",
		"Email Developer",
		"Contact Page",
		"Reach Out",
		"Developer Inquiry",
	],
});

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
