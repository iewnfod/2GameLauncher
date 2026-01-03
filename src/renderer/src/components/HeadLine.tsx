import { Minus, X } from "lucide-react";
import { useI18n } from "@renderer/components/i18n";

export default function HeadLine() {
	const {t} = useI18n();

	const handleMinimize = () => {
		window.api.minimize();
	};

	const handleClose = () => {
		window.api.close();
	};

	return (
		<div className="w-full h-10 absolute top-0 left-0 drag flex flex-row items-center justify-end z-50">
			<div className="pr-3 pt-4 no-drag">
				<div className="flex flex-row items-center justify-center bg-gray-200/50 backdrop-blur-2xl rounded-xl p-1.5 space-x-2">
					<div className="flex flex-row group relative">
						<button
							className="cursor-pointer"
							onClick={handleMinimize}
						>
							<Minus size={20} />
						</button>
						<div className="absolute text-gray-700 top-full left-1/2 -translate-x-1/2 translate-y-1 mt-3 px-3 py-2 bg-[#E0E0E0] text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-10 group-hover:delay-500 select-none">
							{t("Minimize")}
							<div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1 rotate-90 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#E0E0E0]"></div>
						</div>
					</div>
					<div className="flex flex-row group relative">
						<button
							className="cursor-pointer"
							onClick={handleClose}
						>
							<X size={20} />
						</button>
						<div className="absolute text-gray-700 top-full left-1/2 -translate-x-1/2 translate-y-1 mt-3 px-3 py-2 bg-[#E0E0E0] text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-10 group-hover:delay-500 select-none">
							{t("Close")}
							<div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1 rotate-90 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#E0E0E0]"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
