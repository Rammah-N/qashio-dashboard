"use client";
import React from "react";
import { CircleDollarSign, DollarSign, Euro, JapaneseYen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CurrencyChanger = () => {
	const icons = {
		USD: <DollarSign size={20} className="text-slate-400" />,
		EUR: <Euro size={20} className="text-slate-400" />,
		YEN: <JapaneseYen size={20} className="text-slate-400" />,
	};
	const [currency, setCurrency] = React.useState<keyof typeof icons>("USD");
	return (
		<DropdownMenu modal>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="rounded-full w-10 h-10 p-0 center">
					{icons[currency]}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem onSelect={() => setCurrency("USD")}>
					<DollarSign className="mr-2 h-4 w-4" />
					<span>USD</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setCurrency("EUR")}>
					<Euro className="mr-2 h-4 w-4" />
					<span>Eur</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setCurrency("YEN")}>
					<JapaneseYen className="mr-2 h-4 w-4" />
					<span>Yen</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CurrencyChanger;
