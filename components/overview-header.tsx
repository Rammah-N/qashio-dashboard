import AnimatedNumber from "@/components/animated-number";
import { Progress } from "@/components/ui/progress";

const OverviewHeader = () => {
	return (
		<div className="bg-[#FAFAFA] pb-5 px-5">
			<h1 className="text-3xl font-semibold">Overview</h1>
			<div className="flex items-center justify-between my-5">
				<div>
					<span className="text-slate-500 text-sm">Current Balance</span>
					<AnimatedNumber
						value={628432.98}
						className="text-3xl font-semibold"
					/>
				</div>
				<div className="flex flex-col items-end">
					<span className="text-slate-500 text-sm">Available Balance</span>
					<span className="text-3xl font-semibold">$1371,568.10</span>
					<span className="text-slate-500 text-sm">$2,000,000</span>
				</div>
			</div>
			<Progress value={45} style={{ height: 10 }} />
			<div className="flex items-center gap-[30%] my-5">
				<div>
					<span className="block text-slate-500 text-xs font-semibold">
						Next Payment
					</span>
					<span className="block  text-2xl font-semibold">Jun 3rd</span>
				</div>
				<div>
					<span className="block text-slate-500 text-xs font-semibold">
						Available Cashback
					</span>
					<span className="block  text-2xl font-semibold">$85,382</span>
				</div>
			</div>
		</div>
	);
};

export default OverviewHeader;
