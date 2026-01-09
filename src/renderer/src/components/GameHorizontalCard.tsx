export default function GameHorizontalCard({
	name,
	logo,
	invertLogoColor,
	selected,
	onClick,
}: {
	name: string;
	logo: string;
	invertLogoColor?: boolean;
	selected?: boolean;
	onClick?: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`flex flex-row items-center justify-start group w-full p-3 rounded-xl space-x-3 cursor-pointer hover:bg-gray-900 transition-all duration-150 ease-linear ${selected ? "bg-gray-900" : ""}`}
		>
			<img
				alt=""
				src={logo}
				className={`h-10 w-10 object-contain select-none rounded-lg ${invertLogoColor ? "invert-100" : ""}`}
			/>
			<p className="text-gray-400 select-none">{name}</p>
		</div>
	);
}
