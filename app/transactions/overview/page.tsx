import AnimatedNumber from "@/components/animated-number";
import { Progress } from "@/components/ui/progress";
import React from "react";

const Overview = () => {
	return (
		<div>
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
			<Progress value={40} style={{ height: 10 }} />
		</div>
	);
};

export default Overview;
