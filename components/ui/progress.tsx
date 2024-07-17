"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(value as number), 200);
		return () => clearTimeout(timer);
	}, []);
	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				"relative h-4 w-full overflow-hidden rounded-full  bg-[#E3E3D9]",
				className
			)}
			{...props}>
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 bg-[#59B089] transition-all ease-in-out"
				style={{
					transform: `translateX(-${100 - (progress || 0)}%)`,
					transitionDuration: "1500ms",
				}}
			/>
		</ProgressPrimitive.Root>
	);
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
