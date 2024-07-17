"use client";
import React from "react";
import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const NavItem = ({
	text,
	icon,
	href,
	subPaths,
	className,
	currentPath,
}: {
	text: string;
	icon?: LucideIcon;
	href: string;
	subPaths?: { text: string; href: string }[];
	className?: string;
	currentPath: string;
}) => {
	const Icon = icon;
	const activeCN =
		!subPaths && currentPath === href
			? "text-qash-black font-bold"
			: subPaths && subPaths.some((subPath) => currentPath === subPath.href)
			? "text-qash-black font-bold"
			: "text-qash-gray";
	if (subPaths && subPaths.length) {
		return (
			<Collapsible className={cn(`w-full transition-all ${activeCN}`)}>
				<CollapsibleTrigger
					className={cn(activeCN, "flex gap-5 items-center text-lg")}>
					{Icon && <Icon size={25} />}
					{text}
				</CollapsibleTrigger>
				<CollapsibleContent className="pl-10 pt-2 fade-in-10">
					{subPaths.map((subPath) => (
						<Link
							href={subPath.href}
							key={subPath.text}
							className={`block text-base p-3 w-fit rounded-full ${
								currentPath === subPath.href
									? "font-semibold bg-white"
									: "font-normal"
							}`}>
							{subPath.text}
						</Link>
					))}
				</CollapsibleContent>
			</Collapsible>
		);
	}
	return (
		<Link
			href={href}
			className={`w-full text-lg flex items-center gap-5 ${activeCN} ${className}`}>
			{Icon && <Icon size={25} />}
			{text}
		</Link>
	);
};

export default NavItem;
