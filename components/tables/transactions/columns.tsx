import { ColumnDef } from "@tanstack/react-table";
import { FileText } from "lucide-react";
import { data } from "./data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import facebook from "@/public/facebook.png";
import amazon from "@/public/amazon.png";
import google from "@/public/google.png";
import slack from "@/public/slack.png";

interface GroupedTransactions {
	groupOn: string;
	items: Transaction[];
}

export type Transaction = {
	id: string;
	amount: number;
	receipt: boolean;
	date: Date;
	email: string;
	groupOn: string;
	name: string;
	transactionLocation: string;
	transactionIssuer: string;
};

const logos = [facebook, amazon, google, slack];

function groupTransactions(transactions: Transaction[]): GroupedTransactions[] {
	const groupedMap = transactions.reduce((acc, transaction) => {
		if (!acc.has(transaction.groupOn)) {
			acc.set(transaction.groupOn, []);
		}
		acc.get(transaction.groupOn)!.push(transaction);
		return acc;
	}, new Map<string, Transaction[]>());

	return Array.from(groupedMap, ([groupOn, items]) => ({ groupOn, items }));
}

export const transactionColumns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "id",
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			const groupOn = row.getValue("groupOn");
			const group = groupTransactions(data).find(
				(transaction) => transaction.groupOn === groupOn
			);
			const item = group?.items.find((item) => item.id === row.getValue("id"));
			const index = item ? group?.items.indexOf(item) : -1;
			const random = Math.floor(Math.random() * 4);
			return (
				<div
					className={cn("capitalize", index === 0 && "py-5")}
					style={{ width: row.index === 0 ? 600 : "auto" }}>
					{index === 0 && (
						<p className="block text-slate-400 mb-2">{item?.groupOn}</p>
					)}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full center border relative">
							<Image
								src={logos[random]}
								alt="logo"
								style={{ objectFit: "contain", objectPosition: "center" }}
								fill
							/>
						</div>
						<div>
							<span className="block font-semibold">
								{row.getValue("name")}
							</span>
							<div className="flex center gap-5">
								<span className="text-slate-400">
									{row.getValue("transactionLocation")}
								</span>
								<span className="text-slate-400">
									{row.getValue("transactionIssuer")}
								</span>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "receipt",
		header: "Receipt",
		cell: ({ row }) => (
			<div>
				{
					<FileText
						size={20}
						className={
							row.getValue("receipt") ? "text-green-500" : "text-red-500"
						}
					/>
				}
			</div>
		),
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return (
				<div className="text-right font-medium">
					<span className="block text-lg font-medium">{formatted}</span>
					<span className="text-muted-foreground">1.5% $14.8$</span>
				</div>
			);
		},
	},
	{
		accessorKey: "groupOn",
	},
	{ accessorKey: "name" },
	{ accessorKey: "transactionLocation" },
	{ accessorKey: "transactionIssuer" },
];
