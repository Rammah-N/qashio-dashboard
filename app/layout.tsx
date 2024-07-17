import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Qashio Dashboard",
	description: "The world's No.1 spend analytics platform.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`flex gap-5 h-screen max-h-screen overflow-hidden p-5 ${openSans.className}`}>
				<Sidebar />
				<main className="flex-1 py-5 h-full shadow rounded-3xl">
					{children}
				</main>
			</body>
		</html>
	);
}
