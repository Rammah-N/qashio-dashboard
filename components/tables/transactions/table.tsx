"use client";

import * as React from "react";
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Download, Search } from "lucide-react";

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
import DatePicker from "@/components/ui/date-picker";
import CurrencyChanger from "@/components/currency-changer";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { transactionColumns, Transaction } from "./columns";
import { data } from "./data";
import { useSearchParams } from "next/navigation";

export default function TransactionsTable() {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [limit, setLimit] = React.useState(5);
	const pages = Math.ceil(data.length / limit);
	const page = useSearchParams().get("page") || "1";
	const [shownData, setShownData] = React.useState<Transaction[]>([]);
	const table = useReactTable({
		data: shownData,
		columns: transactionColumns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		initialState: {
			columnVisibility: {
				groupOn: false,
				id: false,
				name: false,
				transactionLocation: false,
				transactionIssuer: false,
			},
		},
		state: {
			columnFilters,
		},
		manualPagination: true,
	});

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setColumnFilters([{ id: "name", value }]);
	};

	React.useEffect(() => {
		const start = (parseInt(page) - 1) * limit;
		const end = start + limit;
		setShownData(data.slice(start, end));
	}, [limit, page]);

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<section className="flex items-center gap-[100px] w-full">
					<Input
						placeholder="Search e.g Kenneth Johnson"
						startIcon={Search}
						className="rounded-full px-10 w-[300px]"
						onChange={handleSearch}
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
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="border-l-[1px]">
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
									colSpan={transactionColumns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4 bg-qash-beige px-5 rounded-b-md">
				<div className="flex-1 text-sm text-primary">
					<span>Show:</span>
					<select
						className="mx-2 px-3 rounded-full bg-white"
						onChange={(e) => setLimit(parseInt(e.target.value))}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
					<span>per page</span>
					<span className="ml-5 ">
						1 - {limit} of {data.length}
					</span>
				</div>
				<div className="space-x-2">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href={
										parseInt(page) > 1
											? `/transactions/overview?page=${parseInt(page) - 1}`
											: "/transactions/overview"
									}
								/>
							</PaginationItem>
							{pages > 2 ? (
								<>
									<PaginationItem>
										<PaginationLink href={`/transactions/overview`}>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href={`/transactions/overview?page=${2}`}>
											2
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											href={`/transactions/overview?page=${pages}`}>
											{pages}
										</PaginationLink>
									</PaginationItem>
								</>
							) : (
								Array.from({ length: pages }, (_, i) => (
									<PaginationItem key={i}>
										<PaginationLink
											href={`/transactions/overview?page=${i + 1}`}>
											{i + 1}
										</PaginationLink>
									</PaginationItem>
								))
							)}

							<PaginationItem>
								<PaginationNext
									href={
										parseInt(page) <= pages
											? `/transactions/overview?page=${parseInt(page) + 1}`
											: `/transactions/overview?page=${page}`
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
}
