import { Grid2X2Plus } from "lucide-react";
import { Game } from "@renderer/lib/games";
import { useMemo } from "react";
import { useI18n } from "@renderer/components/i18n";

export default function WelcomePage({
	openNewGameModal,
	games,
	handleSelectGame,
} : {
	openNewGameModal: () => void;
	games: Game[];
	handleSelectGame: (gameId: string) => void;
}) {
	const {t} = useI18n();

	// first 5 longest play time
	const first5Games = useMemo(() => {
		games.sort((a, b) => {
			if (a.data.playedTime && !b.data.playedTime) {
				return -1;
			} else if (!a.data.playedTime && b.data.playedTime) {
				return 1;
			} else if (!a.data.playedTime && !b.data.playedTime) {
				return 0;
			} else {
				return a.data.playedTime! - a.data.playedTime!;
			}
		});
		return games.slice(0, Math.min(5, games.length));
	}, [games]);

	return (
		<div className="relative flex h-full w-full items-center justify-center flex-col space-y-5 select-none overflow-hidden">
			<div className="relative z-10 flex flex-col items-center space-y-5 px-4">
				<h1 className="text-4xl font-bold text-white text-center">
					{t("Welcome to")}{" "}
					<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
						2GameLauncher
					</span>
				</h1>

				<p className="text-gray-400 text-center max-w-md">
					{t("Organize and launch all your games from one place")}
				</p>

				{games.length === 0 ? (
					<button
						className="cursor-pointer mt-4 group relative overflow-hidden rounded-2xl p-1"
						onClick={openNewGameModal}
					>
						<div className="bg-gray-900 rounded-xl pt-3 pb-3 pl-5 pr-5 flex flex-row items-center justify-center space-x-3">
							<p className="text-gray-300 text-lg font-medium group-hover:text-white transition-all ease-linear duration-150">
								{t("Add a new game")}
							</p>
							<Grid2X2Plus
								size={22}
								className="text-gray-400 group-hover:text-white transition-all ease-linear duration-150"
							/>
						</div>
					</button>
				) : (
					<div className="flex flex-row items-center justify-center space-x-5">
						{first5Games.map((game: Game) => (
							<button
								className={`
									border-transparent cursor-pointer
									transition-all ease-linear duration-150
									border-2 hover:border-[#3E3D3D] rounded-2xl p-1.5
								`}
								onClick={() => handleSelectGame(game.id)}
							>
								<img
									alt=""
									src={game.icon}
									className="w-12 rounded-xl select-none"
								/>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
