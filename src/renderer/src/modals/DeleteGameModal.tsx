import { Game } from "@renderer/lib/games";

export default function DeleteGameModal({
	show,
	setShow,
	game,
	onDelete,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	game: Game;
	onDelete: () => void;
}) {
	const handleClose = () => {
		setShow(false);
	};

	const handleDelete = () => {
		onDelete();
		setShow(false);
	}

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
				show ? "opacity-100 visible" : "opacity-0 invisible"
			}`}
		>
			<div
				className="absolute inset-0 backdrop-blur-md"
				onClick={handleClose}
			/>

			<div
				className={`absolute inset-0 bg-[#000000]/70 transition-opacity duration-300 ${
					show ? "opacity-50" : "opacity-0"
				}`}
				onClick={handleClose}
			/>

			<div
				className={`relative select-none rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 w-96 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<h3 className="text-lg text-gray-400">Deleting {game.name}</h3>
				<p className="text-md pt-5">
					Make sure you want to delete it and this action is not
					invertible.
				</p>
				<div className="border-t-2 border-gray-700/50 h-0 w-full rounded-lg mt-6" />
				<div className="flex justify-end space-x-3 pt-6">
					<button
						onClick={(event) => {
							event.stopPropagation();
							handleClose();
						}}
						className="cursor-pointer px-4 py-2 bg-[#FFFFFF] text-gray-900 hover:bg-gray-200 rounded-xl transition-colors ease-linear duration-150"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						className="cursor-pointer px-4 py-2 border-2 border-red-700 bg-red-950 hover:bg-red-800 rounded-xl transition-colors ease-linear duration-150"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
