"use client";
import {
	BookOpenText,
	CircleDollarSign,
	CreditCard,
	LayoutDashboard,
	Receipt,
	Settings,
	Store,
	Users,
} from "lucide-react";
import NavItem from "./nav-item";
import { usePathname } from "next/navigation";
import logo from "@/public/qashio.svg";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
	const currentPath = usePathname();
	return (
		<aside className="w-64 h-full rounded-3xl flex flex-col items-center p-10 gap-5 shadow bg-[#F6F6F4]">
			<Link href="https://qashio.com" className="mb-5">
				<Image src={logo} alt="Qashio Logo" />
			</Link>
			<NavItem
				currentPath={currentPath}
				text="Insights"
				href="/"
				icon={LayoutDashboard}
			/>
			<NavItem
				href="/transactions"
				icon={CircleDollarSign}
				currentPath={currentPath}
				text="Transactions"
				subPaths={[
					{
						text: "Overview",
						href: "/transactions/overview",
					},
					{
						text: "Needs Review",
						href: "/transactions/review",
					},
					{
						text: "Out of Policy",
						href: "/transactions/policy",
					},
					{
						text: "Declined",
						href: "/transactions/declined",
					},
				]}
			/>
			<NavItem
				currentPath={currentPath}
				text="Card"
				href="/card"
				icon={CreditCard}
			/>
			<NavItem
				currentPath={currentPath}
				text="Vendors"
				href="/vendors"
				icon={Store}
			/>
			<NavItem
				currentPath={currentPath}
				text="Accounting"
				href="/accounting"
				icon={BookOpenText}
			/>
			<NavItem
				currentPath={currentPath}
				text="People"
				href="/people"
				icon={Users}
			/>
			<NavItem
				currentPath={currentPath}
				text="Reimburse"
				href="/reimburse"
				icon={Receipt}
			/>
			<NavItem
				currentPath={currentPath}
				text="Settings"
				href="/settings"
				className="mt-auto"
				icon={Settings}
			/>
		</aside>
	);
};

export default Sidebar;
