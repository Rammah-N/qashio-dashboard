"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Download, FileText, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DatePicker from "./ui/date-picker";
import CurrencyChanger from "./currency-changer";

const data: Transaction[] = [
	{
		id: "m5gr84i9",
		amount: 316,
		date: new Date(),
		receipt: true,
		email: "ken99@yahoo.com",
		groupOn: "Monday, 10/06/2023",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		date: new Date(),
		receipt: false,
		email: "Abe45@gmail.com",
		groupOn: "Monday, 10/06/2023",
	},
	{
		id: "derv1ws0",
		amount: 837,
		date: new Date(),
		receipt: true,
		email: "Monserrat44@gmail.com",
		groupOn: "Monday, 10/06/2023",
	},
	{
		id: "5kma53ae",
		amount: 874,
		date: new Date(),
		receipt: false,
		email: "Silas22@gmail.com",
		groupOn: "Pending",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		date: new Date(),
		receipt: false,
		email: "carmella@hotmail.com",
		groupOn: "Pending",
	},
];

interface GroupedTransactions {
	groupOn: string;
	items: Transaction[];
}

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

export type Transaction = {
	id: string;
	amount: number;
	receipt: boolean;
	date: Date;
	email: string;
	groupOn: string;
};

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "id",
		enableHiding: true,
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row, table, getValue }) => {
			const groupOn = row.getValue("groupOn");
			const group = groupTransactions(data).find(
				(transaction) => transaction.groupOn === groupOn
			);
			const item = group?.items.find((item) => item.id === row.getValue("id"));
			const index = item ? group?.items.indexOf(item) : -1;
			return (
				<div
					className="capitalize"
					style={{ width: row.index === 0 ? 600 : "auto" }}>
					{index === 0 && (
						<p className="block text-slate-400 mb-2">{item?.groupOn}</p>
					)}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full center border">AJ</div>
						<div>
							<span className="block text-lg font-medium">Title Here</span>
							<div className="flex center gap-5">
								<span className="text-slate-400">Item 1</span>
								<span className="text-slate-400">Item 2</span>
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

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "groupOn",
	},
];

export default function TransactionsTable() {
	console.log(groupTransactions(data));

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		initialState: {
			columnVisibility: {
				groupOn: false,
				id: false,
			},
		},
		state: {
			sorting,
			columnFilters,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
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
			</div>
			<div className="rounded-md border border-slate-100">
				<Table className="outline-none">
					<TableHeader className="bg-qash-beige">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
