import { LucideIcon } from "lucide-react";
import React from "react";

const InfoCard = ({
	title,
	subtitle,
	icon,
}: {
	title: React.ReactNode;
	subtitle?: string;
	icon?: LucideIcon;
}) => {
	const Icon = icon;
	return (
		<div className="p-5 flex-col flex items-start justify-start bg-qash-beige gap-3 rounded-3xl">
			<span className="text-xl">{subtitle}</span>
			<div className="flex gap-2">
				<span className="text-3xl font-medium">{title}</span>
				{Icon && <Icon size={30} className="text-slate-400" />}
			</div>
		</div>
	);
};

export default InfoCard;
