"use client";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedNumber = ({
	value,
	className,
}: {
	value: number;
	className?: string;
}) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => {
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(latest);
	});

	React.useEffect(() => {
		const animation = animate(count, value, {
			duration: 2.5,
			ease: "easeOut",
		});
		return animation.stop;
	}, [value]);

	return (
		<motion.div className={cn(className)}>
			$<motion.span>{rounded}</motion.span>
		</motion.div>
	);
};

export default AnimatedNumber;
