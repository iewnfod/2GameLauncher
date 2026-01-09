export default function GameVerticalCard({
	name,
	capsule,
	icon,
	invertLogoColor,
	selected,
	onClick,
}: {
	name: string;
	capsule: string;
	icon: string;
	invertLogoColor?: boolean;
	selected?: boolean;
	onClick?: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`
				relative flex flex-col items-center justify-center
				group w-full p-1 rounded-lg cursor-pointer
				bg-gray-800 transition-all duration-300
				${selected ? "ring-2 ring-blue-500 ring-inset" : ""}
			`}
		>
			<div className="relative z-10 flex flex-col items-center space-y-3">
				<div className="relative h-36 w-24">
					{capsule ? (
						<img
							alt={name}
							src={capsule}
							className={`
								relative w-full h-full object-contain select-none rounded-lg
								${invertLogoColor ? "invert" : ""}
								group-hover:scale-110 transition-transform duration-200
							`}
							loading="lazy"
						/>
					) : (
						<div className="flex flex-col w-full h-full items-center justify-center gap-y-3">
							<img
								alt={name}
								src={icon}
								className={`
									relative w-10 h-10 object-contain select-none rounded-lg
									${invertLogoColor ? "invert" : ""}
									group-hover:scale-110 transition-transform duration-300
								`}
								loading="lazy"
							/>
							<div className="text-center">
								<p className="text-gray-400 font-medium select-none group-hover:text-[#FFFFFF] transition-colors duration-300">
									{name}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
