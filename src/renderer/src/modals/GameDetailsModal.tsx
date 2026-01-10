import { SquareMousePointer } from "lucide-react";
import { Game, GameData } from "@renderer/lib/games";
import { useI18n } from "@renderer/providers/i18n";
import { useMemo } from "react";

export default function GameDetailsModal({
	show,
	setShow,
	game,
	updateGameData,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	game: Game;
	updateGameData: (id: string, data: Partial<GameData>) => void;
}) {
	const { t } = useI18n();
	const isSteam = useMemo(() => game.data.type === "steam", [game]);

	const handleClose = () => {
		setShow(false);
	};

	const handleSelectGamePath = () => {
		window.api
			.selectFile([{ name: "Game File", extensions: ["exe", "app"] }])
			.then((result) => {
				if (result) {
					updateGameData(game.id, {
						gamePath: result
					});
				}
			});
	};

	const handleShowGameInFolder = () => {
		window.api.showFileInFolder(game.data.gamePath);
	};

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

			{isSteam && (
				<div className="absolute bottom-3 right-3 text-gray-400">
					{game.data.steamAppId}
				</div>
			)}

			<div
				className={`relative rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 w-96 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<div className="flex flex-row items-center justify-start space-x-3 select-none">
					<img alt="" src={game.icon} className="h-10 rounded-lg" />
					<div className="flex flex-col">
						<h3 className="text-xl text-gray-400">{game.name}</h3>
						<p
							onDoubleClick={handleShowGameInFolder}
							className="text-sm text-gray-400 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
						>
							{window.api.getFileName(game.data.gamePath)}
						</p>
					</div>
				</div>

				<div className="border-t-2 border-gray-700/50 h-0 w-full rounded-lg mt-6" />

				<div className="flex flex-col w-full pt-5 pb-5 space-y-5">
					<div className={isSteam ? "cursor-not-allowed" : ""}>
						<label
							htmlFor="game-path-input"
							className="block text-sm/6 font-medium text-gray-400"
						>
							{t("Game Path")}
						</label>
						<div className="mt-2">
							<div className="flex items-center rounded-lg bg-gray-700 pl-2">
								<div
									id="game-path-input"
									className="select-none h-9 overflow-hidden whitespace-nowrap text-ellipsis grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
								>
									{isSteam ? t("Launch by Steam") : game.data.gamePath}
								</div>
								<button
									className={`pr-2 group ${isSteam ? "cursor-not-allowed" : "cursor-pointer"}`}
									onClick={handleSelectGamePath}
									disabled={isSteam}
								>
									<SquareMousePointer
										color="#A7A7A7"
										size={20}
										className={`${isSteam ? "" : "group-hover:stroke-[#FFFFFF]"} transition-all duration-150 ease-linear`}
									/>
								</button>
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="game-params"
							className="block text-sm/6 font-medium text-gray-400"
						>
							{t("Game Parameters")}
						</label>
						<div className="mt-2">
							<div className="flex items-center rounded-lg bg-gray-700 pl-2">
								<input
									id="game-params"
									type="text"
									value={game.data.gameParams}
									className="h-9 overflow-hidden whitespace-nowrap text-ellipsis block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
