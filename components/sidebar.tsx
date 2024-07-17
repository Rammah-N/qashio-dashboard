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
	const getActiveColor = (path: string, href: string) =>
		path.includes(href) ? "text-qash-black" : "text-qash-gray";
	console.log(currentPath);
	return (
		<aside className="w-64 h-full rounded-3xl flex flex-col items-center p-10 gap-5 shadow bg-[#F6F6F4]">
			<Link href="https://qashio.com" className="mb-5">
				<Image src={logo} alt="Qashio Logo" />
			</Link>
			<NavItem
				currentPath={currentPath}
				text="Insights"
				href="/insights"
				icon={<LayoutDashboard size={25} />}
			/>
			<NavItem
				href="/transactions"
				icon={<CircleDollarSign size={25} />}
				currentPath={currentPath}
				text="Transactions"
				subPaths={[
					{
						text: "Overview",
						href: "/transactions/overview",
					},
					{
						text: "Needs Review",
						href: "/transactions/needs-review",
					},
					{
						text: "Out of Policy",
						href: "/transactions/out-of-policy",
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
				icon={<CreditCard size={25} />}
			/>
			<NavItem
				currentPath={currentPath}
				text="Vendors"
				href="/vendors"
				icon={<Store size={25} />}
			/>
			<NavItem
				currentPath={currentPath}
				text="Accounting"
				href="/accounting"
				icon={<BookOpenText size={25} />}
			/>
			<NavItem
				currentPath={currentPath}
				text="People"
				href="/people"
				icon={<Users size={25} />}
			/>
			<NavItem
				currentPath={currentPath}
				text="Reimburse"
				href="/reimburse"
				icon={<Receipt size={25} />}
			/>
			<NavItem
				currentPath={currentPath}
				text="Settings"
				href="/settings"
				className="mt-auto"
				icon={
					<Settings
						size={25}
						className={getActiveColor(currentPath, "/settings")}
					/>
				}
			/>
		</aside>
	);
};

export default Sidebar;
