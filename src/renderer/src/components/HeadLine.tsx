import { Minus, X } from "lucide-react";

export default function HeadLine() {
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
					<button className="cursor-pointer" onClick={handleMinimize}>
						<Minus size={20}/>
					</button>
					<button className="cursor-pointer" onClick={handleClose}>
						<X size={20}/>
					</button>
				</div>
			</div>
		</div>
	);
}
