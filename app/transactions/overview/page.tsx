import TransactionsTable from "@/components/tables/transactions/table";
import InfoCard from "@/components/info-card";
import OverviewHeader from "@/components/overview-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight } from "lucide-react";
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
