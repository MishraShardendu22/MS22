import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact | Shardendu Mishra",
	description:
		"Get in touch with Shardendu Mishra. Send me a message for collaborations, opportunities, or just to say hello.",
	openGraph: {
		title: "Contact | Shardendu Mishra",
		description:
			"Get in touch with Shardendu Mishra. Send me a message for collaborations, opportunities, or just to say hello.",
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
