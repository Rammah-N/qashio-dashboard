import CurrencyChanger from "@/components/currency-changer";
import InfoCard from "@/components/info-card";
import OverviewHeader from "@/components/overview-header";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ArrowUpRight,
	CircleDollarSign,
	Download,
	Save,
	Search,
} from "lucide-react";
import React from "react";

const Overview = () => {
	return (
		<ScrollArea className="h-full">
			<OverviewHeader />
			<main className="px-5">
				<section className="flex items-center gap-[100px] w-full">
					<Input
						placeholder="Search & Filter"
						startIcon={Search}
						className="rounded-full px-10 w-[300px]"
					/>
					<div className="center gap-5">
						<DatePicker />
						<CurrencyChanger />
					</div>
					<Button
						variant="outline"
						className="rounded-full w-16 h-10 p-0 center ml-auto border-green-700">
						<Download size={20} className="text-green-700" />
					</Button>
				</section>
				<section className="flex items-center  gap-10 my-5">
					<InfoCard title="$1,563" subtitle="Transactions" />
					<InfoCard title="$1228.90" subtitle="Total Spend" />
					<InfoCard
						title={<span className="text-red-600">42</span>}
						subtitle="Missing Receipts"
						icon={ArrowUpRight}
					/>
				</section>
			</main>
		</ScrollArea>
	);
};

export default Overview;
