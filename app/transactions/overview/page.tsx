import CurrencyChanger from "@/components/currency-changer";
import TransactionsTable from "@/components/data-table";
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
				<section className="flex items-center  gap-10 mb-5">
					<InfoCard title="$1,563" subtitle="Transactions" />
					<InfoCard title="$1228.90" subtitle="Total Spend" />
					<InfoCard
						title={<span className="text-red-600">42</span>}
						subtitle="Missing Receipts"
						icon={ArrowUpRight}
					/>
				</section>
				<TransactionsTable />
			</main>
		</ScrollArea>
	);
};

export default Overview;
